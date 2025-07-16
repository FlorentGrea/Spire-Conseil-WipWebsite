"use client"

import { useState, useEffect } from "react"

function Hexagon({ image, onClick, noEffects, isSelected }: { image: string, onClick?: () => void, noEffects?: boolean, isSelected?: boolean }) {
  // Flat-topped hexagon points (horizontal orientation)
  const hexPoints = "43,25 43,-25 0,-50 -43,-25 -43,25 0,50";
  const [hover, setHover] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isSm, setIsSm] = useState(false);
  const [isLg, setIsLg] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsSmall(window.innerWidth < 640);
      setIsSm(window.innerWidth >= 640);
      setIsLg(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  const size = isLg ? 120 : 70;
  const fillColor = isSelected ? "#ecb529" : "#012073";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ cursor: noEffects ? 'default' : 'pointer' }}
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
  );
}

export default function SubsidiariteScreen() {
  const [activeHex, setActiveHex] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimation, setTextAnimation] = useState<string>('');
  const [gradientRotation, setGradientRotation] = useState<number>(-50);
  const [drawingComplete, setDrawingComplete] = useState(false);
  
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
  
  const hexContent = {
    proximite: {
      title: "Proximité",
      description: "Le principe de subsidiarité commence par la proximité : les décisions doivent être prises là où les enjeux sont compris de manière fine — sur le terrain. Cela implique de faire confiance à ceux qui sont confrontés directement aux situations, car ce sont eux qui ont la meilleure lecture du contexte. Le rôle du manager est donc de ne pas centraliser inutilement mais de s'assurer que les bonnes personnes disposent des informations et du cadre nécessaire pour agir rapidement et efficacement."
    },
    autonomie: {
      title: "Autonomie", 
      description: "La subsidiarité repose sur l'idée que chacun doit agir selon son niveau de compétence et sa responsabilité. Cela implique de donner de l'autonomie réelle aux équipes : laisser les collaborateurs organiser leur travail, prendre des décisions adaptées et expérimenter. Un management subsidié favorise donc un cadre clair, mais souple, où les équipes ne dépendent pas systématiquement d'une validation hiérarchique."
    },
    responsabilite: {
      title: "Responsabilité",
      description: "L'autonomie va de pair avec la responsabilité. En subsidiarité, chaque acteur est comptable de ses décisions et de leurs impacts. Cela signifie que le manager ne reprend pas le contrôle quand une difficulté surgit, mais accompagne son collaborateur dans l'analyse, la résolution et l'apprentissage. C'est cette responsabilisation qui développe l'engagement et la maturité professionnelle des équipes."
    },
    confiance: {
      title: "Confiance",
      description: "La subsidiarité est impossible sans confiance. Le manager doit croire en la capacité des collaborateurs à prendre les bonnes décisions et à gérer leurs missions. Cette confiance n'est pas naïve : elle se construit dans le temps, par la qualité des échanges, l'écoute, et la transparence des résultats. Sans confiance, la tentation du contrôle excessif revient, étouffant l'autonomie."
    },
    soutien: {
      title: "Soutien",
      description: "Le manager ne disparaît pas dans un système subsidié : il intervient en soutien, en apportant un cadre, des ressources, des arbitrages ou des conseils si nécessaire. Son rôle est de favoriser la réussite sans faire à la place. C'est un accompagnement intelligent, qui aide l'équipe à progresser, à surmonter les obstacles, tout en respectant son champ de compétence."
    },
    clarte: {
      title: "Clarté",
      description: "Pour que la subsidiarité fonctionne, la clarté est indispensable : clarté des rôles, des responsabilités, des marges de manœuvre, des objectifs attendus. Sans cela, les zones grises génèrent de la confusion, des tensions et des blocages. Le manager doit donc être très explicite sur qui décide quoi, où s'arrête l'autonomie, et comment les décisions sont suivies et partagées."
    }
  };

  const handleHexInteraction = (hexKey: string) => {
    setActiveHex(hexKey);
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

  const currentContent = activeHex ? hexContent[activeHex as keyof typeof hexContent] : {
    title: "Notre Approche",
    description: "Dans un environnement complexe, changeant et exigeant, les organisations ont besoin de réactivité, d'engagement et d'intelligence collective. Pour cela, nous croyons en une approche managériale fondée sur la <strong>subsidiarité</strong> : un principe qui vise à confier à chaque niveau de l'organisation la responsabilité d'agir là où il est le plus pertinent. Il ne s'agit pas simplement de déléguer, mais de repenser la manière dont le pouvoir, la décision et la responsabilité sont partagés, pour renforcer l'autonomie des équipes tout en assurant un cadre clair et structurant. C'est cette vision que nous portons, traduite en six piliers essentiels."
  };

  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-0 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="subsidiarite">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center">
          {/* Content Section */}
          <div className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            <h2 key={`title-${activeHex || 'default'}`} className={`text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-[#012073] mb-3 sm:mb-4 transition-all duration-300 ${activeHex ? textAnimation : ''}`}>
              {currentContent.title}
            </h2>
            {activeHex ? (
              <p key={`description-${activeHex}`} className={`text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed transition-all duration-300 ${textAnimation}`}>
                {currentContent.description}
              </p>
            ) : (
              <p key="default-description" className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed transition-all duration-300" dangerouslySetInnerHTML={{ __html: currentContent.description }} />
            )}
          </div>
          
                    {/* C-Shaped Gradient Arrow Section */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-[14rem] h-[14rem] sm:w-[20rem] sm:h-[20rem] lg:w-[28rem] lg:h-[28rem]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="50%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#6b7280" />
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
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'proximite' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Proximité</span>
                  </div>
                </div>
                
                {/* Top-right hexagon */}
                <div className={`absolute top-1/2 -right-5 sm:-right-4 lg:-right-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.3s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('autonomie')}>
                  <Hexagon image="autonomy.jpg" isSelected={activeHex === 'autonomie'} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'autonomie' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Autonomie</span>
                  </div>
                </div>
                
                {/* Bottom-right hexagon */}
                <div className={`absolute -bottom-2 sm:bottom-0 right-1/8 sm:right-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.6s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('responsabilite')}>
                  <Hexagon image="responsibility.jpg" isSelected={activeHex === 'responsabilite'} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'responsabilite' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Responsabilité</span>
                  </div>
                </div>
                
                {/* Bottom hexagon */}
                <div className={`absolute -bottom-2 sm:bottom-0 left-1/8 sm:left-1/7 transform cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.9s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('confiance')}>
                  <Hexagon image="trust.jpg" isSelected={activeHex === 'confiance'} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'confiance' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Confiance</span>
                  </div>
                </div>
                
                {/* Bottom-left hexagon */}
                <div className={`absolute top-1/2 -left-5 sm:-left-4 lg:-left-8 transform -translate-y-1/2 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.2s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('soutien')}>
                  <Hexagon image="support.jpg" isSelected={activeHex === 'soutien'} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'soutien' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Soutien</span>
                  </div>
                </div>
                
                {/* Top-left hexagon */}
                <div className={`absolute -top-2 sm:top-0 left-1/8 sm:left-1/7 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.5s' : '0s', animationFillMode: 'both' }} onClick={() => handleHexInteraction('clarte')}>
                  <Hexagon image="clarity.jpg" isSelected={activeHex === 'clarte'} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <span className={`text-white font-bold text-xs sm:text-xs md:text-sm px-2 py-1 rounded shadow-lg transition-all duration-300 ${activeHex === 'clarte' ? 'bg-[#ecb529] text-[#012073]' : 'bg-[#012073]/90'}`}>Clarté</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

