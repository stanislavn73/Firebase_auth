import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(4),
  }
}))

export default function HeaderSignedOut() {

  const classes = useStyles()
  return (
    <header>
      <div>
        <div className='comp' ></div>
      </div>
      <Button
        color="primary"
        className={classes.button}
        component={Link} to='/login'
      >Login</Button>
      <Button
        color="primary"
        className={classes.button}
        component={Link} to='/signup'
      >Register
      </Button>
    </header>
  )
}
