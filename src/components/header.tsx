"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";

const Header = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Random glitch effect
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <header className="flex flex-col justify-center items-center py-8 w-full">
      <Link href="/" className="inline-block">
        <div className="relative">
          <h1 className={`text-3xl md:text-5xl font-pixel text-white mb-2 ${isGlitching ? 'animate-glitch' : ''}`}>
            <span className="text-retro-red">Why</span>
            <span className="text-retro-purple">It</span>
            <span className="text-retro-red">Sucks</span>
          </h1>
          {isGlitching && (
            <>
              <span className="absolute inset-0 text-3xl md:text-5xl font-pixel text-retro-purple opacity-80 left-[2px] top-[2px]">
                <span className="text-retro-red">Why</span>
                <span className="text-retro-purple">It</span>
                <span className="text-retro-red">Sucks</span>
              </span>
              <span className="absolute inset-0 text-3xl md:text-5xl font-pixel text-retro-pink opacity-50 -left-[2px] -top-[2px]">
                <span className="text-retro-red">Why</span>
                <span className="text-retro-purple">It</span>
                <span className="text-retro-red">Sucks</span>
              </span>
            </>
          )}
        </div>
      </Link>
      <p className="text-retro-purple font-pixel-secondary text-xl md:text-2xl mt-2">The AI-Powered Negative Game Review Analyzer</p>
    </header>
  );
};

export default Header;