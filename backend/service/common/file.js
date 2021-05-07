/**
 * 公共服务 - 文件相关
 */

const { queryPathByUid } = require('../../db/file');

/**
 * 获取文件父级文件夹
 */
const getParentFolderId = async ({ folderId }) => {
  const res = await queryPathByUid({ uid: folderId });
  const parentUid = res[0].folder_id;
  return { error: false, parentUid };
};

module.exports = {
  getParentFolderId,
};
