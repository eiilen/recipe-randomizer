import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import boopSfx from '../assets/sounds/boop.mp3';
import chimeSfx from '../assets/sounds/chime2.mp3';
import twinkleSfx from '../assets/sounds/twinkle.mp3';
import { toggleMute, useMute } from '../hooks/useMute';

const Navbar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const mute = useMute();
  
  const [play] = useSound(boopSfx, {volume: 0.4});
  const [chime] = useSound(chimeSfx, {volume: 0.4});
  const [twinkle] = useSound(twinkleSfx, {volume: 0.2});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (!mute) {
      play();
    }
    setTimeout(() => setDarkMode(!darkMode), 300);
    // setDarkMode(!darkMode);
  }
  const handleToggleMute = () => {
    if (mute) {
      chime();
    }
    toggleMute();
  }

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  const handleHover = () => {
    if (!mute) {
      twinkle();
    }
  }

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}
      transition-colors duration-300`}>
      <div className="inner">
        <a onClick={handleClick} className="logo hover:cursor-pointer">
          dianxia's recipe
        </a>

        {/* <a className="contact-btn group">
          <div className="inner">
            <span>meow</span>
          </div>
        </a> */}
        <div>
          <i onClick={toggleDarkMode} className={`fa-regular fa-${darkMode ? "sun" : "moon"} fa-xl hover:cursor-pointer duration-200 hover:scale-110 hover:-rotate-20 rotate-0 active:scale-75`}></i>
          <i onClick={handleToggleMute} className={`fa-solid fa-${mute ? "volume-xmark" : "volume-high"} fa-lg ml-4 hover:cursor-pointer duration-200 hover:scale-110 active:scale-75`}></i>
        </div>
      </div>
    </header>
  )
}

export default Navbar