import { useEffect, useRef } from 'react'
import { xl6 } from '../assets/images'
import gsap from 'gsap';

const Loading = () => {
  const logoRef = useRef(null);
  const dotsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      x: 5,
      rotation: 5, 
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  useEffect(() => {
  let dotCount = 0;
  const interval = setInterval(() => {
    if (dotsRef.current) {
      dotCount = (dotCount + 1) % 4;
      dotsRef.current.textContent = ".".repeat(dotCount);
    }
  }, 500);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <img
        ref={logoRef}
        src={xl6}
        alt="logo"
        className="w-20 h-20"
      />
      <p className="text-sm md:text-lg">Loading
        <span ref={dotsRef} style={{ display: "inline-block", width: "1.5em" }}>
        </span>
      </p>
    </div>
  )
}

export default Loading