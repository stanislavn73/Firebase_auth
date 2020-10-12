import React, {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Lists from './Lists'

export const listsContext = React.createContext()

function TodosComponent({user, saveData, lists, setNewList}) {
  
  // const LOCAL_STORAGE_KEY = 'lists'
  // const [lists, setNewList] = useState(sampleLists)
  const listsContextValue = {
    handleSetNewList,
    handleDeleteList,
    setHeadLabel,
    togglingHeadEditing,
    setCompletedClass,
    setListLabel,
    toggleEditingClass,
    setDeleteTask,
    handleRaiseTask,
    handleDropTask,
    toRepayActiveEditingLi,
  }
  
  let newList = {
    listId:uuidv4(),
    listName:'Place name of list here...',
    editingActive:false,
    listItems:[{
      liId:uuidv4(),
      liName:'Place name of Task here...',
      editingActive:false,
      checkbox:false
    }]  
  }

  useEffect(() => {
    // if(!lists) lists=sampleLists
    // let localStorageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[]
    // setNewList(localStorageItem)
  }, [])

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(lists))

  }, [lists])
  
  function handleSetNewList(value, id){
    let newTask={
      liId:uuidv4(),
      liName:value
    }
    let indexOfList = lists.findIndex(item => item.listId===id)
    let newLists = [...lists]
    newLists[indexOfList].listItems.push(newTask)
    saveData(newLists)
  }

  function handleDeleteList(id){
    let indexOfList = lists.findIndex(item => item.listId===id)
    let newLists = [...lists]
    newLists.splice(indexOfList,1)
    saveData([...newLists])
  }

  function setHeadLabel(value,id){
    let indexOfList = lists.findIndex(item => item.listId===id)
    let newLists = [...lists]
    newLists[indexOfList].listName=value
    saveData(newLists)
  }

  function togglingHeadEditing(editing,id){
    editing?editing=false:editing=true
    let indexOfList = lists.findIndex(item => item.listId===id)
    let newLists = [...lists]
    newLists[indexOfList].editingActive=editing
  }

  function setCompletedClass(checked,id){
    let newLists = lists.map(list => {
      let index=list.listItems.findIndex(li=>li.liId===id)
        if(index>-1){
          list.listItems[index].checkbox=checked
          return list
        }else{return list}
      })
      saveData(newLists)
  }

  function toggleEditingClass(id,editingActive){
    if (editingActive){editingActive=false}
    else{editingActive=true}
    let newLists = lists.map(list => {
      let index=list.listItems.findIndex(li=>li.liId===id)
        if(index>-1){
          list.listItems[index].editingActive=editingActive
          return list
        }else{return list}
    })
    saveData(newLists)
  }

  function setListLabel(newName,id){
    let newLists = lists.map(list => {
      let index=list.listItems.findIndex(li=>li.liId===id)
        if(index>-1){
          list.listItems[index].liName=newName
          return list
        }else{return list}
    })
    saveData(newLists)
  }

  function setDeleteTask(id){
    let newLists = lists.map(list => {
      let index=list.listItems.findIndex(li=>li.liId===id)
      if(index>-1){
        list.listItems.splice(index,1)
        return list
      }else{
        return list
      }
    })
    saveData(newLists)
  }

  function handleDropTask(id){
    let newLists = lists.map(list => {
      let liArray = list.listItems
      let index=liArray.findIndex(li=>li.liId===id)
      if(index>-1){
        if(liArray[index+1]){
          [liArray[index],liArray[index+1]]=[liArray[index+1],liArray[index]]
          return list
        }else{return list}
      }else{return list}
    })
    saveData(newLists)
  }

  function handleRaiseTask(id){
    let newLists = lists.map(list => {
      let liArray = list.listItems
      let index=liArray.findIndex(li=>li.liId===id)
      if(index>-1){
        if(liArray[index-1]){
          [liArray[index],liArray[index-1]]=[liArray[index-1],liArray[index]]
          return list
        }else{return list}
      }else{
        return list
      }
    })
    saveData(newLists)
  }

  function toRepayActiveEditingLi(){
    let newLists=lists.map(list=>{
      list.editingActive=false
      list.listItems.map(li=>{
        li.editingActive=false
        return li
      })
    return list
    })
    saveData(newLists)
  }

  return (

    <div>
      <header>
        <a href="https://google.com" >simple to do list</a>
        <p>from ruby garage</p>
      </header>
      <input onClick={()=>setNewList(newList)}
        type="submit" value="Add TODO List" id="do_form"
      />
      <br/>
      <main id="general">
        <listsContext.Provider value={listsContextValue}>
        <Lists lists={lists}/>
        </listsContext.Provider>
      </main>
      <br/><br/><br/><br/>
      <footer>c Ruby Garage</footer>
    </div>
  )
}

let sampleLists = [
  {
    listId:uuidv4(),
    listName:'Place name of list here...',
    editingActive:false,
    listItems:[{
      liId:uuidv4(),
      liName:'to Throw out the trash',
      editingActive:false,
      checkbox:false
    }]
  }
  // {  
  //   listId:uuidv4(),
  //   listName:'Place name of list here...',
  //   editingActive:false,
  //   listItems:[{
  //     liId:uuidv4(),
  //     liName:'Finish React App',
  //     editingActive:false,
  //     checkbox:false
  //     }
  //   ] 
  // }
]

export default TodosComponent
