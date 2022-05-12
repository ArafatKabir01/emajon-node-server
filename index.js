const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();


app.use(express.json())
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l6zro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const productCollection = client.db('emajon').collection('products');

        app.get('/product', async(req , res) =>{
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.toArray();
            res.send(products)
        })
        
    }
    finally{}

}
run().catch(console.dir)
app.get('/hero' , (req , res) =>{
    res.send('hero is runing')
})


app.get('/' , (req , res) => {
    res.send('ok')
})
app.listen(port , ()=>{
    console.log(port)
} )