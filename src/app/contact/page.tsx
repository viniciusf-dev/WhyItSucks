"use client";

import { useState } from 'react';
import { toast } from "sonner";
import { Send } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import RetroContainer from '@/components/retro-container';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast("Please fill out all fields", {
        description: "All fields are required to send a message",
        position: "top-center",
        className: "pixel-card font-pixel-secondary bg-retro-red text-white",
      });
      return;
    }
    
    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setName('');
      setEmail('');
      setMessage('');
      
      toast("Message Sent!", {
        description: "We'll get back to you as soon as possible",
        position: "top-center",
        className: "pixel-card font-pixel-secondary bg-retro-purple text-white",
      });
    }, 1500);
  };
  
  return (
    <RetroContainer>
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-pixel text-2xl md:text-3xl text-retro-purple mb-6">Contact Us</h2>
          
          <div className="pixel-card bg-retro-darkGray p-6 mb-8">
            <p className="font-pixel-secondary text-white text-lg mb-4">
              Have questions, feedback, or want to report an issue with our analysis? Send us a message below!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-pixel text-sm text-retro-purple mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pixel-input w-full"
                  disabled={sending}
                />
              </div>
              
              <div>
                <label className="block font-pixel text-sm text-retro-purple mb-2">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pixel-input w-full"
                  disabled={sending}
                />
              </div>
              
              <div>
                <label className="block font-pixel text-sm text-retro-purple mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="pixel-input w-full h-32"
                  disabled={sending}
                />
              </div>
              
              <button 
                type="submit"
                className="pixel-button flex items-center justify-center"
                disabled={sending}
              >
                {sending ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="pixel-card bg-retro-darkGray p-4">
              <h3 className="font-pixel text-lg text-white mb-2">Join Our Community</h3>
              <p className="font-pixel-secondary text-retro-purple">
                Follow us on social media for updates, new features, and more game analysis insights.
              </p>
            </div>
            
            <div className="pixel-card bg-retro-darkGray p-4">
              <h3 className="font-pixel text-lg text-white mb-2">Feedback Welcome</h3>
              <p className="font-pixel-secondary text-retro-purple">
                Let us know which features you'd like to see added to WhyItSucks next!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </RetroContainer>
  );
}