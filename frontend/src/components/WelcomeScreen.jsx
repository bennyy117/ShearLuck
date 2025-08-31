import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function WelcomeScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500);
    const timer2 = setTimeout(() => navigate('/display-result'), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen 
        bg-gradient-to-r from-[var(--tiktok-black)] via-[var(--tiktok-pink)] to-[var(--tiktok-cyan)] 
        transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Title */}
      <h1
        className="text-6xl md:text-7xl font-bold text-[var(--tiktok-white)] mb-8 tracking-tight fade-in-up"
        style={{ animationDelay: '0.2s', fontFamily: "'Poppins', sans-serif" }}
      >
        Welcome to{' '}
        <span className="text-[var(--tiktok-black)] waterfall-font text-7xl md:text-[8rem]">
          Sheares
        </span>
      </h1>

      {/* Slogan */}
      <p
        className="text-2xl md:text-3xl text-[var(--tiktok-cyan)] mb-20 font-medium fade-in-up"
        style={{ animationDelay: '0.4s', fontFamily: "'Poppins', sans-serif" }}
      >
        Discover spots with truthful reviews!
      </p>

      {/* Button */}
      <button
        onClick={() => navigate('/display-result')}
        className="group flex items-center gap-4 px-6 py-4 text-2xl bg-[var(--tiktok-cyan)] text-[var(--tiktok-black)] font-bold rounded-full shadow-lg 
                   transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[var(--tiktok-white)] hover:text-[var(--tiktok-cyan)] fade-in-up"
        style={{ animationDelay: '0.6s', fontFamily: "'Poppins', sans-serif" }}
      >
        Explore now
        <span className="w-10 h-10 rounded-full flex items-center justify-center 
                         bg-[var(--tiktok-black)] text-[var(--tiktok-white)]
                         transition-colors duration-300 ease-in-out group-hover:bg-[var(--tiktok-cyan)] group-hover:text-[var(--tiktok-white)]
                         transition-transform duration-300 ease-in-out group-hover:translate-x-1.5">
          <ArrowRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
}

export default WelcomeScreen;
