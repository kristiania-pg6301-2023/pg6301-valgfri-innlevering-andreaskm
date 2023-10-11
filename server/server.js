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