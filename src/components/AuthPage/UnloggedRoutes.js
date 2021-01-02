import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFoundPage from '../../ui-kit/NotFoundPage';
import { useAuth } from '../Auth';
import ForgotPassword from './ForgotPassword';
import SignIn from './signIn';
import SignUp from './signUp';



export default function UnloggedRoutes() {
  const {user} = useAuth
  return (
    <>
     {!user&&<Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/login' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/404' component={NotFoundPage} />
        </Switch>}
    </>
  )
}
