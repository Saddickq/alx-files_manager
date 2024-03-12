import { dbClient } from "../utils/db";
import { redisClient } from "../utils/redis";

class AppController {
    static getStatus(req, res) {
        const redisStatus = redisClient.isAlive();
        const dbStatus = dbClient.isAlive();

        res.status(200).json({ redis: redisStatus, db: dbStatus });
    }
    static async getStats(req, res) {
        const userTotal = await dbClient.nbUsers();
        const filesTotal = await dbClient.nbFiles();

        res.status(200).json({ users: userTotal, files: filesTotal });
    }
};

module.exports = AppController;