import React from 'react'
import TodosComponent from '../Todos/TodosComponent'
import HeaderSignedIn from '../../ui-kit/Header/HeaderSignedIn';

export default function Home() {

  return (
    <>
      <HeaderSignedIn />
      <TodosComponent  />
    </>
  )
}
