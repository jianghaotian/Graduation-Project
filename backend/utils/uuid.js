const { v4: uuidv4 } = require('uuid');

/**
 * 生成uuid
 */
const getUuid = () => uuidv4();

module.exports = { getUuid };
