/**
 * 服务 - 文件
 */
const path = require('path');
const fs = require('fs');
const {
  insertFile,
  updateDeleteById,
  updateNameById,
  queryFileList,
  queryFileByUid,
  queryFileById,
} = require('../db/file');
const {
  insertHistory,
} = require('../db/history');
const {
  queryUserById,
} = require('../db/user');
const { getParentFolderId } = require('./common/file');
const { getUuid, getNilUuid } = require('../utils/uuid');

/**
 * 获取文件列表
 */
const getList = async ({ repo_id, folder_id }) => {
  const folderId = folder_id || getNilUuid();
  const fileList = await queryFileList({ repoId: repo_id, folderId });
  const promiseList = [];
  for (let i = 0; i < fileList.length; i += 1) {
    promiseList.push(new Promise((resolve, reject) => {
      queryUserById({
        id: fileList[i].update_user_id,
      }).then((res) => {
        resolve({ ...fileList[i], update_user: res[0].name });
      }).catch(reject);
    }));
  }
  const list = await Promise.all(promiseList);
  return { error: false, data: { list } };
};

/**
 * 获取文件路径
 */
const getPath = async ({ folder_id }) => {
  let parentUid = folder_id;
  const list = [];

  const res = await queryFileByUid({ uid: parentUid });
  const { name } = res[0];
  list.unshift({ name, id: parentUid });

  while (parentUid !== getNilUuid()) {
    // eslint-disable-next-line no-await-in-loop
    const res1 = await getParentFolderId({ folderId: parentUid });
    parentUid = res1.parentUid;
    if (parentUid === getNilUuid()) {
      break;
    }
    // eslint-disable-next-line no-await-in-loop
    const res2 = await queryFileByUid({ uid: parentUid });
    const name1 = res2[0].name;
    list.unshift({ name: name1, id: parentUid });
  }
  return { error: false, data: { list } };
};

/**
 * 上传文件
 */
const uploadFile = async ({ repo_id, folder_id }, id, files) => {
  const folderId = folder_id || getNilUuid();
  const fileList = files.file.length ? files.file : [files.file];
  const promiseList = [];
  for (let i = 0; i < fileList.length; i += 1) {
    promiseList.push(new Promise((resolve, reject) => {
      insertFile({
        uid: fileList[i].uuid,
        name: fileList[i].name,
        type: fileList[i].type,
        size: fileList[i].size,
        id,
        repoId: repo_id,
        folderId,
      }).then(() => {
        queryFileByUid({ uid: fileList[i].uuid }).then((res) => {
          insertHistory({
            repoId: repo_id,
            fileId: res[0].id,
            fileUid: fileList[i].uuid,
            type: 'new',
            userId: id,
            fileName: fileList[i].name,
          });
          resolve();
        });
      }).catch(reject);
    }));
  }
  await Promise.all(promiseList);
  return { error: false };
};

/**
 * 新建文件夹
 */
const newFolder = async ({ repo_id, folder_id, name }, id) => {
  const folderId = folder_id || getNilUuid();
  await insertFile({
    uid: getUuid(),
    name,
    type: 'folder',
    size: 0,
    id,
    repoId: repo_id,
    folderId,
  });
  return { error: false };
};

/**
 * 文件重命名
 */
const renameFile = async ({ id, name }, userId) => {
  const res = await queryFileById({ id });
  await updateNameById({ name, id, userId });
  await insertHistory({
    repoId: res[0].repository_id,
    fileId: id,
    fileUid: res[0].uid,
    type: 'rename',
    userId,
    fileName: name,
  });
  return { error: false };
};

/**
 * 删除文件
 */
const deleteFile = async ({ id }, userId) => {
  const res = await queryFileById({ id });
  await updateDeleteById({ id });
  await insertHistory({
    repoId: res[0].repository_id,
    fileId: id,
    fileUid: res[0].uid,
    type: 'delete',
    userId,
    fileName: res[0].name,
  });
  return { error: false };
};

/**
 * 下载文件
 */
const downloadFile = async ({ uid }, userId, ctx) => {
  const file = await queryFileByUid({ uid });
  const filePath = path.join(__dirname, '../files', uid);
  const stream = fs.createReadStream(filePath);
  ctx.set('Content-disposition', `attachment;filename=${file[0].name}`);
  ctx.body = stream;
};

module.exports = {
  getList,
  getPath,
  uploadFile,
  newFolder,
  renameFile,
  deleteFile,
  downloadFile,
};
