require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TeamConnect:WMcqPqSgUjSl2EEP@cluster0.2vutuar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const AllPost = client.db('TeamConnect').collection('AllPost');


    app.get('/allPost', async(req,res)=>{
      const find = AllPost.find();
            const result = await find.toArray();
            res.send(result)
    })



    app.post("/allPost", async (req, res) => {
     
        const post = req.body;
        const result = await AllPost.insertOne(post);
        res.send(result);
      
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);




app.get("/", (req,res)=>{
    res.send('server is running');
})

app.listen(port, ()=>
    console.log('running port is ' , port )
)