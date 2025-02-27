"use client";

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import ProblemMeter from './problem-meter';
import ProblemCategory, { CategoryData } from './problem-category';
import TopComplaints from './top-complaints';

type GameResultsProps = {
  gameName: string;
};

// Mock data - in a real app, this would come from an API
const getMockData = (gameName: string) => {
  return {
    problemLevel: 78,
    summary: `${gameName} suffers from numerous technical issues that have frustrated players since its release. The game is plagued by frequent crashes, particularly during intense combat sequences. Loading times are excessively long, even on high-end hardware. Many players report progression-blocking bugs that prevent completion of key story missions. The UI is confusing and unintuitive, with important information often hidden behind multiple menu layers. Performance optimization is poor, with frame rate drops common even on recommended hardware.`,
    categories: [
      { name: "Bugs", percentage: 85, icon: "bug" },
      { name: "Performance", percentage: 72, icon: "cpu" },
      { name: "Gameplay", percentage: 64, icon: "gamepad" },
      { name: "Value", percentage: 62, icon: "dollar" },
      { name: "Design", percentage: 45, icon: "shapes" },
      { name: "Story", percentage: 32, icon: "book" },
    ],
    complaints: [
      { id: 1, text: "Game crashes during boss fights", count: 342 },
      { id: 2, text: "Impossible to progress past Chapter 3 due to bug", count: 287 },
      { id: 3, text: "Extreme frame rate drops in populated areas", count: 253 },
      { id: 4, text: "Save files randomly corrupting", count: 189 },
      { id: 5, text: "Controls are unresponsive during critical moments", count: 176 },
    ]
  };
};

const GameResults = ({ gameName }: GameResultsProps) => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [animatedText, setAnimatedText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResults(getMockData(gameName));
      setLoading(false);
    }, 1000);
  }, [gameName]);
  
  useEffect(() => {
    if (!results || textComplete) return;
    
    let index = 0;
    const text = results.summary;
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setAnimatedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTextComplete(true);
      }
    }, 10); // Typing speed
    
    return () => clearInterval(typingInterval);
  }, [results, textComplete]);
  
  if (!results) {
    return null;
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 mt-6">
          <h2 className="font-pixel text-2xl md:text-3xl text-retro-purple mb-2">{gameName}</h2>
          
          <div className="w-full h-1 bg-retro-purple my-4"></div>
        </div>
        
        <div className="lg:col-span-3">
          <ProblemMeter level={results.problemLevel} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="pixel-card bg-retro-darkGray p-4 mb-6">
            <h3 className="font-pixel text-white text-xl mb-3 flex items-center">
              <Quote size={20} className="text-retro-purple mr-2" />
              Problem Summary
            </h3>
            <p className="font-pixel-secondary text-lg text-white leading-relaxed">
              {animatedText}
              {!textComplete && (
                <span className="animate-blink">_</span>
              )}
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <ProblemCategory categories={results.categories} />
        </div>
        
        <div className="lg:col-span-1">
          <TopComplaints complaints={results.complaints} />
        </div>
      </div>
    </div>
  );
};

export default GameResults;