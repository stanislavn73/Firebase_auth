import React,  {useContext} from 'react'
import IngregientEdit from './IngregientEdit'
import { recipeContext } from './RecipesApp'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange,
            handleRecipeSelect} = useContext(recipeContext)
    
    function handleChange (changes){
        handleRecipeChange(recipe.id,{...recipe,...changes})
    }

    function handleIngredientChange(id,ingredient){
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(item=>item.id===id)
        newIngredients[index]=ingredient
        handleChange({ingredients:newIngredients})
    }

    function handleIndgredientAdd(){
        const newIngredient = {
            id:uuidv4(),
            name:'',
            amount:''
        }
        handleChange({ ingredients: [...recipe.ingredients,newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ingredients:recipe.ingredients
            .filter(i=>i.id!==id)})
    }

    return (
        <div className="recipe-edit">
            <div className = "recipe-edit__remove-button-container">
                <button className="btn recipe-edit__remove-button"
                   onClick={()=>handleRecipeSelect(undefined)}
                >&times;</button>
            </div>
            <div className="recipe-edit__details-grid">
                <label htmlFor="name" className="recipe-edit__label">Name</label>
                <input type="text" 
                    value={recipe.name} maxLength="30"
                    onChange={e=>handleChange({name:e.target.value})}
                    name="name" id="name" className="recipe-edit__input" 
                />
                <label htmlFor="cookTIme" className="recipe-edit__label" >Cook Time</label>
                <input type="text" maxLength="10"
                    value={recipe.cookTime} 
                    onChange={e=>handleChange({cookTime:e.target.value})}
                    name="cookTime" id="cookTime" className="recipe-edit__input" 
                />
                <label htmlFor="servings" className="recipe-edit__label" >Servings</label>
                <input type="text" maxLength="15"
                    value={recipe.servings} 
                    onChange={e=>handleChange({servings:e.target.value})}
                    min="1" name="servings" id="servings" className="recipe-edit__input"
                />
                <label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
                <textarea name="instructions" 
                    onChange={e=>handleChange({instructions:e.target.value})}
                    value={recipe.instructions} id="instructions" className="recipe-edit__input"
                />
                <br/>
            </div>
                <label className="recipe-edit__label" >Ingredients</label>
            <div className="recipe-edit__ingredient-grid" >   
                {recipe.ingredients.map(ingredient=>(
                    <IngregientEdit
                        handleIngredientDelete={handleIngredientDelete}
                        handleIngredientChange={handleIngredientChange}
                        key={ingredient.id}
                        ingredient={ingredient}
                    />
                ))}
            </div>
            <div className = "recipe-edit__add-ingredient-container" >
                <button className="btn btn--primary"
                onClick={()=>handleIndgredientAdd()}
                >Add Ingredient</button>
            </div>
        </div>    
    )
}
