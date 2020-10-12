import React from 'react'
import List from './List'

export default function Lists({lists}) {

    return (
        <>
            {lists.map(list=>{
                return <List
                key={list.listId}
                {...list}
                /> 
            })}
        </>
    )
}
