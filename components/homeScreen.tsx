"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const Hexagon = forwardRef<{ getLineRightPosition: () => number | null }>((props, ref) => {
  // Method to get current line right position (can be called from parent component)
  const getLineRightPosition = () => {
    return null; // No line anymore
  };

  // Expose the method to parent component
  useImperativeHandle(ref, () => ({
    getLineRightPosition
  }));

  return (
    <div className="relative aspect-square w-48 md:w-64 lg:w-96" style={{ minWidth: '0', minHeight: '0' }}>
      {/* Animated hexagon lines and image in one SVG */}
      <svg
        className="size-full"
        viewBox="-60 -60 120 120"
        style={{
          filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))'
        }}
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
          href="/logoOnlyName.png"
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
    <div className="screen-container" data-screen="home">
      <div className="screen-content flex-col sm:flex-row">
        {/* Hexagon Section */}
        <Hexagon ref={hexagonRef} />
        {/* Content Section */}
        <div className="w-full max-w-sm sm:max-w-none flex flex-col flex-grow">
          {/* Title on top of the box */}
          <div className="title-container title-container-v3">
            <h1 className="title-text">
              Rafraîchissez vos pratiques managériales
            </h1>
          </div>
          
          <div className="content-box content-box-v2 z-10 flex-grow">

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
    </div>
  );
});

export default HomeScreen;