/**
 * 验证器 - 操作历史
 */
const Joi = require('joi');
const {
  repoId,
} = require('./common');

/**
 * 获取操作历史列表
 */
const getListSchema = Joi.object({
  repo_id: repoId,
  file_id: repoId,
});

module.exports = {
  getListSchema,
};
