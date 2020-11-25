import React, { useState, useContext, useEffect } from 'react'
import { todoContext } from './TodosComponent'
import { DebounceInput } from 'react-debounce-input';

export default function Task({ taskId, taskName, editingActive, checkbox }) {
    const {
        setCompletedClass,
        setTaskName,
        toggleEditingClass,
        setDeleteTask,
        handleRaiseTask,
        handleDropTask,
        toRepayActiveEditingLi } = useContext(todoContext)
    const [liClass, toggleLiClass] = useState('li')
    const [buttonClass, toggleButtonClass] = useState('button_edittask')
    const [currentInputValue, setInputValue] = useState(taskName)

    useEffect(() => {
        if (editingActive) {
            toggleLiClass('li editing')
            toggleButtonClass('button_save')

        } else {
            if (checkbox) {
                toggleLiClass('li completed')
            }
            else {
                toggleLiClass('li')
            }
            toggleButtonClass('button_edittask')

        }
    }, [editingActive, checkbox]);

    useEffect(() => {
        setTaskName(currentInputValue, taskId)
    }, [currentInputValue])

    function handleToggleEditingClass() {
        toRepayActiveEditingLi()
        toggleEditingClass(taskId, editingActive)
    }

    return (
        <li className={liClass} id={taskId}>
            <input type="checkbox" className="task_check"
                onClick={(e) => setCompletedClass(e.target.checked, taskId)} defaultChecked={checkbox}
            />
            <label className="task"
                onClick={handleToggleEditingClass}
            >{taskName}</label>
            <DebounceInput
                element='textarea'
                minLength={1}
                debounceTimeout={300}
                type="text" className="textfield"
                onChange={(e) => setInputValue(e.target.value)}
                value={taskName}
            />
            <div className="editing_block">
                <div className="up"
                    onClick={() => handleRaiseTask(taskId)}
                ></div>
                <div className="down"
                    onClick={() => handleDropTask(taskId)}
                ></div>
            </div>
            <div className="i">|</div>
            <div className={buttonClass}
                onClick={handleToggleEditingClass}
            ></div>
            <div className="i">|</div>
            <div className="button_deletetask"
                onClick={() => setDeleteTask(taskId)}
            ></div>
        </li>
    )
}
