import React from 'react'

export default function IngregientEdit(props) {
  const {ingredient,
    handleIngredientChange,
    handleIngredientDelete}=props
  
  function handleChange(changes){
    handleIngredientChange(ingredient.id, {...ingredient,...changes})
  }  

    return (
        <>
          <label>Name              
            <input type="text" maxLength="20" value={ingredient.name} 
            onChange={e=>handleChange({name:e.target.value})}
            className= "recipe-edit__input"/>
          </label>
          <label>Amount
            <input type="text" maxLength="10" value={ingredient.amount} 
            onChange = {e=>handleChange({amount:e.target.value})}
            className= "recipe-edit__input" />
          </label>
          <button className="btn btn--danger"
            onClick={()=>handleIngredientDelete(ingredient.id)}
          >&times;</button>  
        </>
    )
}