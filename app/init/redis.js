const redis = require('redis');

const initRedis = () => {
  const client = redis.createClient({
    port: 14953,
    host: process.env.REDIS_ENDPOINT,
    password: process.env.REDIS_PWD
  });

  return client;
}

module.exports = initRedis;