import React, { useEffect, useState } from 'react'
import { recipes } from '../constants'
import { loadingService } from '../hooks/useLoading'
import { useNavigate } from 'react-router-dom'

const Recipe = () => {
  const [recipe, setRecipe] = useState<typeof recipes[0] | null>(() => {
    const saved = localStorage.getItem('currentRecipe');
    return saved ? JSON.parse(saved) : recipes[0];
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) localStorage.setItem('currentRecipe', JSON.stringify(recipe));
  }, [recipe]);

  const backHome = () => {
      loadingService.show()
      navigate('/');
      setTimeout(() => {
        loadingService.hide()
      }, 1000)
    }; 
    
  const getRandomRecipe = () => {
    loadingService.show()
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setTimeout(() => {
      loadingService.hide()
    }, 1000)
    setRecipe(recipes[randomIndex]);
  };
  return (
    <div className='min-h-screen contain-wrapper flex flex-col items-center justify-center'>
      { recipe && (
      <div className='flex flex-col items-center justify-center space-y-4'>
        <img src={recipe.image} alt={recipe.name} className='w-50 h-50' />
        <h2 className='text-2xl font-medium'>{recipe.name}</h2>
        <p className='text-lg'>{recipe.description}</p>
        <span className='font-bold'>ingredients:</span>
        
          <ul className='list-disc pl-5'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='text-lg'>{ingredient}</li>
            ))}
          </ul>
      </div>
      )}

      <div className='flex items-center gap-2 justify-center mt-8'>
        <button className="px-6 py-2 bg-white text-red-800 rounded border border-red-800 dark:border-0 hover:bg-red-800 hover:text-white transition"
          onClick={backHome}>
          home
        </button>
        <button className="px-6 py-2 bg-red-800 text-white rounded border border-red-800 dark:border-0 hover:bg-white hover:text-red-800 transition"
          onClick={getRandomRecipe}>
          try again
        </button>
      </div>
    </div>
  )
}

export default Recipe