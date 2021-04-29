/**
 * 数据库操作 - 仓库表 - repository
 */
const { runSql } = require('../utils/db');

/** INSERT
 * repository表增加一条字段
 */
const insertRepo = async ({ id, name, desc }) => {
  const sql = 'INSERT INTO xy.repository (id, name, "desc") VALUES ($1, $2, $3)';
  const row = await runSql(sql, [id, name, desc]);
  return row;
};

/** DELETE
 * 通过id删除仓库
 */
const deleteRepo = async ({ id }) => {
  const sql = 'DELETE FROM xy.repository WHERE id = $1';
  const row = await runSql(sql, [id]);
  return row;
};

/** UPDATE
 * 通过id修改仓库信息
 */
const updateRepo = async ({ id, name, desc }) => {
  const sql = 'UPDATE xy.repository SET name = $1, "desc" = $2 WHERE id = $3';
  const row = await runSql(sql, [name, desc, id]);
  return row;
};

/** SELECT
 * 获取仓库信息（id, name）
 */
const queryRepoById = async ({ id }) => {
  const sql = 'SELECT id, name FROM xy.repository WHERE id = $1';
  const row = await runSql(sql, [id]);
  return row;
};

/** SELECT
 * 获取仓库信息
 */
const queryRepoAllById = async ({ id }) => {
  const sql = 'SELECT * FROM xy.repository WHERE id = $1';
  const row = await runSql(sql, [id]);
  return row;
};

module.exports = {
  insertRepo,
  deleteRepo,
  updateRepo,
  queryRepoById,
  queryRepoAllById,
};
