"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const Hexagon = forwardRef<{ getLineRightPosition: () => number | null }>((props, ref) => {
  const [lineHeight, setLineHeight] = useState<string>('100vh');

  // Method to get current line right position (can be called from parent component)
  const getLineRightPosition = () => {
    return null; // No line anymore
  };

  // Calculate line height to reach subsidiarite-hexagon
  useEffect(() => {
    const calculateLineHeight = () => {
      // Get the actual hexagon element (the div with the hexagon)
      const homeHexagonElement = document.querySelector('[data-screen="home"] .relative.aspect-square');
      const subsidiariteHexagonWrapper = document.querySelector('[data-screen="subsidiarite-image"]');
      
      console.log('Home hexagon element:', homeHexagonElement);
      console.log('Subsidiarite wrapper:', subsidiariteHexagonWrapper);
      
      if (homeHexagonElement && subsidiariteHexagonWrapper) {
        const homeHexagonRect = homeHexagonElement.getBoundingClientRect();
        const subsidiariteHexagonRect = subsidiariteHexagonWrapper.getBoundingClientRect();
        
        console.log('Home hexagon rect:', homeHexagonRect);
        console.log('Subsidiarite rect:', subsidiariteHexagonRect);
        
        // The line starts at top-full of the home hexagon's container div,
        // and has a -mt-[10px] (margin-top: -10px).
        // So, its actual starting point is homeHexagonRect.bottom - 10px
        const lineStartPoint = homeHexagonRect.bottom - 20;
        const targetEndPoint = subsidiariteHexagonRect.top;
        
        const distance = targetEndPoint - lineStartPoint;
        
        console.log('Line start point:', lineStartPoint);
        console.log('Target end point:', targetEndPoint);
        console.log('Distance:', distance);
        
        if (distance > 0) {
          setLineHeight(`${distance}px`);
          console.log('Setting line height to:', `${distance}px`);
        } else {
          setLineHeight('0px'); // Hide if distance is negative or zero
          console.log('Setting line height to 0px');
        }
      } else {
        setLineHeight('0px'); // Hide if elements not found
        console.log('Elements not found, setting line height to 0px');
      }
    };

    const timer = setTimeout(calculateLineHeight, 200);
    window.addEventListener('resize', calculateLineHeight);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLineHeight);
    };
  }, []);

  // Expose the method to parent component
  useImperativeHandle(ref, () => ({
    getLineRightPosition
  }));

  return (
    <div className="relative aspect-square w-48 md:w-64 lg:w-96 sm:mb-20 lg:mb-40" style={{ minWidth: '0', minHeight: '0' }}>
      {/* Absolute positioned line extending from hexagon */}
      <div 
        className="hidden sm:block absolute top-full w-3 md:w-4 lg:w-5 left-1/2 transform -translate-x-1/2 pointer-events-none z-10 -mt-[10px] bg-sc-secondary"
        style={{ 
          height: lineHeight === '0px' ? '100vh' : lineHeight,
          backgroundColor: '#012073',
          opacity: 1
        }}
        data-screen="vertical-line"
      />
      
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
            <stop offset="0%" stopColor="#012073" />
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
        <div className="w-full max-w-sm sm:max-w-none flex flex-col flex-grow sm:mt-20 lg:mt-40"> 
          <div className="flex flex-col gap-4 lg:gap-6 z-10 flex-grow">
            <h1 className="title-text text-sc-secondary text-center sm:text-left">
              Rafraîchissez vos pratiques managériales
            </h1>
            <div
              className="text-xs lg:text-lg text-sc-tertiary leading-relaxed space-y-4 sm:space-y-6 text-center sm:text-left"
            >
              <p>
                SPIRE accompagne les organisations dans la transformation de leurs pratiques managériales en valorisant l'autonomie, la responsabilité et soutien mutuel à tous les niveaux. Par la subsidiarité mise en acte, nous faisons du management un levier de performance, d’engagement et de bien-être durable pour l'ensemble des collaborateurs. 
              </p>
            </div>
            <div className="flex flex-row gap-2 sm:gap-8 justify-center sm:justify-start">
              <button 
                className="button button-secondary text-lg lg:text-xl px-6 py-2 font-['Barlow_Semi_Condensed'] font-bold"
                onClick={() => {
                  const offersScreen = document.querySelector('[data-screen="offers"]');
                  if (offersScreen) {
                    offersScreen.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Notre parcours
              </button>
              <button 
                className="button button-primary text-lg lg:text-xl px-6 py-2 font-['Barlow_Semi_Condensed'] font-bold"
                onClick={() => {
                  const contactScreen = document.querySelector('[data-screen="contact"]');
                  if (contactScreen) {
                    contactScreen.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomeScreen;