
import {useEffect, useState} from "react";
import "../styles/app-style.css"

export function MainPage(){
    return(
        <>
            <header><h1>To-Do Application</h1></header>
            <main>
                <TodoApplication />
            </main>
            <footer>
                Footer
            </footer>
        </>
    )
}

function TodoApplication(){
    const [todos, setTodos] =  useState([]);
    const [newTodo, setNewTodo] = useState("");

    async function loadTodos(){
        const res = await fetch("/api/todos");
        setTodos(await res.json());
    }
    useEffect(() =>{
        loadTodos();
        todos.map(t =>{
            console.log("Loaded " + t.name)
        })
    }, []);

    //implementing client talking to server
    async function handleAddTodo(name){
        console.log("Sending todo object: " + JSON.stringify(name))
        await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                "Content-Type": "application/json"
            },
        })
        loadTodos();
    }


    async function handleStartDoing(id){
        const response = await fetch(`/api/todos/start-doing/${id}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
        });
        loadTodos();

        if(response.ok){
            const updatedTodos = todos.map((todo) =>{
                if(todo.id === id){
                    return {...todo, status: "doing"}
                }
                return todo;
            });
            setTodos(updatedTodos)
        }
    }

    async function handleComplete(id){
        const response = await fetch(`/api/todos/complete/${id}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
        });
        loadTodos();

        if(response.ok){
            const updatedTodos = todos.map((todo) =>{
                if(todo.id === id){
                    return {...todo, status: "done"}
                }
                return todo;
            });
            setTodos(updatedTodos)
        }
    }

    return(
        <>
            <div className="add-todo-field">
                <input type="text"
                placeholder="Enter a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={() => handleAddTodo(newTodo)}>Add new todo</button>
            </div>
            <div className="todo-list">
            {todos.map( (todo) => (
                <div key={todo._id}>
                    <h2>{todo.name}</h2>
                    <p>{todo.status}</p>
                    <p>{todo._id}</p>
                    <div>
                        {todo.status === "todo" && (
                            <>
                                <button onClick={() => handleStartDoing(todo._id)}>Start doing</button>
                            </>
                        )}
                        {todo.status === "doing" &&(
                            <>
                                <button onClick={()=> handleComplete(todo._id)}>complete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}