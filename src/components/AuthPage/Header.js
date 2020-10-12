import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(4),
  }
}))

export default function Header({setFormName,userLogged,handleLogOut}) {

  const classes = useStyles()
  return (
      <header>
        <div>
          <div className='comp'  ></div>
        </div>
        {userLogged &&
        // user!=='pending' &&
         <Button>Profile</Button>}
        {userLogged &&
        // user!=='pending' && 
        <Button>My Todos</Button>}
        {userLogged &&
        // user!=='pending'
        //  &&  
        <Button
          color="primary"
          className={classes.button}
          onClick={handleLogOut}
        >Logout</Button>}
        {!userLogged &&
        // user!=='pending' && 
        <Button
          color="primary"
          className={classes.button}
          onClick={() => setFormName('sign_in')}
        >Login</Button>}
        {!userLogged &&
        // user!=='pending' && 
        <Button
          color="primary"
          className={classes.button}
          onClick={() => setFormName('registering')}
        >Register</Button>}
      </header>
  )
}
