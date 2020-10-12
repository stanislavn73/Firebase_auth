import React, {useContext, useState, useEffect} from 'react'
import Task from './Task'
import {listsContext} from './TodosComponent'


export default function List(props) {
    const {listId,
        listItems,
        listName,
        editingActive}=props
    const {handleSetNewList,
            handleDeleteList,
            setHeadLabel,
            togglingHeadEditing,
            toRepayActiveEditingLi} = useContext(listsContext)
    const [inputValue, changeValue] = useState('')
    const [newListName, setListName] = useState(listName)
    //listName for defaultvalue of Input when it dowload from localstorage
    const [currentClass, toggleClass] = useState({head_container:'head_container',
                                                    buttonClassName:'head_edit'})

    useEffect(() => {
        toRepayActiveEditingLi()
    }, [])

     useEffect(() => {
        if(editingActive){
            toggleClass({head_container:'head_container editing',
                        buttonClassName:'button_save'})
        }else{
            toggleClass({head_container:'head_container',
                            buttonClassName:'head_edit'})
        }
    }, [editingActive])

    useEffect(()=>{
        setHeadLabel(newListName,listId)
    },[newListName])

    function handleAddTask(event){
        event.preventDefault()
        let value = inputValue
        if (value.trim()){
            changeValue('')
            handleSetNewList(value, listId)    
        }else{
            alert('Enter text of the task')
        }
    }

    function handleEditHead(){
        toRepayActiveEditingLi()
        togglingHeadEditing(editingActive,listId)
    }

    function setDefaultValue(){
        if(listName==='Place name of list here...'){
            return ''
        }else{return listName}
    }

    return (
        <ul className="todo_list" id={listId}>
            <div className={currentClass.head_container}>
                <div  className="head_calendar" ></div>
                <label  className="back_head"
                    onClick={()=>{handleEditHead()}}
                >{listName}</label>
                <input type="text" className='textfield' maxLength="40" 
                    onChange={(e)=>setListName(e.target.value)} 
                    defaultValue={setDefaultValue()}
                />
                <div className={currentClass.buttonClassName}
                    onClick={handleEditHead}
                ></div>
                <div className="i">|</div>
                <div  className="head_delete" 
                onClick={()=>handleDeleteList(listId)}
                ></div>
            </div>
            <form className="input_field">
                <div className="icon_plus"></div>
                <input className="input1" type="text" name="task" placeholder="Start typing here to create a task..."
                    onChange={(e)=>changeValue(e.target.value)} value={inputValue}
                />
                <button 
                onClick={handleAddTask}
                    className="button_addtask" type="submit" name="Add Task"
                >Add Task</button>
            </form>
            {listItems.map(
                task=><Task key={task.liId} {...task}
                />)
            }
        </ul>
    )
}
