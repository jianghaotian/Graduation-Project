/**
 * 验证器 - 仓库
 */
const Joi = require('joi');
const {
  repoName, repoId, repoType, any,
} = require('./common');

/**
 * 获取仓库列表
 */
const getListSchema = any;

/**
 * 创建仓库
 */
const createSchema = Joi.object({
  name: repoName,
  desc: any,
});

/**
 * 删除仓库
 */
const deleteSchema = Joi.object({
  id: repoId,
});

/**
 * 获取仓库信息
 */
const getInfoSchema = Joi.object({
  id: repoId,
});

/**
 * 修改仓库信息
 */
const changeInfoSchema = Joi.object({
  id: repoId,
  name: repoName,
  desc: any,
});

/**
 * 获取仓库成员列表
 */
const getMemberSchema = Joi.object({
  id: repoId,
});

/**
 * 添加成员
 */
const addMemberSchema = Joi.object({
  repo_id: repoId,
  user_id: any,
  type: repoType,
});

/**
 * 删除成员
 */
const delMemberSchema = Joi.object({
  repo_id: repoId,
  user_id: any,
});

/**
 * 修改成员权限
 */
const changeTypeSchema = Joi.object({
  repo_id: repoId,
  user_id: any,
  type: repoType,
});

module.exports = {
  getListSchema,
  createSchema,
  deleteSchema,
  getInfoSchema,
  changeInfoSchema,
  getMemberSchema,
  addMemberSchema,
  delMemberSchema,
  changeTypeSchema,
};
