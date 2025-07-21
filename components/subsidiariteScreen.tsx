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

export default function SubsidiariteScreen() {
  const [activeHex, setActiveHex] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimation, setTextAnimation] = useState<string>('');
  const [gradientRotation, setGradientRotation] = useState<number>(-50);
  const [drawingComplete, setDrawingComplete] = useState(false);
  const [isManualSelection, setIsManualSelection] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Set drawing complete after animation duration (3s)
          setTimeout(() => setDrawingComplete(true), 3000);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('[data-screen="subsidiarite"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Dynamic hexagon selection
  useEffect(() => {
    if (!isVisible || isManualSelection) return;

    const hexOrder = ['proximite', 'autonomie', 'responsabilite', 'confiance', 'soutien', 'clarte'];
    
    const interval = setInterval(() => {
      setActiveHex(prevHex => {
        if (!prevHex) return 'proximite';
        
        const currentIndex = hexOrder.indexOf(prevHex);
        const nextIndex = (currentIndex + 1) % hexOrder.length;
        const nextHex = hexOrder[nextIndex];
        
        // Update gradient rotation for the new hexagon
        const hexPositions = {
          proximite: -90,
          autonomie: -30,
          responsabilite: 30,
          confiance: 90,
          soutien: 150,
          clarte: 210
        };
        
        const targetRotation = hexPositions[nextHex as keyof typeof hexPositions] || -50;
        setGradientRotation(targetRotation);
        
        return nextHex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isVisible, isManualSelection]);
  
  const hexContent = {
    default: {
      title: "Notre Approche",
      description: "Nous croyons en une approche managériale fondée sur la <strong>subsidiarité</strong> : confier à chaque niveau la responsabilité d'agir là où il est le plus pertinent. Six piliers essentiels pour renforcer l'autonomie des équipes dans un cadre structurant."
    },
    proximite: {
      title: "Proximité",
      description: "Les décisions doivent être prises là où les enjeux sont compris — sur le terrain. Faire confiance à ceux qui vivent les situations directement, car ils ont la meilleure lecture du contexte."
    },
    autonomie: {
      title: "Autonomie", 
      description: "Donner une autonomie réelle aux équipes : laisser les collaborateurs organiser leur travail et prendre des décisions adaptées. Un cadre clair mais souple, sans validation hiérarchique systématique."
    },
    responsabilite: {
      title: "Responsabilité",
      description: "L'autonomie va de pair avec la responsabilité. Chaque acteur est comptable de ses décisions et accompagné dans l'apprentissage. Cette responsabilisation développe l'engagement des équipes."
    },
    confiance: {
      title: "Confiance",
      description: "La subsidiarité est impossible sans confiance. Croire en la capacité des collaborateurs à prendre les bonnes décisions. Une confiance qui se construit par la qualité des échanges et la transparence."
    },
    soutien: {
      title: "Soutien",
      description: "Le manager intervient en soutien : apporter un cadre, des ressources, des conseils si nécessaire. Favoriser la réussite sans faire à la place. Un accompagnement intelligent qui respecte les compétences."
    },
    clarte: {
      title: "Clarté",
      description: "Clarté des rôles, responsabilités, marges de manœuvre et objectifs. Être explicite sur qui décide quoi et où s'arrête l'autonomie. Sans clarté, confusion et blocages."
    }
  };

  const handleHexInteraction = (hexKey: string) => {
    setActiveHex(hexKey);
    setIsManualSelection(true); // Stop automatic cycling when manually clicked
    
    // Determine slide direction based on hexagon position
    const slideDirection = getSlideDirection(hexKey);
    setTextAnimation(slideDirection);
    
    // Update gradient rotation based on selected hexagon
    const hexPositions = {
      proximite: -90,    // Top (12 o'clock position) - adjusted from 90
      autonomie: -30,     // Top-right (2 o'clock position) - adjusted from 30
      responsabilite: 30, // Bottom-right (4 o'clock position) - adjusted from -30
      confiance: 90,  // Bottom (6 o'clock position) - adjusted from -90
      soutien: 150,    // Bottom-left (8 o'clock position) - adjusted from -150
      clarte: 210       // Top-left (10 o'clock position) - adjusted from 150
    };
    
    const targetRotation = hexPositions[hexKey as keyof typeof hexPositions] || -50;
    setGradientRotation(targetRotation);
  };

  const getSlideDirection = (hexKey: string) => {
    // Define the order of text transitions
    const textOrder = ['proximite', 'autonomie', 'responsabilite', 'confiance', 'soutien', 'clarte'];
    
    // If no previous hex was active, slide from left (first transition)
    if (!activeHex) {
      return 'animate-slide-in-left';
    }
    
    // Get the indices of current and previous hexagons
    const currentIndex = textOrder.indexOf(hexKey);
    const previousIndex = textOrder.indexOf(activeHex);
    
    // If moving forward in the sequence, slide from right
    if (currentIndex > previousIndex) {
      return 'animate-slide-in-right';
    }
    // If moving backward in the sequence, slide from left
    else if (currentIndex < previousIndex) {
      return 'animate-slide-in-left';
    }
    // If same hexagon, still animate from left for consistency
    else {
      return 'animate-slide-in-left';
    }
  };

  const currentContent = activeHex ? hexContent[activeHex as keyof typeof hexContent] : hexContent.default;

  return (
    <div className="screen-container"  data-screen="subsidiarite">
      <div className="screen-content flex-col sm:flex-row">
          
        {/* C-Shaped Gradient Arrow Section */}
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
                onClick={() => setActiveHex(null)}
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
                onClick={() => setActiveHex(null)}
                style={{ pointerEvents: 'auto' }}
              />
            </svg>
              
            {/* Clickable center area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 cursor-pointer z-10"
                onClick={() => setActiveHex(null)}
              />
            </div>
              
            {/* Hexagons around the circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top hexagon */}
              <div className={`absolute -top-2 sm:top-0 right-1/8 sm:right-1/7 transform cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('proximite')}>
                <Hexagon image="proximity.jpg" isSelected={activeHex === 'proximite'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'proximite' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Proximité</span>
                </div>
              </div>
                
              {/* Top-right hexagon */}
              <div className={`absolute top-1/2 -right-5 sm:-right-4 lg:-right-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.3s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('autonomie')}>
                <Hexagon image="autonomy.jpg" isSelected={activeHex === 'autonomie'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'autonomie' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Autonomie</span>
                </div>
              </div>
                
              {/* Bottom-right hexagon */}
              <div className={`absolute -bottom-2 sm:bottom-0 right-1/8 sm:right-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.6s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('responsabilite')}>
                <Hexagon image="responsibility.jpg" isSelected={activeHex === 'responsabilite'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'responsabilite' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Responsabilité</span>
                </div>
              </div>
                
              {/* Bottom hexagon */}
              <div className={`absolute -bottom-2 sm:bottom-0 left-1/8 sm:left-1/7 transform cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.9s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('confiance')}>
                <Hexagon image="trust.jpg" isSelected={activeHex === 'confiance'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'confiance' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Confiance</span>
                </div>
              </div>
                
              {/* Bottom-left hexagon */}
              <div className={`absolute top-1/2 -left-5 sm:-left-4 lg:-left-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.2s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('soutien')}>
                <Hexagon image="support.jpg" isSelected={activeHex === 'soutien'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'soutien' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Soutien</span>
                </div>
              </div>
                
              {/* Top-left hexagon */}
              <div className={`absolute -top-2 sm:top-0 left-1/8 sm:left-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.5s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('clarte')}>
                <Hexagon image="clarity.jpg" isSelected={activeHex === 'clarte'} />
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                  <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'clarte' ? 'label-selected text-[#012073]' : 'bg-[#012073]/90'}`}>Clarté</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col w-full max-w-sm sm:max-w-none flex-grow">
          {/* Title on top of the box */}
          <div className="title-container title-container-v3">
            <h2 key={`title-${activeHex || 'default'}`} className={`title-text transition-all duration-300 ${activeHex ? textAnimation : ''}`}>
              {currentContent.title}
            </h2>
          </div>
          
          <div className="content-box content-box-v3 h-[30vh] sm:h-fit px-2 z-10 flex-grow">
            <p key={`description-${activeHex || 'default'}`} className={`text-xs lg:text-xl text-gray-700 leading-relaxed text-center sm:text-left transition-all duration-300 ${activeHex ? textAnimation : ''}`}>
              {!activeHex ? (
                <span dangerouslySetInnerHTML={{ __html: currentContent.description }} />
              ) : (
                currentContent.description
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

