"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";

function Hexagon({ image, noEffects }: { image: string, noEffects?: boolean }) {
  // Flat-topped hexagon points (horizontal orientation)
  const hexPoints = "43,25 43,-25 0,-50 -43,-25 -43,25 0,50";
  const [hover, setHover] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  
  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  const shadow = noEffects ? 'none' : hover ? 'drop-shadow(0 8px 18px #f7e400dd)' : 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))';
  
  const size = isSmall ? 300 : 500;
  const imageSize = size * 0.4; // Smaller image to show more of the full image
  const imageOffset = -imageSize / 2;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ filter: shadow, cursor: noEffects ? 'default' : 'pointer' }}
      onMouseEnter={noEffects ? undefined : () => setHover(true)}
      onMouseLeave={noEffects ? undefined : () => setHover(false)}
    >
      <defs>
        <clipPath id={image.replace(/\W/g, "") + "-clip"}>
          <polygon points={hexPoints} />
        </clipPath>
      </defs>
      <polygon 
        points={hexPoints} 
        fill="#fff"
        strokeWidth={6}
        filter={shadow}
      />
      <image
        href={`/${image}`}
        x={imageOffset}
        y={imageOffset}
        width={imageSize}
        height={imageSize}
        clipPath={`url(#${image.replace(/\W/g, "")}-clip)`}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
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
    <div className="flex flex-col items-center w-full h-screen snap-start pt-0 pb-6 sm:pb-10 md:pb-16pb-20" data-screen="home">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6px-8 w-full h-full flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20">
        <div className="flex flex-col lg:flex-row gap-8gap-12ll max-w-6xl items-center justify-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div
              className={`transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}             style={{
                animationDelay: isVisible ? '0s' : '0s',
                animationFillMode: 'both',
              }}
            >
              <Hexagon image="spire-dominos_bc.jpg" noEffects />
            </div>
          </div>
          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-lg lg:max-w-none">
              <h1
                className={`text-xl sm:text-2d:text-3g:text-4xl xl:text-5l font-bold text-#01273] mb-4:mb-6 md:mb-8 text-center lg:text-left leading-tight transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: isVisible ? '0.3s' : '0s',
                  animationFillMode: 'both',
                }}
              >
                Soutenir les managers par la subsidiarité
              </h1>              <div
                className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-70ding-relaxed space-y-4 sm:space-y-6 transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: isVisible ? '0.6s' : '0s',
                  animationFillMode: 'both',
                }}
              >
                <p>
                  Spire accompagne les organisations dans la transformation de leur management en valorisant l'autonomie, la responsabilité et le soutien mutuel à tous les niveaux. Grâce à la subsidiarité, les dirigeants deviennent des catalyseurs d'action, et les managers, des acteurs pleinement engagés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 