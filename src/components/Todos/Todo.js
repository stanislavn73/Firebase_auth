import React, { useContext, useState, useEffect } from 'react'
import Task from './Task'
import { todoContext } from './TodosComponent'
import { DebounceInput } from 'react-debounce-input';


export default function Todo(props) {
    const { todoId,
        tasks,
        todoName,
        editingActive } = props
    const { handleSetNewTodo,
        handleDeleteTodo,
        togglingHeadEditing,
        toRepayActiveEditingLi,
        setTodoName } = useContext(todoContext)
    const [inputValue, changeValue] = useState('')
    const [currentTodoInputValue, setTodoInputValue] = useState(todoName)
    //todoName for defaultvalue of Input when it dowload from localstorage
    const [currentClass, toggleClass] = useState({
        head_container: 'head_container',
        buttonClassName: 'head_edit'
    })

    useEffect(() => {
        setTodoName(currentTodoInputValue, todoId)
    }, [currentTodoInputValue])

    useEffect(() => {
        if (editingActive) {
            toggleClass({
                head_container: 'head_container editing',
                buttonClassName: 'button_save'
            })
        } else {
            toggleClass({
                head_container: 'head_container',
                buttonClassName: 'head_edit'
            })
        }
    }, [editingActive])

    function handleAddTask(event) {
        event.preventDefault()
        let value = inputValue
        if (value.trim()) {
            changeValue('')
            handleSetNewTodo(value, todoId)
        } else {
            alert('Enter text of the task')
        }
    }

    function handleEditHead() {
        toRepayActiveEditingLi()
        togglingHeadEditing(editingActive, todoId)
    }

    function setDefaultValue() {
        if (todoName === 'Place name of list here...') {
            return ''
        } else { return todoName }
    }

    return (
        <ul className="todo_list" id={todoId}>
            <div className={currentClass.head_container}>
                <div className="head_calendar" ></div>
                <label className="back_head"
                    onClick={handleEditHead}
                >{todoName}</label>
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    type="text" className='textfield' maxLength="40"
                    onChange={(e) => setTodoInputValue(e.target.value)}
                    value={todoName}
                />
                <div className={currentClass.buttonClassName}
                    onClick={handleEditHead}
                ></div>
                <div className="i">|</div>
                <div className="head_delete"
                    onClick={() => handleDeleteTodo(todoId)}
                ></div>
            </div>
            <form className="input_field">
                <div className="icon_plus"></div>
                <input className="input1" type="text" name="task" placeholder="Start typing here to create a task..."
                    onChange={(e) => changeValue(e.target.value)} value={inputValue}
                />
                <button
                    onClick={handleAddTask}
                    className="button_addtask" type="submit" name="Add Task"
                >Add Task</button>
            </form>
            {tasks.map(
                task => <Task key={task.taskId} {...task}
                />)
            }
        </ul>
    )
}
