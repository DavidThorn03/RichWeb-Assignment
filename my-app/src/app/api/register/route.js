export async function GET(req, res) {
// Make a note we are on
// the api. This goes to the console.
    console.log("in the api page")
// get the values
// that were sent across to us.
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("name")
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    const eircode = searchParams.get('eircode')
    const tel = searchParams.get('tel')
    const manager = false;
    console.log(name);
    console.log(email);
    console.log(pass);
    console.log(eircode);
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://b00152842:kWDcbYMGg9IOfpEt@threadud.ga2og.mongodb.net/?retryWrites=true&w=majority&appName=ThreadUD";
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
    const findResult = await collection.find({ email : email}).toArray();
    console.log('Found documents =>', findResult);
    if(findResult.length > 0){
        console.log("userAlready exists")
        return Response.json({ "data":"invalid" })
    }
    else{
        const input = await collection.insertOne({ email : email, password : pass, name : name, eircode : eircode, manager : manager, tel : tel });
        console.log(`A document was inserted with the _id: ${input.insertedId}`);
        return Response.json({ "data":"valid" })
    }
}
