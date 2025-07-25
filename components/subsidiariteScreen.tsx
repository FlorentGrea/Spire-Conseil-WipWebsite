"use client"

import SubsidiariteCircle from "./SubsidiariteCircle"
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";

export default function SubsidiariteScreen() {
  const [activeHex, setActiveHex] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimation, setTextAnimation] = useState<string>('');
  const [gradientRotation, setGradientRotation] = useState<number>(-50);
  const [drawingComplete, setDrawingComplete] = useState(false);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  // Button position variables
  const buttonPositions = {
    proximite: "absolute top-1/20 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    sub1: "absolute top-3/10 right-1/10 transform translate-x-1/2 -translate-y-1/2",
    sub2: "absolute bottom-3/10 right-1/10 transform translate-x-1/2 translate-y-1/2",
    sub3: "absolute bottom-1/20 left-1/2 transform -translate-x-1/2 translate-y-1/2",
    sub4: "absolute bottom-3/10 left-1/10 transform -translate-x-1/2 translate-y-1/2",
    sub5: "absolute top-3/10 left-1/10 transform -translate-x-1/2 -translate-y-1/2"
  };
  
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
    sub1: {
      title: "La culture managériale",
      description: "La subsidiarité est impossible sans confiance. Croire en la capacité des collaborateurs à prendre les bonnes décisions. Une confiance qui se construit par la qualité des échanges et la transparence."  
    },
    sub2: {
      title: "Les coûts cachés",
      description: "Les coûts cachés que nous identifions, réduisons et mesurons avec précision."
    },
    sub3: {
      title: "La performance",
      description: "La performance, grâce à une mobilisation accrue, des décisions plus agiles et une responsabilisation généralisée."
    },
    sub4: {
      title: "Les pratiques",
      description: "Les pratiques, en favorisant l’autonomie et la coopération à chaque niveau."
    },
    sub5: {
      title: "Les postures",
      description: "Les postures, avec des managers qui soutiennent plutôt que contrôlent."
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
      sub1: -30,     // Top-right (2 o'clock position) - adjusted from 30
      sub2: 30, // Bottom-right (4 o'clock position) - adjusted from -30
      sub3: 90,  // Bottom (6 o'clock position) - adjusted from -90
      sub4: 150,    // Bottom-left (8 o'clock position) - adjusted from -150
      sub5: 210       // Top-left (10 o'clock position) - adjusted from 150
    };
    
    const targetRotation = hexPositions[hexKey as keyof typeof hexPositions] || -50;
    setGradientRotation(targetRotation);
  };

  const getSlideDirection = (hexKey: string) => {
    // Define the order of text transitions
    const textOrder = ['proximite', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
    
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

  const handleButtonClick = (buttonKey: string) => {
    setSelectedButton(selectedButton === buttonKey ? null : buttonKey);
  };

  const buttonTexts = {
    culture: "La culture managériale, en développant confiance, initiative et droit à l'erreur.",
    couts: "Les coûts cachés, que nous identifions, réduisons et mesurons avec précision.",
    performance: "La performance, grâce à une mobilisation accrue, des décisions plus agiles et une responsabilisation généralisée.",
    pratiques: "Les pratiques, en favorisant l'autonomie et la coopération à chaque niveau.",
    postures: "Les postures, avec des managers qui soutiennent plutôt que contrôlent."
  };

  return (
    <div className="screen-container bg-sc-tertiary/8"  data-screen="subsidiarite">
             <div className="screen-content flex-col" style={{ paddingLeft: '0', paddingRight: '0' }}>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:max-h-[40vh]" data-screen="subsidiarite-image">
          <Image 
             src="/Application.jpg" 
             alt="Subsidiarite" 
             width={400} 
             height={400} 
             className="aspect-video sm:aspect-square h-[30vh] sm:h-full w-full object-cover relative z-20"
           />
          <div className="flex flex-col bg-sc-primary w-[90%] sm:w-auto h-auto sm:h-[90%] p-4 sm:p-8 -mt-5 sm:mt-0 sm:-ml-5">
            <div className="title-container text-center sm:text-left mb-0">
              <h1 className="title-text text-sc-secondary text-center sm:text-left">
                Notre méthode: la subsidiarité
              </h1>
            </div>
            <div
              className="text-xs lg:text-lg text-sc-tertiary leading-relaxed space-y-4 sm:space-y-6 text-justify sm:text-left"
            >
              <p>
                Chez SPIRE, nous plaçons la subsidiarité au cœur du management. Ce principe puissant consiste à permettre la décision au plus près du terrain, là où les enjeux sont réels, les responsabilités claires, les relations vertueuses et l’action immédiate. <br /> 
                <strong>Notre approche transforme en profondeur 5 grands aspects de votre organisation:</strong>
              </p>
            </div>

                         <div className="flex flex-col sm:flex-row gap-2 mt-4">  
               <div className="flex flex-col">
                 <button 
                     className={`button text-lg sm:text-xs md:text-sm lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold ${selectedButton === 'culture' ? 'transform-none shadow-none' : ''}`}
                     onClick={() => handleButtonClick('culture')}
                     data-state={selectedButton === 'culture' ? 'active' : 'inactive'}
                   >
                     La culture managériale
                 </button>
                 {/* Mobile: text under button */}
                 <div className="sm:hidden">
                   {selectedButton === 'culture' && (
                     <p className="text-xs text-sc-tertiary mt-2 text-center animate-slide-in">
                       {buttonTexts.culture}
                     </p>
                   )}
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <button 
                     className={`button text-lg sm:text-xs md:text-sm lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold ${selectedButton === 'couts' ? 'transform-none shadow-none' : ''}`}
                     onClick={() => handleButtonClick('couts')}
                     data-state={selectedButton === 'couts' ? 'active' : 'inactive'}
                   >
                     Les coûts cachés
                 </button>
                 {/* Mobile: text under button */}
                 <div className="sm:hidden">
                   {selectedButton === 'couts' && (
                     <p className="text-xs text-sc-tertiary mt-2 text-center animate-slide-in">
                       {buttonTexts.couts}
                     </p>
                   )}
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <button 
                     className={`button text-lg sm:text-xs md:text-sm lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold ${selectedButton === 'performance' ? 'transform-none shadow-none' : ''}`}
                     onClick={() => handleButtonClick('performance')}
                     data-state={selectedButton === 'performance' ? 'active' : 'inactive'}
                   >
                     La performance
                 </button>
                 {/* Mobile: text under button */}
                 <div className="sm:hidden">
                   {selectedButton === 'performance' && (
                     <p className="text-xs text-sc-tertiary mt-2 text-center animate-slide-in">
                       {buttonTexts.performance}
                     </p>
                   )}
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <button 
                     className={`button text-lg sm:text-xs md:text-sm lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold ${selectedButton === 'pratiques' ? 'transform-none shadow-none' : ''}`}
                     onClick={() => handleButtonClick('pratiques')}
                     data-state={selectedButton === 'pratiques' ? 'active' : 'inactive'}
                   >
                     Les pratiques
                 </button>
                 {/* Mobile: text under button */}
                 <div className="sm:hidden">
                   {selectedButton === 'pratiques' && (
                     <p className="text-xs text-sc-tertiary mt-2 text-center animate-slide-in">
                       {buttonTexts.pratiques}
                     </p>
                   )}
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <button 
                     className={`button text-lg sm:text-xs md:text-sm lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold ${selectedButton === 'postures' ? 'transform-none shadow-none' : ''}`}
                     onClick={() => handleButtonClick('postures')}
                     data-state={selectedButton === 'postures' ? 'active' : 'inactive'}
                   >
                     Les postures
                 </button>
                 {/* Mobile: text under button */}
                 <div className="sm:hidden">
                   {selectedButton === 'postures' && (
                     <p className="text-xs text-sc-tertiary mt-2 text-center animate-slide-in">
                       {buttonTexts.postures}
                     </p>
                   )}
                 </div>
               </div>
                          </div>
           </div>
         </div>

         {/* Desktop: Content section below parent div */}
         <div className="hidden sm:block w-[96%]">
           {selectedButton && (
             <div className="bg-sc-primary p-6 animate-slide-in">
               <div className="title-container text-center sm:text-left mb-4">
                 <h2 className="title-text text-sc-secondary text-xl font-bold">
                   {selectedButton === 'culture' && 'La culture managériale'}
                   {selectedButton === 'couts' && 'Les coûts cachés'}
                   {selectedButton === 'performance' && 'La performance'}
                   {selectedButton === 'pratiques' && 'Les pratiques'}
                   {selectedButton === 'postures' && 'Les postures'}
                 </h2>
               </div>
               <div className="text-sm lg:text-lg text-sc-tertiary leading-relaxed text-center sm:text-left">
                 <p>
                   {buttonTexts[selectedButton as keyof typeof buttonTexts]}
                 </p>
               </div>
             </div>
           )}
         </div>

         {/* C-Shaped Gradient Arrow Section */}
        {/*}
        <SubsidiariteCircle
          isVisible={isVisible}
          drawingComplete={drawingComplete}
          gradientRotation={gradientRotation}
          activeHex={activeHex}
          onHexInteraction={handleHexInteraction}
          onCenterClick={() => setActiveHex(null)}
        />
        <div className="flex flex-col">
          
          <button 
            className="button text-lg lg:text-xl px-6 py-2 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
          >
            Nous contacter
          </button>
          <div className="flex flex-col">
            <h1 className="title-text text-sc-secondary text-center sm:text-left">
            La subsidiarite agit sur:
            </h1>
          </div>
          <div className="flex flex-row gap-1">
            <button 
              className="button text-xs lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
            >
              {hexContent["sub1"].title}
            </button>
            <button 
              className="button text-xs lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
            >
              {hexContent["sub2"].title}
            </button>
            <button 
              className="button text-xs lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
            >
              {hexContent["sub3"].title}
            </button>
            <button 
              className="button text-xs lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
            >
              {hexContent["sub4"].title}
            </button>
            <button 
              className="button text-xs lg:text-xl px-2 py-1 bg-sc-secondary text-sc-primary font-['Barlow_Semi_Condensed'] font-bold"
            >
              {hexContent["sub5"].title}
            </button>
          </div>
        </div>

        {/* Content Section
        <div className="flex flex-col w-full max-w-sm sm:max-w-none flex-grow content-box h-[30vh] sm:h-fit px-2 z-10">
          {/* Title on top of the box
          <div className="title-container text-center sm:text-left mb-0">
            <h2 key={`title-${activeHex || 'default'}`} className={`title-text text-sc-secondary transition-all duration-300 ${activeHex ? textAnimation : ''}`}>
              {currentContent.title}
            </h2>
          </div>
          
          <p key={`description-${activeHex || 'default'}`} className={`text-xs lg:text-xl text-sc-tertiary leading-relaxed text-center sm:text-left transition-all duration-300 ${activeHex ? textAnimation : ''}`}>
            {!activeHex ? (
              <span dangerouslySetInnerHTML={{ __html: currentContent.description }} />
            ) : (
              currentContent.description
            )}
          </p>
        </div>
        
        */}
      </div>
    </div>
  )
}

