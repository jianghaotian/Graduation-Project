const { v4: uuidv4, NIL: NIL_UUID } = require('uuid');

/**
 * 生成uuid
 */
const getUuid = () => uuidv4();

/**
 * 生成空uuid
 */
const getNilUuid = () => NIL_UUID;

module.exports = { getUuid, getNilUuid };
