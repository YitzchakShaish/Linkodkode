import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const URL = process.env.URLMongoDB 


// Create a new MongoClient
// This client will be used to connect to the MongoDB database
const client = new MongoClient(URL);
let db;


// Function to connect to the MongoDB database
// This function returns a promise that resolves to the database object
export async function connectToDatabase() {
    try {
        if (db) {
            console.log('Connecting to MongoDB...')
            return db
        }
        await client.connect();
        db = client.db('Linkodkod');
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

