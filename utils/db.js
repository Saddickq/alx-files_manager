import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${this.host}:${this.port}`;
    MongoClient.connect(this.url, { useUnifiedTopology: true })
    .then((client) => {
        this.dbClient = client.db(this.database)
        this.userCollection = this.dbClient.collection('users');
        this.filesCollection = this.dbClient.collection('files');
    })
    .catch((error) => {
        this.dbClient = false;
    });

  }
  isAlive() {
    return (!!this.dbClient);
  }

  async nbUsers() {
    const userCount = await this.userCollection.countDocuments();
    return (userCount);
  }

  async nbFiles() {
    const filesCount = await this.filesCollection.countDocuments();
    return (filesCount);
  }
};

const dbClient = new DBClient();

export default dbClient;
