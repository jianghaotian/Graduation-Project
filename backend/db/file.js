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
  const sql = 'INSERT INTO xy.file (uid, name, type, size, create_user_id, update_user_id, update_time, repository_id, folder_id, delete)'
    + 'VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, 0)';
  const row = await runSql(sql, [uid, name, type, size, id, new Date(), repoId, folderId]);
  return row;
};

/** UPDATE
 * 通过仓库id删除记录(delete = 1)
 */
const updateDeleteById = async ({ id }) => {
  const sql = 'UPDATE xy.file SET delete = 1 WHERE id = $1';
  const row = await runSql(sql, [id]);
  return row;
};

/** UPDATE
 * 通过文件id修改文件名
 */
const updateNameById = async ({ name, id, userId }) => {
  const sql = 'UPDATE xy.file SET name = $1, update_user_id = $2, update_time = $3 WHERE id = $4';
  const row = await runSql(sql, [name, userId, new Date(), id]);
  return row;
};

/** SELECT
 * 查询文件列表
 */
const queryFileList = async ({ repoId, folderId }) => {
  const sql = 'SELECT * FROM xy.file WHERE repository_id = $1 and folder_id = $2 and delete = 0';
  const row = await runSql(sql, [repoId, folderId]);
  return row;
};

/** SELECT
 * 查询文件列表
 */
const queryFileByUid = async ({ uid }) => {
  const sql = 'SELECT * FROM xy.file WHERE uid = $1';
  const row = await runSql(sql, [uid]);
  return row;
};

module.exports = {
  insertFile,
  updateDeleteById,
  updateNameById,
  queryFileList,
  queryFileByUid,
};
