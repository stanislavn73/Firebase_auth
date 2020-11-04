import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button'
import SignIn from './components/AuthPage/signIn'
import SignUp from './components/AuthPage/signUp'
import Footer from './components/AuthPage/Footer'
import Header from './components/AuthPage/Header'
import TodosComponent from './components/Todos/TodosComponent'
import firebase from './ConfigFirebase'
import Home from './components/AuthPage/Home';

function App() {
  const [formName, setFormName] = useState('')
  const [serverResponse, setServerResponse] = useState('')
  const [user, setUser] = useState(null)
  const [userLogged, setUserLogged] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [receivedData, setReceivedData] = useState([])
  const { auth, firestore } = firebase
  const LOCAL_STORAGE_KEY = 'userSignInData'

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
      else {
        setReceivedData([])
      }
      let localStorageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (localStorageItem) { handleLoginUser(localStorageItem) }
    })
    return (() => {

    })
  }, [])

  useEffect(() => {
    if (userLogged) {
      getFirestoreData()
    } else {
      setReceivedData([])
    }
  }, [userLogged])

  function handleLoginUser({ password, email }) {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        setUserLogged(true)
        if (rememberMe) {
          // auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ password, email }))
        }
        setReceivedData([])
        setRememberMe(false)
      })
      .catch((error) => {
        setServerResponse(error.message)
      })
  }

  function handleRegisterUser(values, resetForm) {
    auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(cred => {
        return firestore().collection('users').doc(cred.user.uid).set({
          firstName: values.firstName, lastName: values.lastName
        })
          .then(() => {
            resetForm()
            auth().signOut()
          })
      })
      .catch(error => {
        setServerResponse(error.message)
      })
  }

  function handleLogOut(e) {
    e.preventDefault()
    auth().signOut()
    localStorage.clear()
    setUserLogged(false)
  }

  function overwriteFirestoreData(data) {
    console.log(data)
    // data.forEach(item=>{
    // firestore().collection('Todos').doc(`${uuidv4()}`).set(data)
    // })
    // getFirestoreData()

  }

  function handleGoogleAuth() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth().signInWithPopup(provider)
      .then(result => {
        return true
      //   let token = result.credential.accessToken
      })
      .catch((error) => {
        return error.message
      })
  }

  function getFirestoreData() {
    let newFirestoreData = []
    firestore().collection('Todos').get().then(snapshot => {
      snapshot.docs.forEach(todos => {
        newFirestoreData.push(todos.data())

      })
      setReceivedData(newFirestoreData)
    })
  }

  function sendFirestoreData(data) {
    console.log(data)
    firestore().collection('Todos').add(data)
  }


  function setNewList(newList) {
    sendFirestoreData()
    getFirestoreData()
  }

  return (
    // <Router>
      <>
        <Header
          setFormName={setFormName}
          userLogged={userLogged}
          handleLogOut={handleLogOut}
        />
       {/* <Route exact path='/' component={Home} /> */}

        {formName === 'registering' && !userLogged &&
          <SignUp
            serverResponse={serverResponse}
            setFormName={setFormName}
            handleRegisterUser={handleRegisterUser}
          />}
        {formName === 'sign_in' && !userLogged &&
          <SignIn
            setReceivedData={setReceivedData}
            setFormName={setFormName}
            serverResponse={serverResponse}
            setRememberMe={setRememberMe}
            handleLoginUser={handleLoginUser}
          />}
        {formName && !userLogged &&
          <div className='signIn_option_wrapper' >
            <div className='span_div' >
              <span>Or sign as</span>
            </div>
            <Button variant="contained"
              onClick={() => setServerResponse(handleGoogleAuth)}
            >
              <img src='https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg' />
              <span>Google</span>
            </Button>
            <Footer />
          </div>}
        {userLogged && <TodosComponent
          user={user}
          saveData={overwriteFirestoreData}
          setNewList={setNewList}
          lists={receivedData}
        />}
      </>
    // </Router>
  )
}

export default App;
