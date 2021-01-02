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
      setUser(user)
      setServerResponse('')
    })
    return unsubscribe
  }, [])

  function handleLoginUser({ password, email }, history, rememberMe, setRememberMe) {
    auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user)
        history.push('/profile')
        if (rememberMe) {
          auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        } else {
          auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        }
        setRememberMe(false)
        setServerResponse(false)
      })
      .catch((error) => {
        setServerResponse(error.message)
      })
  }

  function handleRegisterUser(values, resetForm, history) {
    auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(cred => {
        return firestore().collection('users').doc(cred.user.uid).set({
          firstName: values.firstName, lastName: values.lastName, email:values.email
        }).then(() => {
          setUser(cred.user)
          history.push('/todos')
          resetForm()
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
        history.push('/todos')
      })
      .catch((error) => {
        setServerResponse(error.message)
      })

  }

  function handleLogOut() {
    auth().signOut()
    setUser(false)
  }

  function resetPassword({ email }) {
    auth().sendPasswordResetEmail(email)
  }

  return (
    <AuthContext.Provider value={contextValue}>
      { children}
    </AuthContext.Provider>
  )
}









