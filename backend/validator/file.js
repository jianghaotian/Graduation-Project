/**
 * 验证器 - 文件
 */
const Joi = require('joi');
const {
  repoId, any,
} = require('./common');

/**
 * 获取仓库列表
 */
const getListSchema = Joi.object({
  repo_id: repoId,
  folder_id: repoId,
});

/**
 * 上传文件
 */
const uploadSchema = any;

module.exports = {
  getListSchema,
  uploadSchema,
};
