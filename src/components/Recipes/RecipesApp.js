import React, { useState, useEffect } from 'react'
import Footer from '../../ui-kit/Footer/Footer'
import HeaderSignedIn from '../../ui-kit/Header/HeaderSignedIn'
import Recipelist from './Recipelist'
import { v4 as uuidv4 } from 'uuid'
import RecipeEdit from './RecipeEdit'
import Searchbox from './Searchbox'

export const recipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingwithReact.recipes'

const RecipesApp = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function setSearchResults(newRecipes) {
    setRecipes(newRecipes)
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 0,
      cookTime: '0:00',
      instructions: '',
      displayed: 'block',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: ''
        }]
    }
    handleRecipeSelect(newRecipe.id)
    setRecipes([...recipes, newRecipe])
    console.log(sampleRecipes)
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(item => item.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
    //setRecipes(recipes.splice(recipes.indexOf(recipes.find(recipe=>recipe.id===id))),1)
  }

  return (
    <>
      <HeaderSignedIn />
      <Searchbox recipes={recipes}
        setSearchResults={setSearchResults} />
      <recipeContext.Provider value={recipeContextValue}>
        <Recipelist recipes={recipes} />
        {/*selectedRecipe ? <RecipeEdit recipe={selectedRecipe}/>:null*/}
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </recipeContext.Provider>
      <Footer />
    </>
  )
}

const sampleRecipes = [
  // {
  //   id: 1,
  //   name: 'Plain Chiken',
  //   servings: 3,
  //   cookTime: '1:00',
  //   displayed: 'block',
  //   instructions: '1.Add sugar to chiken\n2.Bake chiken\n3.Eat chiken',
  //   ingredients: [
  //     {
  //       id: 2,
  //       name: 'Meat of chiken',
  //       amount: '2 Pounds'
  //     },
  //     {
  //       id: 3,
  //       name: 'Salt',
  //       amount: 'Tbs'
  //     }
  //   ]
  // }, {
  //   id: 4,
  //   name: 'Plain Pork',
  //   servings: 4,
  //   cookTime: '2:45',
  //   displayed: 'block',
  //   instructions: '1.Put salt on pork\n2.Put pork in oven\n4.Eat pork',
  //   ingredients: [
  //     {
  //       id: 5,
  //       name: 'Pork',
  //       amount: '1 spoon'
  //     },
  //     {
  //       id: 6,
  //       name: 'Paprica',
  //       amount: '2 tbs'
  //     }
  //   ]
  // }
]

export default RecipesApp;
