import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;
  const data = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shuvold.mongodb.net/my_database?retryWrites=true&w=majority`
  );

  const db = client.db();

  const tasksCollection = db.collection("tasks");

  if (data.action === "ADD") {
    await tasksCollection.insertOne(data.task);
  } else {
    await tasksCollection.replaceOne({ id: data.id }, data.task, { upsert: true });
  }

  client.close();

  res.status(201).json({ message: "Task Added" });
}
