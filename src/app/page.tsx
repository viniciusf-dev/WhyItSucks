import Header from '@/components/header';
import SearchBar from '@/components/search-bar';
import Footer from '@/components/footer';
import RetroContainer from '@/components/retro-container';

export default function Home() {
  return (
    <RetroContainer>
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <Header />
        
        <div className="w-full max-w-3xl mx-auto mt-8 mb-8 text-center">
          <div className="pixel-card p-6 bg-retro-darkPurple/40 backdrop-blur-sm mb-10">
            <p className="text-white font-pixel-secondary text-xl mb-4">
              Find out why players have negative experiences with games.
            </p>
            <p className="text-retro-purple font-pixel-secondary text-lg">
              Our AI analyzes thousands of negative reviews to identify common complaints, bugs, and issues.
            </p>
          </div>
          
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="pixel-card bg-retro-darkGray p-4">
            <h3 className="font-pixel text-white text-base mb-2">Identify Issues</h3>
            <p className="font-pixel-secondary text-retro-purple">
              Discover the most common problems players experience with any game.
            </p>
          </div>
          <div className="pixel-card bg-retro-darkGray p-4">
            <h3 className="font-pixel text-white text-base mb-2">Save Time & Money</h3>
            <p className="font-pixel-secondary text-retro-purple">
              Know what you're getting into before buying a disappointing game.
            </p>
          </div>
          <div className="pixel-card bg-retro-darkGray p-4">
            <h3 className="font-pixel text-white text-base mb-2">AI Analysis</h3>
            <p className="font-pixel-secondary text-retro-purple">
              Our algorithm categorizes and prioritizes the most relevant issues.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </RetroContainer>
  );
}