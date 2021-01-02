import React from 'react'
import Footer from '../ui-kit/Footer/Footer'
import HeaderSignedIn from '../ui-kit/Header/HeaderSignedIn'
import TodosComponent from './Todos/TodosComponent'


export default function Home() {

  return (
    <>
      <HeaderSignedIn />
      <TodosComponent />
      <Footer />
    </>
  )
}
