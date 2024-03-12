import { MongoClient } from "mongodb";

class DBClient {
    constructor() {
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || 27017;
        this.database = process.env.DB_DATABASE || 'files_manage';
        this.uri = `mongodb://${this.host}:${this.port}`;
        
        MongoClient.connect(this.uri, { useUnifiedTopology: true }, (error, client) => {
            if (error) this.dbClient = false;
            else this.dbClient = client.db(database);
        });
    
    };

    isAlive() {
        return !!this.dbClient;
    };

    async nbUsers() {
        return this.dbClient.collection("users").countDocuments();
    };

    async nbFiles() {
        return this.dbClient.collection("files").countDocuments();
    };
};

const dbClient = new DBClient();

module.exports = dbClient;
