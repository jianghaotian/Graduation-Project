/**
 * 服务 - 文件
 */
const {
  insertFile,
  queryFileList,
} = require('../db/file');
const {
  queryUserById,
} = require('../db/user');
const { getNilUuid } = require('../utils/uuid');

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

module.exports = {
  getList,
  uploadFile,
};
