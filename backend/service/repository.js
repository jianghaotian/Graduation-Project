/**
 * 服务 - 仓库
 */
const {
  insertRepo,
  deleteRepo,
  updateRepo,
  queryRepoById,
  queryRepoAllById,
} = require('../db/repository');
const {
  insertPerm,
  deleteRepoById,
  queryOwnRepoIdByUser,
  queryOtherRepoIdByUser,
  queryOwnRepoIdByUser10,
  queryOtherRepoIdByUser10,
  queryRepoType,
} = require('../db/permission');
const { getUuid } = require('../utils/uuid');

/**
 * 获取仓库列表
 */
const getList = async ({ all }, id) => {
  // 从仓库id列表中获取仓库信息
  const getRepoByList = async (list) => {
    const promiseList = [];
    const queryFun = Number(all) === 1 ? queryRepoAllById : queryRepoById;
    for (let i = 0; i < list.length; i += 1) {
      promiseList.push(new Promise((resolve, reject) => {
        queryFun({ id: list[i].repository_id }).then((res) => {
          resolve(res[0]);
        }).catch(reject);
      }));
    }
    return Promise.all(promiseList);
  };

  let ownIdList;
  let otherIdList;
  if (Number(all) === 1) { // 获取所有仓库
    ownIdList = await queryOwnRepoIdByUser({ id });
    otherIdList = await queryOtherRepoIdByUser({ id });
  } else { // 获取10个仓库
    ownIdList = await queryOwnRepoIdByUser10({ id });
    otherIdList = await queryOtherRepoIdByUser10({ id });
  }
  const own = await getRepoByList(ownIdList);
  const other = await getRepoByList(otherIdList);
  return { error: false, data: { own, other } };
};

/**
 * 创建仓库
 */
const create = async ({ name, desc }, id) => {
  const uuid = getUuid();
  await insertRepo({ id: uuid, name, desc });
  await insertPerm({ repoId: uuid, userId: id, type: 0 });
  return { error: false };
};

/**
 * 删除仓库
 */
const delRepo = async ({ id }) => {
  await deleteRepo({ id });
  await deleteRepoById({ id });
  return { error: false };
};

/**
 * 获取仓库信息
 */
const getInfo = async ({ id }, userId) => {
  const data = await queryRepoAllById({ id });
  const typeRes = await queryRepoType({ userId, repoId: id });
  const { type } = typeRes[0];
  return { error: false, data: { ...data[0], type } };
};

/**
 * 修改仓库信息
 */
const changeInfo = async ({ id, name, desc }) => {
  await updateRepo({ id, name, desc });
  return { error: false };
};

/**
 * 获取仓库成员列表
 */
const getMember = async (data) => {
  console.log(data);
};

/**
 * 添加成员
 */
const addMember = async (data) => {
  console.log(data);
};

/**
 * 删除成员
 */
const delMember = async (data) => {
  console.log(data);
};

/**
 * 修改成员权限
 */
const changeType = async (data) => {
  console.log(data);
};

module.exports = {
  getList,
  create,
  delRepo,
  getInfo,
  changeInfo,
  getMember,
  addMember,
  delMember,
  changeType,
};
