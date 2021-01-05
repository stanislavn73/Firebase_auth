import { Button } from '@material-ui/core'
import React from 'react'
import { useAuth } from "../../components/Auth";

export default function FooterLoggedOut({history}) {
  const {handleGoogleAuth, user} = useAuth()
  return (
    !user &&
      <div className='signIn_option_wrapper' >
        <div className='span_div' >
          <span>Or sign as</span>
        </div>
        <Button variant="contained"
          onClick={()=>handleGoogleAuth(history)}
        >
          <img src='https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg' alt='' />
          <span>Google</span>
        </Button>
      </div>
  )
}
