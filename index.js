require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
            result.sort((a, b) => new Date(b.Post_date) - new Date(a.Post_date));
            res.send(result)
    })
    

    
    app.get('/allPost/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const quary = { _id : new ObjectId(id) }
      const result = await AllPost.findOne(quary)
      res.send(result)
  });
  











  
    app.post("/allPost", async (req, res) => {
     
        const post = req.body;
        const result = await AllPost.insertOne(post);
        res.send(result);
      
    });


      app.put("/allPost/:id",async (req, res) => {
    const id = req.params.id;
    const like= req.body;
    console.log(id,like)
      
    const filter = { _id: new ObjectId(id) };
    console.log(filter)
    const options = {upset: true};
    const updateSpot = {
      $set: {
        Like: like.Like,
      }
    }  
    const result = await AllPost.updateOne(filter,updateSpot,options);
    res.send(result)
})

  









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