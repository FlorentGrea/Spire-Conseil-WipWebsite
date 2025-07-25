"use client"

import { useState, useEffect } from "react"

function Hexagon({ image, onClick, noEffects, isSelected }: { image: string, onClick?: () => void, noEffects?: boolean, isSelected?: boolean }) {
  // Flat-topped hexagon points (horizontal orientation)
  const hexPoints = "43,25 43,-25 0,-50 -43,-25 -43,25 0,50";
  const [hover, setHover] = useState(false);
  const [isLg, setIsLg] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsLg(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  const size = isLg ? 120 : 70;
  const fillColor = "#012073";
  
  return (
    <div className={isSelected ? 'hexagon-selected' : ''}>
      <svg
        width={size}
        height={size}
        viewBox="-60 -60 120 120"
        style={{ 
          cursor: noEffects ? 'default' : 'pointer',
          filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))'
        }}
        onMouseEnter={noEffects ? undefined : () => setHover(true)}
        onMouseLeave={noEffects ? undefined : () => setHover(false)}
        onClick={onClick}
      >
        <defs>
          <clipPath id={image.replace(/\W/g, "") + "-clip"}>
            <polygon points={hexPoints} />
          </clipPath>
          <filter id={image.replace(/\W/g, "") + "-shadow"}>
            <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.25)"/>
            <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)"/>
          </filter>
        </defs>
        <polygon 
          points={hexPoints} 
          fill={fillColor} 
          stroke={fillColor} 
          strokeWidth="4"
          filter={noEffects ? 'none' : hover ? 'drop-shadow(0 2px 4px #f7e400dd)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}
        />
        <image
          href={`/${image}`}
          x={-50}
          y={-50}
          width={100}
          height={100}
          clipPath={`url(#${image.replace(/\W/g, "")}-clip)`}
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}

interface SubsidiariteCircleProps {
  isVisible: boolean;
  drawingComplete: boolean;
  gradientRotation: number;
  activeHex: string | null;
  onHexInteraction: (hexKey: string) => void;
  onCenterClick: () => void;
}

export default function SubsidiariteCircle({ 
  isVisible, 
  drawingComplete, 
  gradientRotation, 
  activeHex, 
  onHexInteraction, 
  onCenterClick 
}: SubsidiariteCircleProps) {
  return (
    <div className="flex items-center justify-center relative">
      <div className="relative size-[15rem] lg:size-[20rem] lg:size-[28rem]">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 100"
          style={{ filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))' }}
        >
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="50%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#012073" />
              <stop offset="70%" stopColor="#012073" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
            
          {/* Animated drawing circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#arrowGradient)"
            strokeWidth="6"
            strokeLinecap={drawingComplete ? "square" : "round"}
            strokeDasharray="280"
            strokeDashoffset="280"
            className={`${isVisible ? 'animate-draw-circle' : ''}`}
            style={{ 
              transform: `rotate(${gradientRotation}deg)`, 
              transformOrigin: '50px 50px',
              transition: 'transform 0.6s ease-in-out'
            }}
          />
            
          {/* Center text with better positioning */}
          <text
            x="50"
            y="48"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold cursor-pointer"
            style={{ 
              fontSize: 'min(1.5vw, 8px)', 
              fill: '#1e3a8a',
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8)) drop-shadow(0 0 4px rgba(255,255,255,0.6))',
              transformOrigin: '50px 48px'
            }}
            onClick={onCenterClick}
          >
            <tspan x="50" dy="-4">Vers la</tspan>
            <tspan x="50" dy="8">subsidiarité</tspan>
          </text>
            
          {/* Clickable center area */}
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="transparent"
            className="cursor-pointer"
            onClick={onCenterClick}
            style={{ pointerEvents: 'auto' }}
          />
        </svg>
          
        {/* Clickable center area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 cursor-pointer z-10"
            onClick={onCenterClick}
          />
        </div>
          
        {/* Hexagons around the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top hexagon */}
          <div className={`absolute -top-2 sm:top-0 right-1/8 sm:right-1/7 transform cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('proximite')}>
            <Hexagon image="proximity.jpg" isSelected={activeHex === 'proximite'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'proximite' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Proximité</span>
            </div>
          </div>
            
          {/* Top-right hexagon */}
          <div className={`absolute top-1/2 -right-5 sm:-right-4 lg:-right-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.3s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('autonomie')}>
            <Hexagon image="autonomy.jpg" isSelected={activeHex === 'autonomie'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'autonomie' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Autonomie</span>
            </div>
          </div>
            
          {/* Bottom-right hexagon */}
          <div className={`absolute -bottom-2 sm:bottom-0 right-1/8 sm:right-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.6s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('responsabilite')}>
            <Hexagon image="responsibility.jpg" isSelected={activeHex === 'responsabilite'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'responsabilite' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Responsabilité</span>
            </div>
          </div>
            
          {/* Bottom hexagon */}
          <div className={`absolute -bottom-2 sm:bottom-0 left-1/8 sm:left-1/7 transform cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.9s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('confiance')}>
            <Hexagon image="trust.jpg" isSelected={activeHex === 'confiance'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'confiance' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Confiance</span>
            </div>
          </div>
            
          {/* Bottom-left hexagon */}
          <div className={`absolute top-1/2 -left-5 sm:-left-4 lg:-left-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.2s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('soutien')}>
            <Hexagon image="support.jpg" isSelected={activeHex === 'soutien'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'soutien' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Soutien</span>
            </div>
          </div>
            
          {/* Top-left hexagon */}
          <div className={`absolute -top-2 sm:top-0 left-1/8 sm:left-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.5s' : '0s', animationFillMode: 'both' }} onClick={() => onHexInteraction('clarte')}>
            <Hexagon image="clarity.jpg" isSelected={activeHex === 'clarte'} />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 shadow-lg transition-all duration-300 ${activeHex === 'clarte' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Clarté</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 