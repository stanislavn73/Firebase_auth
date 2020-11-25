import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './components/AuthPage/signIn'
import SignUp from './components/AuthPage/signUp'
import firebase from './ConfigFirebase'
import Home from './components/AuthPage/Home';
import PrivateRoute from './components/AuthPage/PrivateRoute';
import { AuthProvider } from "./components/Auth";
import ForgotPassword from './components/AuthPage/ForgotPassword';

export const todosContext = React.createContext()

function App() {

  const { firestore } = firebase
  const todosContextValue = {
    saveNewTodo: sendNewList,
    saveChanges: UpdateFirestoreDocument,
    deleteTodo: deleteTodosDoc,
    getDatabaseData: getFirestoreData
  }

  async function getFirestoreData(user) {
    let newFirestoreData = []
    if (user&&user.email) {
      const fignia = await firestore().collection(user.email).get().then(snapshot => {
        snapshot.docs.forEach(todos => {
          newFirestoreData.push(todos.data())
        })
      })
    }
    return await newFirestoreData
  }

  function sendNewList(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user&&user.email) {
      console.log(user)
      firestore().collection(user.email).doc(todo.todoId).set(todo)
    }
  }

  function UpdateFirestoreDocument(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user&&user.email) {
      // console.log(todo);
      firestore().collection(user.email).doc(todo.todoId).update(todo)
    }
  }

  function deleteTodosDoc(todo, user) {
    if (typeof (todo) === 'object' && !Array.isArray(todo) && todo && user) {
      // console.log(todo)
      firestore().collection(user.email).doc(todo.todoId).delete()
    }
  }

  return (
    <Router>
      <AuthProvider >
        <todosContext.Provider value={todosContextValue}>
          <PrivateRoute exact path='/user' component={Home} />
        </todosContext.Provider>

        <Route path='/login' render={(props) => <SignIn
          {...props}
        />} />
        <Route path='/signup' render={(props) => <SignUp
          {...props}
        />} />
        <Route path='/forgot-password' component={ForgotPassword} />

      </AuthProvider>
    </Router>
  )
}

export default App;
