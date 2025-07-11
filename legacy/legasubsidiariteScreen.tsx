"use client"

import { useState, useEffect } from "react"

export default function SubsidiariteScreen() {
  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="subsidiarite">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Notre methode innovante : la Subsidiarité
        </h1>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center mt-8 sm:mt-12 md:mt-16">
          {/* Content Section */}
          <div className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Notre Approche
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          {/* Hexagon Section */}
          <div className="flex-1 flex items-center justify-center">
            <Hexagon image="spire-dominos_bc.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Hexagon({ image, onClick, noEffects }: { image: string, onClick?: () => void, noEffects?: boolean }) {
  // Flat-topped hexagon points (horizontal orientation)
  const hexPoints = "43,25 43,-25 0,-50 -43,-25 -43,25 0,50";
  const [hover, setHover] = useState(false);
  const [hasMouseInteraction, setHasMouseInteraction] = useState(false);
  
  const shadow = noEffects ? 'none' : (hover
    ? 'drop-shadow(0 8px 18px #f7e400cc)'
    : 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))');
  
  const handleMouseEnter = () => {
    setHasMouseInteraction(true);
    setHover(true);
  };
  
  const handleMouseLeave = () => {
    setHover(false);
  };
  
  return (
    <div className={`${hasMouseInteraction ? '' : 'hexagon-glow'} sm:hexagon-glow-none`}>
      <svg
        width="120"
        height="120"
        viewBox="-60 -60 120 120"
        className="sm:w-[200px] sm:h-[200px]"
        style={{ 
          filter: hasMouseInteraction ? shadow : 'none',
          cursor: noEffects ? 'default' : 'pointer'
        }}
        onMouseEnter={noEffects ? undefined : handleMouseEnter}
        onMouseLeave={noEffects ? undefined : handleMouseLeave}
        onClick={onClick}
      >
        <defs>
          <clipPath id={image.replace(/\W/g, "") + "-clip"}>
            <polygon points={hexPoints} />
          </clipPath>
        </defs>
        <polygon points={hexPoints} fill="#012073" stroke="#012073" strokeWidth="4" />
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
      {/* Shadow effect for larger screens with mouse interaction */}
      {hasMouseInteraction && (
        <svg
          width="120"
          height="120"
          viewBox="-60 -60 120 120"
          className="hidden sm:block sm:w-[200px] sm:h-[200px] absolute inset-0 pointer-events-none"
          style={{ filter: shadow }}
        >
          <defs>
            <clipPath id={image.replace(/\W/g, "") + "-shadow-clip"}>
              <polygon points={hexPoints} />
            </clipPath>
          </defs>
          <polygon points={hexPoints} fill="#012073" stroke="#012073" strokeWidth="4" />
          <image
            href={`/${image}`}
            x={-50}
            y={-50}
            width={100}
            height={100}
            clipPath={`url(#${image.replace(/\W/g, "")}-shadow-clip)`}
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      )}
    </div>
  );
}