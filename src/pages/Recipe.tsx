import { useEffect, useState } from 'react'
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
      setTimeout(() => loadingService.hide(), 1000)
    }; 
    
  const getRandomRecipe = () => {
  loadingService.show();

  if (!recipes.length) return;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * recipes.length);
  } while (recipe && recipes[randomIndex].id === recipe.id);
  const newRecipe = { ...recipes[randomIndex] };
  const img = new Image();
  img.src = newRecipe.image;
  img.onload = () => {
    setRecipe(newRecipe);
    localStorage.setItem('currentRecipe', JSON.stringify(newRecipe));
    setTimeout(() => loadingService.hide(), 1000);
  };
};

  return (
    <div className='min-h-screen contain-wrapper flex flex-col justify-center'
      style={{["--viewport-padding" as any]: "clamp(1.25rem, 4vw, 5rem)",}}>
      { recipe && (
        <>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <img src={recipe.image} alt={recipe.name} className='w-50 h-50' />
          <h2 className='text-xl md:text-2xl font-medium'>{recipe.name}</h2>
        </div>

        <div className='flex flex-col space-y-4'>
          <p className='text-sm md:text-lg mt-2'>{recipe.description}</p>
          <span className='text-sm md:text-lg font-bold item-start'>ingredients:</span>
          <ul className='list-disc pl-5'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='text-sm md:text-lg'>{ingredient}</li>
            ))}
          </ul>
          <span className='text-sm md:text-lg font-bold item-start'>🍅 instructions:</span>
          <div className='list-disc pl-5'>
            {recipe.instructions.map((instruction, index) => (
              <p key={index} className='text-sm md:text-lg'>{index + 1}. {instruction}</p>
            ))}
          </div>
        </div>
      </>
      )}

      <div className='flex items-center gap-2 justify-center mt-8'>
        <button className="py-1.5 px-3 text-sm md:text-base md:px-5 md:py-2 bg-white text-red-800 rounded border border-red-800 dark:border-0 hover:bg-red-800 hover:text-white transition"
          onClick={backHome}>
          home
        </button>
        <button className="py-1.5 px-3 text-sm md:text-base md:px-5 md:py-2 bg-red-800 text-white rounded border border-red-800 dark:border-0 hover:bg-white hover:text-red-800 transition"
          onClick={getRandomRecipe}>
          try again
        </button>
      </div>
    </div>
  )
}

export default Recipe