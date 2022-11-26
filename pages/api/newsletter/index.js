import { createClient, insertDocument } from "../../../helpers/db-utils";


async function handler(req, res) {
    if (req.method === 'POST') {
        const collectionName = "newsletter-emails";
        const userEmail = req.body.email;
        if (!userEmail || !userEmail.includes('@') || userEmail.length < 1) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }
        let client = createClient();
        try {
            await client.connect();
        } catch (error) {
            res.status(500).json({ message: "Failed to connect to DB!" });
            return;
        }
        try {
            let newEmailDocument = {
                email: userEmail
            };
            await insertDocument(client, collectionName, newEmailDocument);
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserting data failed!" });
            return;
        }
        res.status(201).json({ message: "Success", email: userEmail });
    } else {
        res.status(200).json({ message: "OK" });
    }
}

export default handler;