"use client";

import { useEffect, useState } from 'react';
import { 
  Bug, 
  Gamepad2, 
  BookOpen, 
  MonitorPlay, 
  Shapes, 
  VolumeX, 
  Cpu, 
  BadgeDollarSign 
} from 'lucide-react';

export type CategoryData = {
  name: string;
  percentage: number;
  icon: string;
};

type ProblemCategoryProps = {
  categories: CategoryData[];
};

// Map category names to icons
const categoryIcons = {
  "Bugs": Bug,
  "Gameplay": Gamepad2,
  "Story": BookOpen,
  "Graphics": MonitorPlay,
  "Design": Shapes,
  "Audio": VolumeX,
  "Performance": Cpu,
  "Value": BadgeDollarSign,
};

const ProblemCategory = ({ categories }: ProblemCategoryProps) => {
  const [animated, setAnimated] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    categories.forEach(category => {
      let current = 0;
      
      const timer = setInterval(() => {
        if (current < category.percentage) {
          current += 1;
          setAnimated(prev => ({ ...prev, [category.name]: current }));
        } else {
          clearInterval(timer);
        }
      }, 20);
      
      timers.push(timer);
    });
    
    return () => timers.forEach(timer => clearInterval(timer));
  }, [categories]);
  
  return (
    <div className="pixel-card bg-retro-darkGray p-4">
      <h3 className="font-pixel text-white text-xl mb-4">Problem Categories</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Bug;
          const currentWidth = animated[category.name] || 0;
          
          return (
            <div key={category.name} className="mb-4">
              <div className="flex items-center mb-2">
                <Icon size={18} className="text-retro-purple mr-2" />
                <span className="font-pixel text-sm text-white">{category.name}</span>
                <span className="ml-auto font-pixel-secondary text-retro-purple">
                  {currentWidth}%
                </span>
              </div>
              
              <div className="h-4 bg-retro-charcoal border-2 border-black relative">
                <div 
                  className="h-full bg-retro-purple transition-all duration-50 ease-out"
                  style={{ width: `${currentWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemCategory;