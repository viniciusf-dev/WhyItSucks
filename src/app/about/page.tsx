import Header from '@/components/header';
import Footer from '@/components/footer';
import RetroContainer from '@/components/retro-container';

export default function About() {
  return (
    <RetroContainer>
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-pixel text-2xl md:text-3xl text-retro-purple mb-6">About WhyItSucks</h2>
          
          <div className="pixel-card bg-retro-darkGray p-6 mb-8">
            <p className="font-pixel-secondary text-white text-lg mb-4">
              WhyItSucks is an AI-powered platform that analyzes negative video game reviews to provide consumers with detailed insights about potential issues before making a purchase.
            </p>
            
            <p className="font-pixel-secondary text-white text-lg mb-4">
              Our mission is to help gamers make informed decisions by highlighting common complaints, bugs, and problems that might affect their gaming experience.
            </p>
            
            <p className="font-pixel-secondary text-white text-lg">
              We analyze thousands of negative reviews from Steam and other platforms, using advanced AI to categorize issues and identify patterns that might indicate serious problems.
            </p>
          </div>
          
          <h3 className="font-pixel text-xl text-retro-red mb-4">Why We Built This</h3>
          
          <div className="pixel-card bg-retro-darkGray p-6">
            <p className="font-pixel-secondary text-white text-lg mb-4">
              Too often, gamers spend money on hyped titles only to find them plagued with bugs, performance issues, or gameplay problems that weren't apparent from professional reviews or marketing materials.
            </p>
            
            <p className="font-pixel-secondary text-white text-lg mb-4">
              WhyItSucks gives you the other side of the story - what real players are complaining about - so you can decide if those issues would affect your enjoyment of the game.
            </p>
            
            <p className="font-pixel-secondary text-retro-purple text-lg">
              We're not here to tell you not to buy a game - we're here to make sure you know what you're getting into!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </RetroContainer>
  );
}