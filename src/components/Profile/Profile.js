import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../ui-kit/Footer/Footer'
import HeaderSignedIn from '../../ui-kit/Header/HeaderSignedIn'
import { useAuth } from '../Auth'
import { todosContext } from "../../App";

export default function Profile() {
  const { user } = useAuth()
  const { getUserData } = useContext(todosContext)
  const [userData, setUserData] = useState([])
  useEffect(() => {
    getUserData(user).then((response) => setUserData(response))
      .catch(() => setUserData([]))
    return getUserData
  }, [user])
  return (
    <>
      <HeaderSignedIn />
      <h1>Welcome</h1>
      {userData && userData.map(item => {
        return <h2 key={item.email} >{item.firstName + ' '}
          {item.lastName}</h2>
      })}

      <Footer />
    </>
  )
}
