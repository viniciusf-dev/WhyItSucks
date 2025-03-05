"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/loading-spinner';
import GameResults from '@/components/game-results';
import RetroContainer from '@/components/retro-container';

export default function Results() {
  const [loading, setLoading] = useState(true);
  const [gameName, setGameName] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const game = searchParams.get('game');
    
    if (!game) {
      router.push('/');
      return;
    }
    
    setGameName(game);
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [searchParams, router]);
  
  return (
    <RetroContainer>
      <Header />
      
      <main className="flex-1 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <GameResults gameName={gameName} />
        )}
      </main>
      
      <Footer />
    </RetroContainer>
  );
}