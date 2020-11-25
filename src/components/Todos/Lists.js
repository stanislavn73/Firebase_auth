import React from 'react'
import Todo from './Todo'

export default function Lists({todos}) {

    return (
        <>
        {console.log(todos)}            {todos.map(todo=>{
                return <Todo
                key={todo.todoId}
                {...todo}
                /> 
            })}
        </>
    )
}
