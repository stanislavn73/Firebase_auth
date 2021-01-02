import React from 'react'
import { useAuth } from "../../components/Auth"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
      <Button component={Link} to='/profile'
      >Profile</Button>
      <Button component={Link} to='/todos'
      >My Todos</Button>
      <Button component={Link} to='/recipes'
      >My Recipes</Button>

      <Button
        color="primary"
        className={classes.button}
        onClick={handleLogOut}
      >Logout</Button>
    </header>
  )
}
