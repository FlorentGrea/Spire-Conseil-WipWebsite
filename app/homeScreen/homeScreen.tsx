"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";

function Hexagon() {
  
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
          points="0,-55 -47,-27.5 -47,27.5 0,55" 
          fill="none"
          stroke="#012073"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className={ 'animate-draw-hexagon' }
        />

        {/* Right side of hexagon */}
        <polyline 
          points="0,-55 47,-27.5 47,27.5 0,55" 
          fill="none"
          stroke="#012073"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className={ 'animate-draw-hexagon' }
        />
      </svg>
      <svg 
        className="absolute left-1/2 top-[95%] h-[100vh] w-5" 
        style={{ transform: 'translateX(-50%)' }}
        viewBox="0 0 3 100"
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
          strokeDasharray="3000"
          strokeDashoffset="3000"
          className={ 'animate-draw-line' }
        />
      </svg>
    </div>
  );
}

export default function HomeScreen() {

  return (
    <div className="flex items-center justify-center w-full h-screen snap-start pt-[56px]" data-screen="home">
      <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hexagon Section */}
        <Hexagon />
        {/* Content Section */}
        <div className="w-full max-w-sm px-2 z-10 border-2 border-[#012073] rounded-lg p-4 bg-white">
          <h1
            className="text-lg lg:text-2xl font-bold text-[#012073] mb-4 text-center lg:text-left leading-tight"
          >
            Rafraîchissez vos pratiques managériales
          </h1>              
          <div
            className="text-xs lg:text-lg text-gray-700 leading-relaxed space-y-4 sm:space-y-6 text-center lg:text-left"
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