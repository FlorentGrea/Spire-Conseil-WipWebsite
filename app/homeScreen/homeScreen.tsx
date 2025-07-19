"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";

const Hexagon = forwardRef<{ getLineRightPosition: () => number | null }>((props, ref) => {
  const lineRef = useRef<SVGSVGElement>(null);
  const [lineRightPosition, setLineRightPosition] = useState<number | null>(null);

  // Method to get current line right position (can be called from parent component)
  const getLineRightPosition = () => {
    if (lineRef.current) {
      const rect = lineRef.current.getBoundingClientRect();
      return rect.right;
    }
    return null;
  };

  // Expose the method to parent component
  useImperativeHandle(ref, () => ({
    getLineRightPosition
  }));

  useEffect(() => {
    const updateLinePosition = () => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        setLineRightPosition(rect.right);
      }
    };

    // Update position on mount and resize
    updateLinePosition();
    window.addEventListener('resize', updateLinePosition);
    
    return () => window.removeEventListener('resize', updateLinePosition);
  }, []);

  return (
    <div className="relative aspect-square w-48 md:w-64 lg:w-96" style={{ minWidth: '0', minHeight: '0' }}>
      {/* Animated hexagon lines and image in one SVG */}
      <svg
        className="size-full"
        viewBox="-60 -60 120 120"
      >
        <defs>
          <clipPath id="hexagon-clip">
            <polygon points="0,-55 47,-27.5 47,27.5 0,55 -47,27.5 -47,-27.5" />
          </clipPath>
          <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#012073" />
          </linearGradient>
        </defs>

        {/* Hexagon-shaped image background */}
        <image
          href="/homeImg.png"
          x="-40"
          y="-40"
          width="80"
          height="80"
          clipPath="url(#hexagon-clip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Left side of hexagon with gradient */}
        <polyline 
          points="0,-55 -47,-27.5 -47,27.5 0,55" 
          fill="none"
          stroke="url(#hexagonGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className={ 'animate-draw-hexagon' }
        />

        {/* Right side of hexagon with gradient */}
        <polyline 
          points="0,-55 47,-27.5 47,27.5 0,55" 
          fill="none"
          stroke="url(#hexagonGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className={ 'animate-draw-hexagon' }
        />
      </svg>
      <svg 
        ref={lineRef}
        className="absolute left-1/2 top-[95%] h-[220vh] w-3 md:w-5" 
        style={{ transform: 'translateX(-50%)' }}
        viewBox="0 30 3 270"
        vectorEffect="non-scaling-stroke"
      >
        {/* Line from bottom of hexagon to bottom of screen */}
        <line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2="100"
          stroke="#012073"
          strokeWidth="100"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          className={ 'animate-draw-line' }
        />
      </svg>
    </div>
  );
});

const HomeScreen = forwardRef<{ getLineRightPosition: () => number | null }, { onLinePositionChange?: () => void }>(({ onLinePositionChange }, ref) => {
  const hexagonRef = useRef<{ getLineRightPosition: () => number | null }>(null);

  // Function to get line right position from outside
  const getLineRightPosition = () => {
    if (hexagonRef.current) {
      return hexagonRef.current.getLineRightPosition();
    }
    return null;
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    getLineRightPosition
  }));

  // Call the callback when position changes
  useEffect(() => {
    if (onLinePositionChange) {
      const timer = setTimeout(() => {
        onLinePositionChange();
      }, 100); // Small delay to ensure component is mounted
      
      window.addEventListener('resize', onLinePositionChange);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', onLinePositionChange);
      };
    }
  }, [onLinePositionChange]);

  return (
    <div className="flex items-center justify-center w-full h-screen snap-start" data-screen="home">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-12 sm:max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hexagon Section */}
        <Hexagon ref={hexagonRef} />
        {/* Content Section */}
        <div className="w-full max-w-sm sm:max-w-none z-10 border-2 border-[#012073] rounded-lg p-4 bg-white flex-grow">
          <h1
            className="text-lg lg:text-4xl font-bold text-[#012073] mb-4 text-center lg:text-left leading-tight"
          >
            Rafraîchissez vos pratiques managériales
          </h1>              
          <div
            className="text-xs lg:text-xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <p>
              SPIRE accompagne les organisations dans la transformation de leurs pratiques managériales en valorisant l'autonomie, la responsabilité et soutien mutuel à tous les niveaux. Par la subsidiarité mise en acte, nous faisons du management un levier de performance, d’engagement et de bien-être durable pour l'ensemble des collaborateurs. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomeScreen;