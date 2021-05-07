/**
 * 数据库操作 - 操作历史表 - history
 */
const { runSql } = require('../utils/db');

/** INSERT
 * history表增加一条字段
 */
const insertHistory = async ({
  repoId, fileId, fileUid, type, userId, fileName,
}) => {
  const sql = 'INSERT INTO xy.history (repository_id, file_id, file_uid, type, user_id, file_name)'
     + 'VALUES ($1, $2, $3, $4, $5, $6)';
  const row = await runSql(sql, [repoId, fileId, fileUid, type, userId, fileName]);
  return row;
};

/** UPDATE
 * 通过仓库id删除记录(delete = 1)
 */
// const updateDeleteById = async ({ id }) => {
//   const sql = 'UPDATE xy.file SET delete = 1 WHERE id = $1';
//   const row = await runSql(sql, [id]);
//   return row;
// };

/** UPDATE
 * 通过文件id修改文件名
 */
// const updateNameById = async ({ name, id, userId }) => {
//   const sql = 'UPDATE xy.file SET name = $1, update_user_id = $2, update_time = $3 WHERE id = $4';
//   const row = await runSql(sql, [name, userId, new Date(), id]);
//   return row;
// };

/** SELECT
 * 查询操作历史列表
 */
const queryHistoryList = async ({ repoId, fileId }) => {
  let row;
  if (fileId === undefined) {
    const sql = 'SELECT * FROM xy.history WHERE repository_id = $1';
    row = await runSql(sql, [repoId]);
  } else {
    const sql = 'SELECT * FROM xy.history WHERE repository_id = $1 and file_id = $2';
    row = await runSql(sql, [repoId, fileId]);
  }
  return row;
};

/** SELECT
 * 查询文件列表
 */
// const queryFileByUid = async ({ uid }) => {
//   const sql = 'SELECT * FROM xy.file WHERE uid = $1';
//   const row = await runSql(sql, [uid]);
//   return row;
// };

module.exports = {
  insertHistory,
  // updateDeleteById,
  // updateNameById,
  queryHistoryList,
  // queryFileByUid,
};
