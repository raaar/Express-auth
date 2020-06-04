const db = require('./mongoose');
const redisDB = require('./redis');
const init = async (APP, express) => {
  const mongoose = await db(APP, express);
  const redis = await redisDB(APP, express);

  APP.db = mongoose;
  APP.redis = redis;
  express.emit('ready');

  return APP;
}

module.exports = init;