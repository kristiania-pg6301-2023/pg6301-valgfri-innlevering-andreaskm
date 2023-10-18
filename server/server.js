import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {MongoClient, ObjectId} from "mongodb";
import * as path from "path";





const app = express();
app.use(express.static("../client/dist"));
app.listen(process.env.PORT || 3000);
app.use(bodyParser.json());
dotenv.config();

app.use((req,res,next)=> {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"));
    }else{
        next();
    }
})

export const TODOS = [
    {
        id: 1,
        name: "Ta oppvasken server",
        status: "todo"
    },
    {
        id: 2,
        name: "Lage mock API",
        status: "doing"
    },
    {
        id: 3,
        name: "sove",
        status: "todo"
    },
    {
        id: 4,
        name: "spise pizza",
        status: "done"
    }
]

app.get("/api/todos", (req,res) =>{
    res.json(TODOS);
})
//Add todo route
app.post("/api/todos", (req,res)=>{
    const newTodo = req.body;
    console.log(newTodo)


    newTodo.id = TODOS.length + 1;
    newTodo.status = "todo";

    TODOS.push(newTodo);
    res.status(201).json(newTodo);
    res.send();
})

//Add handle start doing
app.post("/api/todos/start-doing/:id", (req,res) =>{
    const id = parseInt(req.params.id);

    const todo = TODOS.find(t=>t.id === id);

    if (todo){
        todo.status = "doing";
        res.json(todo);
    }else{
        res.status(404).json({error: "todo not found"})
    }

})

//Add handle complete

app.post("/api/todos/complete/:id", (req,res) =>{
    const id = parseInt(req.params.id);

    const todo = TODOS.find(t=>t.id === id);

    if (todo){
        console.log(todo.name + " is now flagged as done")
        todo.status = "done";
        res.json(todo);
    }else{
        res.status(404).json({error: "todo not found"})
    }
})

/*
//Connect to database
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

client.connect().then(connection =>{
    console.log("Connecting...")
    const db = connection.db("Todo_DB");
    todoApi.get("/api/todos", async (req, res) => {
        const todos = await db
            .collection("Todos")
            .find().toArray();

        res.json(todos);

    })
})
//updsate current todo in mongodb
client.connect().then(connection => {
    console.log("Sending start doing")
    const db = connection.db("Todo_DB");
    todoApi.post("/api/todos/start-doing/:id", async (req,res) =>{
        const id = req.params.id;
        const objectId = new ObjectId(id);
        try{

            await db.collection("Todos").updateOne({_id: objectId}, {$set: {status: "doing"}});
            res.sendStatus(204)
        }catch (error){
            res.status(400).json({error: "invalid id"});
        }
    })
})

//Completing task
client.connect().then(connection => {
    console.log("Complete")
    const db = connection.db("Todo_DB");
    todoApi.post("/api/todos/complete/:id", async (req,res) =>{
        const id = req.params.id;
        const objectId = new ObjectId(id);
        try{

            await db.collection("Todos").updateOne({_id: objectId}, {$set: {status: "complete"}});
            res.sendStatus(204)
        }catch (error){
            res.status(400).json({error: "invalid id"});
        }
    })
})


client.connect().then(connection => {
    const db = connection.db("Todo_DB");
    todoApi.post("/api/todos", async (req,res) =>{
        const {name} = req.body;
        await db.collection("Todos").insertOne({name: name, status : "todo"} );
        res.sendStatus(204)
    })
})

app.use(todoApi);
*/

