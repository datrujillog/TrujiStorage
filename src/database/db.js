import { MongoClient } from 'mongodb';
import colors from 'colors';
import envalid from "envalid";
import env from '../config/env.js';
// import env from '../config/config.js';


const client = new MongoClient(env.DATABASE_URL);
const dbName = env.DATABASE_NAME;
// const client = new MongoClient(config.urlMongodb);
// const dbName = config.urlMongodb

async function main() {
    try {
        await client.connect();
        console.log('Connected to the database');
        const db = client.db(dbName);

        // const collection = db.collection('example');
        // const result = await collection.insertOne({ name: 'Example' });

        console.log();
        console.log('Connected to the database =>>>'.bgGreen.black, db.databaseName.bgRed.black);
        console.log();
        console.log('Conexion establecida en el host:'.bgMagenta, db.client.s.url.bgRed.black);

        return db;

    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

const db = await main();

export default db;
