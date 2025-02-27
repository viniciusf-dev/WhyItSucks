import { useEffect, useState } from 'react';

const sprites = [
  // Simplified ASCII-like pixel art frames for animation
  [
    "  o  ",
    " /|\\ ",
    " / \\ "
  ],
  [
    "  o  ",
    " /|\\ ",
    "/ | \\"
  ],
  [
    "  o  ",
    " -|- ",
    " / \\ "
  ],
  [
    "  o  ",
    " -|- ",
    "/ | \\"
  ]
];

const LoadingSpinner = () => {
  const [frame, setFrame] = useState(0);
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const spriteInterval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % sprites.length);
    }, 250);

    const dotsInterval = setInterval(() => {
      setDots((prevDots) => prevDots.length >= 3 ? '.' : prevDots + '.');
    }, 500);

    return () => {
      clearInterval(spriteInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="pixel-card bg-retro-charcoal p-6 flex flex-col items-center">
        <pre className="font-pixel-secondary text-retro-purple text-2xl whitespace-pre">
          {sprites[frame].map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
        <div className="mt-4 font-pixel text-sm text-white">
          Analyzing{dots}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;