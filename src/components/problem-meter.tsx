import { useEffect, useState } from 'react';

type ProblemMeterProps = {
  level: number; // 0-100
};

const ProblemMeter = ({ level }: ProblemMeterProps) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  
  useEffect(() => {
    // Animate the meter level
    const timer = setTimeout(() => {
      if (currentLevel < level) {
        setCurrentLevel(prev => Math.min(prev + 2, level));
      }
    }, 20);
    
    return () => clearTimeout(timer);
  }, [currentLevel, level]);
  
  // Determine color based on level
  const getMeterColor = () => {
    if (currentLevel < 30) return 'bg-green-500';
    if (currentLevel < 60) return 'bg-yellow-500';
    if (currentLevel < 80) return 'bg-orange-500';
    return 'bg-red-600';
  };
  
  // Get level text description
  const getLevelText = () => {
    if (currentLevel < 30) return 'Mild Issues';
    if (currentLevel < 60) return 'Concerning';
    if (currentLevel < 80) return 'Major Problems';
    return 'Virtually Unplayable';
  };

  return (
    <div className="pixel-card bg-retro-darkGray p-4 mb-6">
      <h3 className="font-pixel text-white text-xl mb-3">Problem Level</h3>
      
      <div className="relative w-full h-8 bg-retro-charcoal border-4 border-black mb-2">
        <div 
          className={`h-full ${getMeterColor()} transition-all duration-100 ease-in-out`}
          style={{ width: `${currentLevel}%` }}
        />
        
        {/* Meter segments */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r-2 border-retro-charcoal h-full last:border-r-0"
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs font-pixel text-retro-purple">0%</div>
        <div className={`text-lg font-pixel ${getMeterColor().replace('bg-', 'text-')}`}>
          {getLevelText()}
        </div>
        <div className="text-xs font-pixel text-retro-purple">100%</div>
      </div>
    </div>
  );
};

export default ProblemMeter;