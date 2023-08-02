const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alswnsDev:mongo12@cluster0.8na7xk5.mongodb.net/firstDatabase?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function main() {
    try{
        await client.connect();

        console.log('DB 접속 성공');

        const collection = client.db('test').collection('person');

        await collection.insertOne({name : 'Andy', age : 30});
        console.log('문서 추가');

        const documents = await collection.find({name : 'Andy'}).toArray();
        console.log('찾은 문서 : ', documents);

        await collection.updateOne({name : 'Andy'}, {$set: {age:31}});
        console.log('문서 업데이트');

        const updateedDocuments = await collection.find({name : 'Andy'}).toArray();
        console.log('바뀐 문서', updateedDocuments);

        // await collection.deleteOne({name : 'Andy'});
        // console.log('문서 삭제');

        await client.close();

    }catch (err){
        console.error(err);
    }
}

main();