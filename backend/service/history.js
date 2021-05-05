/**
 * 服务 - 操作历史
 */
const {
  queryHistoryList,
} = require('../db/history');
const {
  queryUserById,
} = require('../db/user');

/**
 * 获取操作历史列表
 */
const getList = async ({ repo_id, file_id }) => {
  const fileId = file_id || undefined;
  const historyList = await queryHistoryList({ repoId: repo_id, fileId });
  const promiseList = [];
  for (let i = 0; i < historyList.length; i += 1) {
    promiseList.push(new Promise((resolve, reject) => {
      queryUserById({
        id: historyList[i].user_id,
      }).then((res) => {
        resolve({ ...historyList[i], user: res[0].name });
      }).catch(reject);
    }));
  }
  const list = await Promise.all(promiseList);
  return { error: false, data: { list } };
};

module.exports = {
  getList,
};
