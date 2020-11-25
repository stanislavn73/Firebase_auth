import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { todosContext } from '../../App'
import { useAuth } from '../Auth'
import Lists from './Lists'

export const todoContext = React.createContext()

function TodosComponent() {
  const { user } = useAuth()
  const {
    saveChanges,
    saveNewTodo,
    deleteTodo,
    getDatabaseData
  } = useContext(todosContext)
  const [todos, setTodos] = useState([])
  const TodoContextValue = {
    handleSetNewTodo,
    handleDeleteTodo,
    setTaskName,
    togglingHeadEditing,
    setCompletedClass,
    setTodoName,
    toggleEditingClass,
    setDeleteTask,
    handleRaiseTask,
    handleDropTask,
    toRepayActiveEditingLi,
  }

  let newTodo = {
    todoId: uuidv4(),
    todoName: 'Place name of todo here...',
    editingActive: false,
    tasks: [{
      taskId: uuidv4(),
      taskName: 'Place name of Task here...',
      editingActive: false,
      checkbox: false
    }]
  }

  useEffect(() => {
    getDatabaseData(user)
      .then(response => setTodos(response))
      .catch(() => setTodos([]))
    console.log(todos)
  }, [user])

  function handleSetNewTodo(value, id) {
    let newTask = {
      taskId: uuidv4(),
      taskName: value,
      editingActive: false,
      checkbox: false
    }
    let indexOfTodo = todos.findIndex(todo => todo.todoId === id)
    let copyOfTodos = [...todos]
    let foundedTodo = copyOfTodos[indexOfTodo]
    foundedTodo.tasks.push(newTask)
    saveChanges(foundedTodo, user)
    setTodos(copyOfTodos)
  }

  function handleDeleteTodo(id) {
    let indexOfTodo = todos.findIndex(todo => todo.todoId === id)
    let copyOfTodos = [...todos]
    copyOfTodos.splice(indexOfTodo, 1)
    setTodos(copyOfTodos)
    deleteTodo(todos[indexOfTodo], user)
  }

  function setTodoName(name, id) {
    let indexOfTodo = todos.findIndex(todo => todo.todoId === id)
    let copyOfTodos = [...todos]
    copyOfTodos[indexOfTodo].todoName = name
    setTodos(copyOfTodos)
    saveChanges(copyOfTodos[indexOfTodo], user)
  }

  function togglingHeadEditing(editing, id) {
    editing ? editing = false : editing = true
    let indexOfTodo = todos.findIndex(todo => todo.todoId === id)
    let copyOfTodos = [...todos]
    console.log(copyOfTodos, indexOfTodo)
    copyOfTodos[indexOfTodo].editingActive = editing
    setTodos(copyOfTodos)
    saveChanges(copyOfTodos[indexOfTodo], user)//need send todo object not todos
  }

  function setCompletedClass(checked, id) {
    let currentTodo = {}
    let copyOfTodos = todos.map(todo => {
      let index = todo.tasks.findIndex(task => task.taskId === id)
      if (index > -1) {
        currentTodo = todo
        todo.tasks[index].checkbox = checked
      }
      return todo
    })
    setTodos(copyOfTodos)
    saveChanges(currentTodo, user)
  }

  function toggleEditingClass(id, editingActive) {
    let currentTodo = {}
    if (editingActive) { editingActive = false }
    else { editingActive = true }
    let copyOfTodos = todos.map((todo) => {
      let taskIndex = todo.tasks.findIndex(task => task.taskId === id)
      if (taskIndex > -1) {
        todo.tasks[taskIndex].editingActive = editingActive
        currentTodo = todo
      }
      return todo
    })
    setTodos(copyOfTodos)
    saveChanges(currentTodo, user)
  }

  function setTaskName(newName, id) {
    let currentTodo = {}
    let copyOfTodos = todos.map(todo => {
      let taskIndex = todo.tasks.findIndex(task => task.taskId === id)
      if (taskIndex > -1) {
        todo.tasks[taskIndex].taskName = newName
        currentTodo = todo
      }
      return todo
    })
    setTodos(copyOfTodos)
    saveChanges(currentTodo, user)
  }

  function setDeleteTask(id) {
    let currentTodo = {}
    let copyOfTodos = todos.map(todo => {
      let taskIndex = todo.tasks.findIndex(task => task.taskId === id)
      if (taskIndex > -1) {
        currentTodo = todo
        todo.tasks.splice(taskIndex, 1)
      }
      return todo
    })
    setTodos(copyOfTodos)
    saveChanges(currentTodo, user)
  }

  function handleDropTask(id) {
    let currentTodo = {}
    let copyOfTodos = todos.map(todo => {
      let tasks = todo.tasks
      let taskIndex = tasks.findIndex(task => task.taskId === id)
      if (taskIndex > -1) {
        if (tasks[taskIndex + 1]) {
          [tasks[taskIndex], tasks[taskIndex + 1]] = [tasks[taskIndex + 1], tasks[taskIndex]]
          currentTodo = todo
        }
      }
      return todo
    })
    if (Object.keys(currentTodo).length !== 0) {
      setTodos(copyOfTodos)
      saveChanges(currentTodo, user)
    }
  }

  function handleRaiseTask(id) {
    let currentTodo = {}
    let copyOfTodos = todos.map(todo => {
      let tasks = todo.tasks
      let taskIndex = tasks.findIndex(task => task.taskId === id)
      if (taskIndex > -1 && tasks[taskIndex - 1]) {
        [tasks[taskIndex], tasks[taskIndex - 1]] = [tasks[taskIndex - 1], tasks[taskIndex]]
        currentTodo = todo
      }
      return todo
    })
    if (Object.keys(currentTodo).length !== 0) {
      saveChanges(currentTodo, user)
      setTodos(copyOfTodos)
    }
  }

  function toRepayActiveEditingLi() {
    todos.map(todo => {
      todo.editingActive = false
      todo.tasks.map(task => {
        task.editingActive = false
        return task
      })
      saveChanges(todo)
      return todo
    })

  }
  function handleAddNewTodo() {

    setTodos([newTodo, ...todos])
    saveNewTodo(newTodo, user)
  }

  return (

    <div>
      {/* {console.log('local data - ', todos)} */}
      <header>
        <a href="https://google.com" >simple todo list</a>
        <p>from ruby garage</p>
      </header>
      <input onClick={handleAddNewTodo}
        type="submit" value="Add TODO" id="do_form"
      />
      <br />
      <main id="general">
        <todoContext.Provider value={TodoContextValue}>
          <Lists todos={todos} />
        </todoContext.Provider>
      </main>
      <br /><br /><br /><br />
      <footer>c Ruby Garage</footer>
    </div>
  )
}

export default TodosComponent
