import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import firebase from './ConfigFirebase'
import PrivateLoggedRoute from './components/AuthPage/PrivateLoggedRoute';
import { AuthProvider } from "./components/Auth";
import UnloggedRoutes from './components/AuthPage/UnloggedRoutes';

export const todosContext = React.createContext()
function App() {
  const { firestore } = firebase
  const todosContextValue = {
    saveNewTodo: sendNewList,
    saveChanges: UpdateFirestoreDocument,
    deleteTodo: deleteTodosDoc,
    getDatabaseData: getFirestoreData,
    getUserData
  }

  async function getFirestoreData(user) {
    let newFirestoreData = []
    if (user && user.email) {
      await firestore().collection(user.email).get().then(snapshot => {
        snapshot.docs.forEach(todos => {
          newFirestoreData.push(todos.data())
        })
      })
    }
    return await newFirestoreData
  }

  async function getUserData(user) {
    let userData=[]
    if (user) {
      await firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          userData.push(doc.data())
        })
      })
      return userData
    }
  }

  function sendNewList(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user && user.email) {
      firestore().collection(user.email).doc(todo.todoId).set(todo)
    }
  }

  function UpdateFirestoreDocument(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user && user.email) {
      firestore().collection(user.email).doc(todo.todoId).update(todo)
    }
  }

  function deleteTodosDoc(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user) {
      firestore().collection(user.email).doc(todo.todoId).delete()
    }
  }


  return (
    <Router>
      <AuthProvider >
        <todosContext.Provider value={todosContextValue}>
          <PrivateLoggedRoute redirect='/login' />
        </todosContext.Provider>
        <UnloggedRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App;
