"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";

function Hexagon() {
  
  return (
    <div className="relative aspect-square w-80 md:w-96 lg:w-120">
      {/* Animated hexagon lines and image in one SVG */}
      <svg
        className="size-full"
        viewBox="-60 -60 120 120"
      >
        <defs>
          <clipPath id="hexagon-clip">
            <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" />
          </clipPath>
        </defs>

        {/* Hexagon-shaped image background */}
        <image
          href="/homeImg.jpg"
          x="-60"
          y="-60"
          width="120"
          height="120"
          clipPath="url(#hexagon-clip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Left side of hexagon */}
        <polyline 
          points="0,-50 -43,-25 -43,25 0,50" 
          fill="none"
          stroke="#012073"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="150"
          strokeDashoffset="150"
          className={ 'animate-draw-hexagon' }
        />

        {/* Right side of hexagon */}
        <polyline 
          points="0,-50 43,-25 43,25 0,50" 
          fill="none"
          stroke="#012073"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="150"
          strokeDashoffset="150"
          className={ 'animate-draw-hexagon' }
        />
      </svg>
      <svg 
        className="absolute left-1/2 top-[90%] h-[100vh]" 
        style={{ transform: 'translateX(-50%)' }}
        viewBox="0 0 3 100"
      >
        {/* Line from bottom of hexagon to bottom of screen */}
        <line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2="100"
          stroke="#012073"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="3000"
          strokeDashoffset="3000"
          className={ 'animate-draw-line' }
        />
      </svg>
    </div>
  );
}

export default function HomeScreen() {
  const [hasMounted, setHasMounted] = useState(false);
  const [shadowTime, setShadowTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useMousePosition(); // Not used for shadow, but could be used for future effects

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setShadowTime(Date.now());
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const element = document.querySelector('[data-screen="home"]');
    if (element) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen snap-start pt-0 pb-6 sm:pb-10 md:pb-16 lg:pb-20" data-screen="home">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hexagon Section */}
        <Hexagon />
        {/* Content Section */}
        <div className="w-full max-w-md px-2 sm:px-4 relative z-10 border-2 border-[#012073] rounded-lg p-4 sm:p-6 bg-white">
          <h1
            className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#012073] mb-4 sm:mb-6 md:mb-8 text-center leading-tight"
          >
            Rafraîchissez vos pratiques managériales
          </h1>              
          <div
            className="text-xs md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6"
          >
            <p>
              SPIRE accompagne les organisations dans la transformation de leurs pratiques managériales en valorisant l'autonomie, la responsabilité et soutien mutuel à tous les niveaux. Par la subsidiarité mise en acte, nous faisons du management un levier de performance, d’engagement et de bien-être durable pour l'ensemble des collaborateurs. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 