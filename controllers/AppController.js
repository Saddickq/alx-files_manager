import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(_, res) {
    const status = {
      redis: await redisClient.isAlive(),
      db: await dbClient.isAlive(),
    };
    res.json(status).status(200);
  }

  static async getStats(_, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.json(stats).status(200);
  }
}

export default AppController;
