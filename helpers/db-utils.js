import { MongoClient } from "mongodb";
const dbName = "events";
export function createClient() {
    const dbPassword = "testerpassword";
    const username = "Tester";
    const url = `mongodb+srv://${username}:${dbPassword}@cluster0.nrje3.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);
    return client;
}

export async function insertDocument(client, collectionName, document) {
    const collection = client.db(dbName).collection(collectionName);
    await collection.insertOne(document);
}

export async function findCommentsByEvent(client, collectionName, eventId) {
    const collection = client.db(dbName).collection(collectionName);
    const comments = await collection.find({ eventId: eventId }).sort({ _id: 1 }).toArray();
    return comments;
}