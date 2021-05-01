/**
 * 数据库操作 - 文件表 - file
 */
const { runSql } = require('../utils/db');

/** INSERT
 * permission表增加一条字段
 */
const insertFile = async ({
  uid, name, type, size, id, repoId, folderId,
}) => {
  const sql = 'INSERT INTO xy.file (uid, name, type, size, create_user_id, update_user_id, update_time, repository_id, folder_id, history)'
    + 'VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, 0)';
  const row = await runSql(sql, [uid, name, type, size, id, new Date(), repoId, folderId]);
  return row;
};

/** DELETE
 * 通过仓库id删除记录
 */
// const deleteRepoById = async ({ id }) => {
//   const sql = 'DELETE FROM xy.permission WHERE repository_id = $1';
//   const row = await runSql(sql, [id]);
//   return row;
// };

/** UPDATE
 * 通过仓库id、用户id修改记录
 */
// const updatePerm = async ({ repoId, userId, type }) => {
//   const sql = 'UPDATE xy.permission SET type = $1 WHERE repository_id = $2 and user_id = $3';
//   const row = await runSql(sql, [type, repoId, userId]);
//   return row;
// };

/** SELECT
 * 查询文件列表
 */
const queryFileList = async ({ repoId, folderId }) => {
  const sql = 'SELECT * FROM xy.file WHERE repository_id = $1 and folder_id = $2 and history = 0';
  const row = await runSql(sql, [repoId, folderId]);
  return row;
};

module.exports = {
  insertFile,
  queryFileList,
};
