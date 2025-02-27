"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Info, HelpCircle, Send, Volume2, VolumeX } from "lucide-react";

export default function Footer() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/nier-track.mp3");
    audioRef.current.volume = 0.8;
    // Removendo o return de cleanup aqui.
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (showEasterEgg && soundOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [showEasterEgg, soundOn]);

  function toggleEasterEgg() {
    setShowEasterEgg((prev) => !prev);
  }

  function toggleSound() {
    setSoundOn((prev) => !prev);
  }

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
          <Link
            href="/about"
            className="text-retro-purple hover:text-white transition-colors flex items-center"
          >
            <Info size={20} className="mr-2" />
            <span className="text-sm font-pixel">About</span>
          </Link>
          <Link
            href="/how-it-works"
            className="text-retro-purple hover:text-white transition-colors flex items-center"
          >
            <HelpCircle size={20} className="mr-2" />
            <span className="text-sm font-pixel">How It Works</span>
          </Link>
          <Link
            href="/contact"
            className="text-retro-purple hover:text-white transition-colors flex items-center"
          >
            <Send size={20} className="mr-2" />
            <span className="text-sm font-pixel">Contact</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="inline-block cursor-pointer" onClick={toggleEasterEgg}>
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
          <p className="text-xs text-retro-purple font-pixel">© 2025 WhyItSucks</p>
        </div>
      </div>
      <div className="scanline"></div>
    </footer>
  );
}
