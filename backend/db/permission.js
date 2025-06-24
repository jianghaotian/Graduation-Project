/**
 * 数据库操作 - 仓库权限表 - permission
 */
const { runSql } = require('../utils/db');

/** INSERT
 * permission表增加一条字段
 */
const insertPerm = async ({ repoId, userId, type }) => {
  const sql = 'INSERT INTO xy.permission (repository_id, user_id, type) VALUES ($1, $2, $3)';
  const row = await runSql(sql, [repoId, userId, type]);
  return row;
};

/** DELETE
 * 通过仓库id删除记录
 */
const deleteRepoById = async ({ id }) => {
  const sql = 'DELETE FROM xy.permission WHERE repository_id = $1';
  const row = await runSql(sql, [id]);
  return row;
};

/** DELETE
 * 通过仓库id、用户id删除记录
 */
const deletePerm = async ({ repoId, userId }) => {
  const sql = 'DELETE FROM xy.permission WHERE repository_id = $1 and user_id = $2';
  const row = await runSql(sql, [repoId, userId]);
  return row;
};

/** UPDATE
 * 通过仓库id、用户id修改记录
 */
const updatePerm = async ({ repoId, userId, type }) => {
  const sql = 'UPDATE xy.permission SET type = $1 WHERE repository_id = $2 and user_id = $3';
  const row = await runSql(sql, [type, repoId, userId]);
  return row;
};

/** SELECT
 * 查询仓库成员
 */
const queryUserIdByRepo = async ({ repoId }) => {
  const sql = 'SELECT user_id, type FROM xy.permission WHERE repository_id = $1 order by type';
  const row = await runSql(sql, [repoId]);
  return row;
};

/** SELECT
 * 查询用户创建的仓库
 */
const queryOwnRepoIdByUser = async ({ id }) => {
  const sql = 'SELECT * FROM xy.permission WHERE user_id = $1 and type = 0';
  const row = await runSql(sql, [id]);
  return row;
};

/** SELECT
 * 查询用户加入的仓库
 */
const queryOtherRepoIdByUser = async ({ id }) => {
  const sql = 'SELECT * FROM xy.permission WHERE user_id = $1 and type != 0';
  const row = await runSql(sql, [id]);
  return row;
};

/** SELECT
 * 查询用户创建的仓库（前10个）
 */
const queryOwnRepoIdByUser10 = async ({ id }) => {
  const sql = 'SELECT * FROM xy.permission WHERE user_id = $1 and type = 0 order by id desc limit 10';
  const row = await runSql(sql, [id]);
  return row;
};

/** SELECT
 * 查询用户加入的仓库（前10个）
 */
const queryOtherRepoIdByUser10 = async ({ id }) => {
  const sql = 'SELECT * FROM xy.permission WHERE user_id = $1 and type != 0 order by id desc limit 10';
  const row = await runSql(sql, [id]);
  return row;
};

/** SELECT
 * 查询用户加入的仓库（前10个）
 */
const queryRepoType = async ({ userId, repoId }) => {
  const sql = 'SELECT type FROM xy.permission WHERE user_id = $1 and repository_id = $2';
  const row = await runSql(sql, [userId, repoId]);
  return row;
};

module.exports = {
  insertPerm,
  deleteRepoById,
  deletePerm,
  updatePerm,
  queryUserIdByRepo,
  queryOwnRepoIdByUser,
  queryOtherRepoIdByUser,
  queryOwnRepoIdByUser10,
  queryOtherRepoIdByUser10,
  queryRepoType,
};
