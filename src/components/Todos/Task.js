import React, { useState, useContext, useEffect } from 'react'
import {listsContext} from './TodosComponent'

export default function Task({liId,liName,editingActive,checkbox}) {
    const {
        setCompletedClass,
        setListLabel,
        toggleEditingClass,
        setDeleteTask,
        handleRaiseTask,
        handleDropTask,
        toRepayActiveEditingLi} = useContext(listsContext)
    const [liClass, toggleLiClass] = useState('li')
    const [buttonClass, toggleButtonClass] = useState('button_edittask')
    const [currentInputValue, setInputValue] = useState(liName)

    useEffect(() => {
        if(editingActive){
            toggleLiClass('li editing')
            toggleButtonClass('button_save')
        }else{
            if(checkbox){
                toggleLiClass('li completed')
            }
            else{
                toggleLiClass('li') 
            }
            toggleButtonClass('button_edittask')
        }
    }, [editingActive,checkbox]);

    useEffect(()=>{
        setListLabel(currentInputValue,liId)
    },[currentInputValue])
    
    function handleToggleEditingClass(){
        toRepayActiveEditingLi()
        toggleEditingClass(liId,editingActive)
    }

    return (
        <li className={liClass} id={liId}>
            <input type="checkbox" className="task_check"
                onClick={(e)=>setCompletedClass(e.target.checked,liId)} defaultChecked={checkbox}
            />
            <label className="task"
                onClick={handleToggleEditingClass}
            >{liName}</label>
            <textarea type="text" className="textfield"
                onChange={(e)=>setInputValue(e.target.value)} 
                defaultValue={liName}
            ></textarea>
            <div className="editing_block">
                <div className="up"
                    onClick={()=>handleRaiseTask(liId)}
                ></div>
                <div className="down"
                    onClick={()=>handleDropTask(liId)}
                ></div> 
            </div>
            <div className="i">|</div>
            <div className={buttonClass}
            onClick={handleToggleEditingClass}
            ></div> 
            <div className="i">|</div>
            <div className="button_deletetask"
            onClick={()=>setDeleteTask(liId)}
            ></div>
        </li>
    )
}
