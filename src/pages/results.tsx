import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/loading-spinner';
import GameResults from '@/components/game-results';

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [gameName, setGameName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const game = params.get('game');
    
    if (!game) {
      navigate('/');
      return;
    }
    
    setGameName(game);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [location, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="crt-effect">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-1 py-6">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <GameResults gameName={gameName} />
            )}
          </main>
          
          <Footer />
        </div>
        
        <div className="scanline"></div>
        
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(155,135,245,0.15)_0%,rgba(30,30,50,0)_70%)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Results;