const express=require('express')
const app=express()
// const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const fileUpload=require('express-fileupload')
require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(fileUpload())
const port=process.env.PORT||5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rf3gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const bodyParser = require('body-parser');
app.get('/', (req, res) => {
    res.send('Running translator wonderfully')
});
async function run(){
    try {
        await client.connect();
        const database = client.db('translatorRobberLanguage');
        const photoCollection=database.collection('photos');
        // const translatedRövarspråkCollection=database.collection('rovarsprak')
        app.get('/photos',async(req,res)=>{
            const cursor= photoCollection.find({});
            const photos=await cursor.toArray();
            res.send(photos)
        })
        // // app.get('/normal/:textId',async(req,res)=>{
        // //     const id=req.params.textId;
        // // const query={query
        // //            };
        // // const text=await inputEnglishTextCollection.findOne(query);
        // // res.json(query)
        // // })
        app.post('/photos', async (req, res) => {
            // const photoInput = req.body;
            //    const result = await photoCollection.insertOne(photoInput);
            //    res.json(result);})
            const name=req.body.name;
            const email=req.body.email;
            const interest=req.body.interest;
            const pic=req.files.image;
            const picData=pic.data;
            const encodedPic=picData.toString('base64')
            const imageBuffer=Buffer.from(encodedPic,'base64')
            const photoDetails={
                name,
                email,
                interest,
                image:imageBuffer
            }
            const result = await photoCollection.insertOne(photoDetails);
            res.json(resultgit init)

        })
     
  
        
  

        console.log('Database Connected Successfully')
    
} finally {
   

}}
run().catch(console.dir)




app.listen(port, () => {
    console.log('Running volunteer network on port', port)
})