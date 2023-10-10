
import {useEffect, useState} from "react";
import "../styles/app-style.css"

export function MainPage(){
    return(
        <>
            <header><h1>Header</h1></header>
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
    }, []);

    function addTodo(){
        if(newTodo.trim() === ""){
            return;
        }

        const newTodoItem = {
            id: todos.length+1,
            name: newTodo,
            status: "todo"
        };

        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    }

    function handleStartDoing(id){
        const updatedTodos = todos.map((todo) =>{
            if(todo.id === id){
                return {...todo, status: "doing"}
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function handleComplete(id){
        const updatedTodos = todos.map((todo) =>{
            if(todo.id === id){
                return{...todo, status: "done"}
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    return(
        <>
            <div>
                <input type="text"
                placeholder="Enter a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodo}>Add new todo</button>
            </div>
            {todos.map( (todo) => (
                <div key={todo.id}>
                    <h2>{todo.name}</h2>
                    <p>{todo.status}</p>
                    <div>
                        {todo.status === "todo" && (
                            <>
                                <button onClick={() => handleStartDoing(todo.id)}>Start doing</button>
                            </>
                        )}
                        {todo.status === "doing" &&(
                            <>
                                <button onClick={()=> handleComplete(todo.id)}>complete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}