import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("../client/dist"));
app.listen(3000);
app.use(bodyParser.json());

//Bruker bare en hardkodet liste så lenge!

export const TODOS = [
    {
        id: 1,
        name: "Ta oppvasken",
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

app.post("/api/todos", (req,res)=>{
    const newTodo = req.body;
    newTodo.id = TODOS.length + 1;

    TODOS.push(newTodo);
    res.json(newTodo);
})