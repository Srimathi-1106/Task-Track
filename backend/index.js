import express from "express"
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app=express()

const url="mongodb+srv://srimathi_1106:sri123@srimathip.zfeb5xf.mongodb.net/?retryWrites=true&w=majority&appName=SrimathiP"
const client=new MongoClient(url);
await client.connect();
console.log("Database successfully connected!");



app.use(express.json());   // to check input obtained is in json format by middleware
app.use(cors())


const auth = (request,response,next)=>{
    try{
        const token=request.header("backend-token"); // backend-token is keyname
        jwt.verify(token,"student");
        next();
    }
    catch(error){
        response.status(401).send({message:error.message});
    }
}

app.get("/",function(request, response){
    console.log("hello");
    response.status(200).send("Hello World");
})

app.post("/post",async function(request,response){
    const getPostman = request.body;
    const sendMethod =await client.db("TaskManager").collection("Tasks").insertOne(getPostman);
    response.status(201).send(sendMethod);
})

app.post("/postmany",async (req,res)=>{
    const getMany = req.body;
    const sendMethod = await client.db("TaskManager").collection("Tasks").insertMany(getMany);
    res.status(201).send(sendMethod); 
})

app.get("/get",async (req, res)=>{
    const getMethod=await client.db("TaskManager").collection("Tasks").find({}).toArray();
    res.status(200).send(getMethod);
})

app.get("/getone/:id",async (req,res) => {
    const {id} = req.params;
    const getMethod=await client.db("TaskManager").collection("Tasks").findOne({_id:new ObjectId(id)});
    res.status(200).send(getMethod);
})

app.put("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const getPostman = req.body;
    const updateMethod = await client.db("TaskManager").collection("Tasks").updateOne({_id:new ObjectId(id)},{$set:getPostman});
    res.status(201).send(updateMethod);
})

app.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params;
    const deleteMethod= await client.db("TaskManager").collection("Tasks").deleteOne({_id:new ObjectId(id)});
    res.status(200).send(deleteMethod);
})

app.listen(4000,()=>{
    console.log("Server is running at port 4000");
})
