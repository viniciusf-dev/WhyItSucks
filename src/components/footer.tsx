"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Info, HelpCircle, Send, Volume2, VolumeX } from 'lucide-react';

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const toggleEasterEgg = () => {
    setShowEasterEgg(!showEasterEgg);
    
    // Play 8-bit blip sound if sound is on
    if (soundOn) {
      const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-35.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  return (
    <footer className="mt-auto py-6 px-4 relative">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
        <div className="mb-4 md:mb-0 flex items-center">
          <button 
            onClick={toggleSound} 
            className="text-retro-purple hover:text-white transition-colors mr-6 flex items-center"
          >
            {soundOn ? (
              <>
                <Volume2 size={20} className="mr-2" />
                <span className="text-sm font-pixel">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX size={20} className="mr-2" />
                <span className="text-sm font-pixel">Sound OFF</span>
              </>
            )}
          </button>
        </div>
        
        <div className="flex space-x-6">
          <Link href="/about" className="text-retro-purple hover:text-white transition-colors flex items-center">
            <Info size={20} className="mr-2" />
            <span className="text-sm font-pixel">About</span>
          </Link>
          <Link href="/how-it-works" className="text-retro-purple hover:text-white transition-colors flex items-center">
            <HelpCircle size={20} className="mr-2" />
            <span className="text-sm font-pixel">How It Works</span>
          </Link>
          <Link href="/contact" className="text-retro-purple hover:text-white transition-colors flex items-center">
            <Send size={20} className="mr-2" />
            <span className="text-sm font-pixel">Contact</span>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div 
          className="inline-block cursor-pointer" 
          onClick={toggleEasterEgg}
        >
          <div className="w-8 h-8 mx-auto relative mb-2">
            {showEasterEgg ? (
              <div className="animate-float">
                <div className="w-8 h-8 bg-retro-red rounded-full relative pixel-art">
                  <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-1"></div>
                  <div className="absolute w-4 h-1 bg-white rounded-full bottom-2 left-2"></div>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-retro-purple rounded-md animate-pulse"></div>
            )}
          </div>
          <p className="text-xs text-retro-purple font-pixel">© 2023 WhyItSucks</p>
        </div>
      </div>
      
      <div className="scanline"></div>
    </footer>
  );
};

export default Footer;