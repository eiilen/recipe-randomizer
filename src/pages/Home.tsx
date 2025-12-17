import { useEffect, useRef } from 'react'
import { xl4 } from '../assets/images'
import { useNavigate } from 'react-router-dom';
import { loadingService } from '../hooks/useLoading'
import gsap from 'gsap';
import { recipes } from '../constants';

const Home = () => {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const selectedRecipe = recipes[randomIndex];
  
  localStorage.setItem('currentRecipe', JSON.stringify(selectedRecipe));
  
  loadingService.show();
  navigate('/recipe');
  setTimeout(() => loadingService.hide(), 1000);
};

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const text = "don't know what to cook?";
    const cursor = "|";
    el.textContent = "";

    const tween = gsap.to({}, {
      duration: text.length * 0.12,
      repeat: 0,
      onUpdate() {
        const progress = Math.floor(this.progress() * text.length);
        el.textContent = text.slice(0, progress) + cursor;
      },
      onComplete() {
        el.textContent = text;
      }
    });

    return () => {
      tween.kill();
    }
  }, []);

  return (
    <>
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center space-y-4'>
        <h1
          ref={heroRef}
          className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight"
        />
        <img src={xl4} alt='xie lian' className='w-50 h-50' />
        <button className="py-1.5 px-3 text-sm md:text-base md:px-5 md:py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 hover:scale-105 transition"
          onClick={handleClick}>
          let's find out
        </button>
      </div>
    </div>
    </>
  )
}

export default Home