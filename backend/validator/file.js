/**
 * 验证器 - 文件
 */
const Joi = require('joi');
const {
  repoId, any, string,
} = require('./common');

/**
 * 获取仓库列表
 */
const getListSchema = Joi.object({
  repo_id: repoId,
  folder_id: repoId,
});

/**
 * 获取仓库列表
 */
const getPathSchema = Joi.object({
  folder_id: repoId,
});

/**
 * 上传文件
 */
const uploadSchema = any;

/**
 * 新建文件夹
 */
const newFolderSchema = Joi.object({
  repo_id: repoId,
  folder_id: repoId,
  name: string,
});

/**
 * 文件重命名
 */
const renameFileSchema = Joi.object({
  id: any,
  name: string,
});

/**
 * 删除文件
 */
const deleteFileSchema = Joi.object({
  id: any,
});

module.exports = {
  getListSchema,
  getPathSchema,
  uploadSchema,
  newFolderSchema,
  renameFileSchema,
  deleteFileSchema,
};
