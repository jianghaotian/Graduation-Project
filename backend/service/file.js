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
} = require('../db/file');
const {
  queryUserById,
} = require('../db/user');
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
        resolve();
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
  await updateNameById({ name, id, userId });
  return { error: false };
};

/**
 * 删除文件
 */
const deleteFile = async ({ id }) => {
  await updateDeleteById({ id });
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
  uploadFile,
  newFolder,
  renameFile,
  deleteFile,
  downloadFile,
};
