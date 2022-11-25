import { createClient, findCommentsByEvent, insertDocument } from "../../../helpers/db-utils";

async function handler(req, res) {
    const eventId = req.query.eventId;
    const collectionName = "comments";
    let client = createClient();
    if (req.method === "POST") {
        const { email, name, text } = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: "Invalid Input" });
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        };
        try {
            await client.connect();
        } catch (err) {
            res.status(500).json({ message: "Failed to connect to DB!" });
            return;
        }
        try {
            await insertDocument(client, collectionName, newComment);
        } catch (err) {
            res.status(500).json({ message: "Inserting data failed!" });
            client.close();
            return;
        }
        res.status(201).json({ message: "Success! Comment Added", comment: newComment });
    }

    if (req.method === "GET") {
        let comments;
        try {
            await client.connect();
            comments = await findCommentsByEvent(client, collectionName, eventId);
        } catch (err) {
            res.status(500).json({ message: "Failed to connect to DB and get comments!" });
            client.close();
            return;
        }
        res.status(200).json({ message: "Success! Comments received", comments: comments });
    }
    client.close();
}
export default handler;