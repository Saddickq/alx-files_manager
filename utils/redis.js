import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = true;

    this.client.on('error', (error) => {
      this.connected = false;
      console.log(error);
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    let result = null;
    try {
      result = await this.getAsync(key);
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  async set(key, value, time) {
    try {
      await this.setAsync(key, value, 'EX', time);
    } catch (error) {
      console.error(error);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(error);
    }
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
