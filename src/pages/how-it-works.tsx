import Header from '@/components/header';
import Footer from '@/components/footer';
import { SearchIcon, Database, BrainCircuit, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="crt-effect">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-1 py-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-pixel text-2xl md:text-3xl text-retro-purple mb-6">How It Works</h2>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="pixel-card bg-retro-darkGray p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-retro-purple flex items-center justify-center rounded-md mr-4">
                      <SearchIcon size={24} className="text-white" />
                    </div>
                    <h3 className="font-pixel text-xl text-white">Step 1: Search</h3>
                  </div>
                  <p className="font-pixel-secondary text-lg text-retro-purple">
                    Enter the name of any video game you're interested in. Our system will check if we already have data for it, or initiate a new analysis.
                  </p>
                </div>
                
                <div className="pixel-card bg-retro-darkGray p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-retro-purple flex items-center justify-center rounded-md mr-4">
                      <Database size={24} className="text-white" />
                    </div>
                    <h3 className="font-pixel text-xl text-white">Step 2: Collect</h3>
                  </div>
                  <p className="font-pixel-secondary text-lg text-retro-purple">
                    Our systems scrape thousands of negative reviews from Steam and other platforms, focusing specifically on complaints and problems.
                  </p>
                </div>
                
                <div className="pixel-card bg-retro-darkGray p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-retro-purple flex items-center justify-center rounded-md mr-4">
                      <BrainCircuit size={24} className="text-white" />
                    </div>
                    <h3 className="font-pixel text-xl text-white">Step 3: Analyze</h3>
                  </div>
                  <p className="font-pixel-secondary text-lg text-retro-purple">
                    Our AI processes all reviews, identifying common themes, categorizing problems, and determining the severity of each issue based on frequency and impact.
                  </p>
                </div>
                
                <div className="pixel-card bg-retro-darkGray p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-retro-purple flex items-center justify-center rounded-md mr-4">
                      <BarChart3 size={24} className="text-white" />
                    </div>
                    <h3 className="font-pixel text-xl text-white">Step 4: Results</h3>
                  </div>
                  <p className="font-pixel-secondary text-lg text-retro-purple">
                    We present a comprehensive breakdown of the game's issues, including a severity score, categorized problems, and specific top complaints mentioned by players.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pixel-card bg-retro-red p-6">
                <h3 className="font-pixel text-xl text-white mb-4">Important Note</h3>
                <p className="font-pixel-secondary text-lg text-white">
                  WhyItSucks only focuses on negative reviews and problems. A game with a high "Problem Level" might still be enjoyable depending on your tolerance for certain issues. Always consider both positive and negative aspects when making your purchase decision!
                </p>
              </div>
            </div>
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

export default HowItWorks;