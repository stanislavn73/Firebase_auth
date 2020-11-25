import React from 'react'
import { useAuth } from "../../components/Auth"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(4),
  }
}))

export default function HeaderSignedIn() {
  const {handleLogOut} = useAuth()
  const classes = useStyles()

  return (
    <header>
      <div>
        <div className='comp' ></div>
      </div>
      <Button>Profile</Button>
      <Button>My Todos</Button>
      <Button
        color="primary"
        className={classes.button}
        onClick={handleLogOut}
      >Logout</Button>
    </header>
  )
}
