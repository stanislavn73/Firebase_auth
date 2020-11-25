import React, { useState, useContext, useEffect } from "react";
import firebase from '../ConfigFirebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const { auth, firestore } = firebase
  const [user, setUser] = useState()
  const [serverResponse, setServerResponse] = useState('')
  const [loading, setLoading] = useState(true)
  const LOCAL_STORAGE_KEY = 'userSignInData'
  const contextValue = {
    user,
    handleLoginUser,
    handleRegisterUser,
    handleLogOut,
    serverResponse,
    setServerResponse,
    resetPassword,
    handleGoogleAuth
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      // if (user) {
      setUser(user)
      setLoading(false)
      let localStorageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (localStorageItem) { handleLoginUser(localStorageItem) }

    })
    return unsubscribe
  }, [])

  function handleLoginUser({ password, email }, history, rememberMe, setRememberMe) {
    auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user)
        history.push('/user')
        if (rememberMe) {
          // auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ password, email }))
        }
        // setReceivedData([])
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
        }).then(() => {
          resetForm()
          auth().signOut()
        })
      })
      .catch(error => {
        setServerResponse(error.message)
      })
  }

  function handleGoogleAuth(history) {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth().signInWithPopup(provider)
      .then(result => {
        setUser(result.user)
        console.log('redirect?')
        history.push('/user')
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ password, result.email }))
      })
      .catch((error) => {
        return error.message
      })
      
  }

  function handleLogOut() {
    auth().signOut()
    localStorage.clear()
    setUser(false)
  }

  function resetPassword({ email }) {
    auth().sendPasswordResetEmail(email)
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  )
}









