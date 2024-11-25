export async function GET(req, res) {
    console.log("in the api page")
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    console.log(id);
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Cart');
    const findResult = await collection.deleteOne({ _id : id}).toArray();
    console.log('Found documents =>', findResult);
    return Response.json(findResult);
}