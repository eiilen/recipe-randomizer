import React, { useEffect, useRef, useState } from 'react'
import  { ost_1 }  from '../assets/audios'
import { useMute } from '../hooks/useMute'
import { hc7, hc8 } from '../assets/images'
import waterDripSfx from '../assets/sounds/water_drip_001.mp3'
import useSound from 'use-sound'

const Footer = () => {
  const audioRef = useRef(new Audio(ost_1));
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  const [water] = useSound(waterDripSfx, {volume: 0.2});
  const mute = useMute();
  
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    audio.loop = true;
    if(isPlayingMusic) {
      audio.play();
    }
    return () => {
      audio.pause();
    }
  }, [isPlayingMusic]);

  useEffect(() => {
    audioRef.current.muted = mute;
  }, [mute]);

  const handleHover = () => {
    if (!mute) {
      water();
    }
  }

  return (
    <div className="fixed bottom-5 right-5">
      {/* <i className={`fa-regular fa-${!isPlayingMusic ? 'circle-play' : 'circle-pause'} fa-xl hover:cursor-pointer hover:scale-110 active:scale-75`}
        onClick={() => setIsPlayingMusic(p => !p)}>
      </i> */}

      <img src={!isPlayingMusic ? hc7 : hc8} alt='hc' 
        onClick={() => setIsPlayingMusic(p => !p)}
        onMouseOver={handleHover}
        className='w-20 h-20 hover:cursor-pointer hover:scale-110 active:scale-75' />
    </div>
  )
}

export default Footer