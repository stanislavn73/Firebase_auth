import React from 'react'

export default function Searchbox({recipes,setSearchResults}) { 
    
    let defaultProperty=document.getElementById('select')
    if(!defaultProperty){defaultProperty='all'}
    else{defaultProperty=defaultProperty.value}
   
   // console.log(firstRenderProperty)
    function handleSearchData(value,property){
        //console.log(value,property)
        let newRecipes = [...recipes].map(recipe=>{
            if (property==='all'){
                recipe.displayed = searchInAllProperty(recipe,value)
            }else{
                if (property==='ingredients'){
                    recipe.displayed = findMatchesInIngredients(recipe.ingredients,value)
                    // console.log('result of search only in ingredients',item.displayed)
                }else{

                    let propertyValue= String(recipe[property])
                    if (propertyValue.includes(value)){
                       // console.log('rest yes')
                       recipe.displayed='block'
                    }
                    else{
                        //console.log('rest no')
                        recipe.displayed='none'
                    }
                }  
            }
            return recipe
        })
    setSearchResults(newRecipes)
    }

    function searchInAllProperty(recipe,subStr){
        let result = 'none'
        let arr = ['name','servings','cookTime','instructions','ingredients']
        arr.forEach(property=>{
       // console.log('current property:',arr[i])
        if(property==='ingredients'&&result==='none') {
            //можно убрать вторую проверку, но тогда нужно прерывать цикл
            //чтобы значение result не перетиралос на 'none'.Цикл должен выполнятся
            //только когда result='none'
            result = findMatchesInIngredients(recipe.ingredients,subStr)
        //    console.log('result of search All in ingredients',recipe.displayed)
        }
        else{
            // console.log(recipe[arr[i]])
            let propertyValue = String(recipe[property])
            if (propertyValue.includes(subStr)){
                // console.log('all not ingredients yes',property)
                result='block'
                //break
            }
        }
    })
    return result
}

function findMatchesInIngredients(ingredients,subStr){
    let result='none'

    ingredients.forEach(ingredient=>{
        if(ingredient.name.includes(subStr)||
            ingredient.amount.includes(subStr)){
                result = 'block'
                // console.log('if block:',result)
        }
    })
    // console.log('final result:',result)
    return result
}

    return (
        <>
            <div className='search_head'>
                <div className="search_box" >
                    <div className="image_container"></div>
                    <input type="text"
                    onChange={(e)=>handleSearchData(e.target.value,String(defaultProperty))}
                    placeholder="Type to search recipe" className="search_input">
                    </input> 
                </div>
                <div className="selected_property" >
                    <select name="select1" id="select"
                        onChange={(e)=>defaultProperty=e.target.value}
                    >
                        <option value="all">All</option>
                        <option value='name'>Name</option>
                        <option value='servings' >Servings</option>
                        <option value="cookTime" >Cook Time</option>
                        <option value="instructions" >Instructions</option>
                        <option value="ingredients" >Ingredients</option>
                    </select>
                </div>
            </div>
        </>
    )
}
