import { dbClient } from '../utils/db';
import sha1 from 'sha1';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) res.status(400).send('Missing email');
        if (!password) res.status(400).send('Missing password');

        const exUser = await dbClient.dbClient.collection('users').findOne({ email });
        if (exUser) res.status(400).send('Already exist');

        const hspwd = sha1(password);
        const result = await dbClient.dbClient.collection('users').insertOne({ email, password: hspwd });

        userQueue.add({ userId: result.insertedId });
        return res.status(201).json({ id: result.insertedId, email });
    }
};