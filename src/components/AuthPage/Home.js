import React from 'react'
import TodosComponent from '../Todos/TodosComponent'
import HeaderSignedIn from '../../ui-kit/Header/HeaderSignedIn';
import Footer from '../../ui-kit/Footer/Footer';

export default function Home() {

  return (
    <>
      <HeaderSignedIn />
      <TodosComponent  />
      <Footer />
    </>
  )
}
