"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Description from "./Description";
import CasUsage from "./CasUsage";
import Method from "./Method";

const offersData = [
  {
    title: "Révélez les gains cachés du management",
    description: "Développez les compétences managériales de vos équipes avec une approche basée sur la subsidiarité.",
    useCase: "Une entreprise digitale française de 160 salariés a retrouvé son agilité initiale en formant ses managers à l'approche subsidiaire, responsabilisant chaque collaborateur.",
    method: "Diagnostic des leviers + formation en alternance + application digitale + mesure du ROI + accompagnement in situ.",
    image: "/auditNEW.jpg"
  },
  {
    title: "Formation et mise en action de vos managers pour un ROI immédiat",
    description: "Accompagnez les transitions organisationnelles et les transmissions d'entreprise avec une approche structurée.",
    useCase: "Un fondateur du secteur du bâtiment a pu transmettre son entreprise à ses salariés grâce à un audit stratégique et un accompagnement complet de la transition.",
    method: "Audit stratégique + mobilisation des parties prenantes + formation-action + accompagnement sur mesure + mesure d'impact.",
    image: "/coachingNEW.jpg"
  },
  {
    title: "Pilotez le management dans la durée grâce à OLI",
    description: "Mettez en place des outils adaptés pour assurer le suivi et la pérennisation de vos transformations.",
    useCase: "Une entreprise agricole en croissance a structuré ses organes de gouvernance et mis en place un CODIR avec un référentiel managérial partagé.",
    method: "Création d'outils sur mesure + formation aux outils + suivi régulier + ajustements + capitalisation des bonnes pratiques.",
    image: "/applicationNEW.jpg"
  }
];

export default function OffersScreen({ lineRightPosition }: { lineRightPosition?: number | null }) {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState({ isSm: false, isLg: false, width: 0 });
  const [titleMarginLeft, setTitleMarginLeft] = useState<string>('auto');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isSm: width >= 640,
        isLg: width >= 1024,
        width
      });
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate title position based on vertical line
  useEffect(() => {
    const calculateTitlePosition = () => {
      if (window.innerWidth < 640) return; // Only for sm screens and up
      
      // Find the vertical line in homeScreen
      const homeScreen = document.querySelector('[data-screen="home"]');
      if (homeScreen) {
        const lineElement = homeScreen.querySelector('[data-screen="vertical-line"]');
        if (lineElement) {
          const lineRect = lineElement.getBoundingClientRect();
          const lineRightEdge = lineRect.right;
          
          // Calculate the distance from left edge of screen to start of screen-content
          const screenContent = document.querySelector('[data-screen="offers"] .screen-content');
          let screenContentLeftOffset = 0;
          if (screenContent) {
            const screenContentRect = screenContent.getBoundingClientRect();
            screenContentLeftOffset = screenContentRect.left;
          }
          
          const adjustedPosition = lineRightEdge - screenContentLeftOffset;
          setTitleMarginLeft(`${adjustedPosition}px`);
        }
      }
    };

    // Calculate on mount and resize
    calculateTitlePosition();
    window.addEventListener('resize', calculateTitlePosition);
    return () => window.removeEventListener('resize', calculateTitlePosition);
  }, []);

  // Calculate the left offset accounting for container constraints
  const calculateLeftOffset = () => {
    if (!lineRightPosition || !screenSize.isSm) return {};
    
    let offset = lineRightPosition;
    
    // Account for max-w-6xl centering (1152px = 72rem)
    const maxContainerWidth = 1152;
    const availableWidth = screenSize.width;
    
    if (availableWidth > maxContainerWidth) {
      // Container is centered, calculate offset from container left edge
      const containerLeftEdge = (availableWidth - maxContainerWidth) / 2;
      offset -= containerLeftEdge;
    }
    
    return { left: `${offset}px` };
  };

  return (
    <div className="screen-container bg-sc-tertiary/8" data-screen="offers">
      <div className="screen-content flex-col p-8" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
        <div 
          className="title-container w-full max-w-sm sm:max-w-[50vw]  sm:self-start"
          style={{
            marginLeft: screenSize.isSm ? titleMarginLeft : 'auto'
          }}
        >
          <h1 className="title-text text-sc-secondary">
            Trois étapes pour une transition managériale complète
          </h1>
        </div>
        <div className="flex-grow grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1  max-w-sm sm:max-w-none h-[70vh] sm:h-[45vh] gap-2 z-10 relative">
          {/* Blue connecting line */}
          <div className="absolute top-1/6 sm:top-1/2 left-1/2 sm:left-1/6 w-3 sm:w-auto h-auto sm:h-3 md:h-4 lg:h-5 sm:right-1/6 bottom-1/6 sm:bottom-auto" style={{ backgroundColor: 'var(--color-sc-secondary)' }}></div>
          
          {offersData.map((offer, index) => (
            <div 
              key={index}
              className="w-full h-full"
              data-screen={`offers${index}`}
            >
              <div 
                 className="button relative w-full h-full shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                 style={{ backgroundColor: 'var(--color-sc-primary)' }}
                 onClick={() => setSelectedOffer(index)}
              >
                <Image src={offer.image} alt={offer.title} fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <div className="flex justify-center items-end h-full p-2 lg:p-4 z-20">
                  <h1 className="text-sm md:xl lg:text-2xl font-bold mb-2 text-white z-10 text-center sm:text-left">
                    {offer.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedOffer !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedOffer(null)}
        >
          <div 
            className="shadow-xl w-[90vw] h-[90vh] max-w-6xl relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-sc-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="relative flex flex-col h-[20vh]">
              <Image src={offersData[selectedOffer].image} alt={offersData[selectedOffer].title} fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
              <div className="flex justify-center items-end h-full p-2 z-20">
                <h1 className="text-base lg:text-2xl font-bold mb-1 text-white z-20">
                  {offersData[selectedOffer].title}
                </h1>
              </div>
              <button 
                className="button absolute top-4 right-4 text-xl text-sc-primary z-30 px-2 py-1"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                onClick={() => setSelectedOffer(null)}
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex flex-col h-full p-4">
              {/* Tabs for small/medium screens */}
              <Tabs defaultValue="description" className="flex flex-col justify-center items-center w-full lg:hidden" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
                <TabsList className="flex flex-row justify-center items-center w-full gap-1" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
                  <TabsTrigger 
                    value="description" 
                    className="button text-base rounded-none px-4 py-2 text-sc-primary font-['Barlow_Semi_Condensed'] font-bold data-[state=active]:transform-none data-[state=active]:shadow-none"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="useCase" 
                    className="button text-base rounded-none px-4 py-2 text-sc-primary font-['Barlow_Semi_Condensed'] font-bold data-[state=active]:transform-none data-[state=active]:shadow-none"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                  >
                    Cas d'usage
                  </TabsTrigger>
                  <TabsTrigger 
                    value="method" 
                    className="button text-base rounded-none px-4 py-2 text-sc-primary font-['Barlow_Semi_Condensed'] font-bold data-[state=active]:transform-none data-[state=active]:shadow-none"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                  >
                    Méthode
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="text-sc-tertiary leading-relaxed">
                  {offersData[selectedOffer].description}
                </TabsContent>
                <TabsContent value="useCase" className="text-sc-tertiary leading-relaxed">
                  {offersData[selectedOffer].useCase}
                </TabsContent>
                <TabsContent value="method" className="text-sc-tertiary leading-relaxed w-full overflow-y-auto">
                  <div className="flex flex-col justify-center space-y-2">
                    {/* Method Step 1 */}
                    <div className="flex flex-row items-center relative">
                      <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-sm">01</span>
                      </div>
                      <p className="text-sm md:text-base font-bold">Audit de 6 familles de dysfonctionnements</p>
                    </div>
                    
                    {/* Small text for Step 1 */}
                    <div className="flex gap-4">
                      <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                      <div className="flex-1">
                        <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
                          <li>• Condition de travail</li>
                          <li>• Organisation du travail</li>
                          <li>• Gestion du temps</li>
                          <li>• Communication, coordination, coopération</li>
                          <li>• Formation intégrée</li>
                          <li>• Mise en œuvre stratégique</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Method Step 2 */}
                    <div className="flex flex-row items-center relative">
                      <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-sm">02</span>
                      </div>
                      <p className="text-center text-sm md:text-base font-bold">Analyse des indicateurs</p>
                    </div>
                    
                    {/* Small text for Step 2 */}
                    <div className="flex gap-4">
                      <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                      <div className="flex-1">
                        <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
                          <li>• Absentéisme</li>
                          <li>• Accidents du travail</li>
                          <li>• Rotation du personnel</li>
                          <li>• Défauts de qualité</li>
                          <li>• Écarts de productivité directe</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Method Step 3 */}
                    <div className="flex flex-row items-center relative">
                      <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-sm">03</span>
                      </div>
                      <p className="text-center text-sm md:text-base font-bold">Analyse des impacts</p>
                    </div>
                    
                    {/* Small text for Step 3 */}
                    <div className="flex gap-4">
                      <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                      <div className="flex-1">
                        <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
                          <li>• Sursalaires</li>
                          <li>• Surtemps</li>
                          <li>• Surconsommation</li>
                          <li>• Non-production</li>
                          <li>• Non-création de potentiels</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Method Step 4 */}
                    <div className="flex flex-row items-center relative">
                      <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-sm">04</span>
                      </div>
                      <p className="text-center text-sm md:text-base font-bold">Mesure financière et extra-financière</p>
                    </div>
                    
                    {/* Small text for Step 4 */}
                    <div className="flex gap-4">
                      <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                      <div className="flex-1">
                        <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
                          <li>• Prix et coût unitaires des composants de régulation</li>
                          <li>• Effet extra-financiers: sens au travail, relation clients, marque employeur, relation partenaires...</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Method Step 5 */}
                    <div className="flex flex-row items-center relative">
                      <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-sm">05</span>
                      </div>
                      <p className="text-center text-sm md:text-base font-bold">Leviers managériaux</p>
                    </div>
                    
                    {/* Small text for Step 5 */}
                    <div className="flex gap-4 ml-12">
                      <div className="flex-1">
                        <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
                          <li>• Plan d'action managérial pour agir sur la cause des coûts cachés</li>
                          <li>• Mise en œuvre d'un management subsidiaire au bénéfice de la compression des coûts cachés</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* All content for large screens */}
              <div className="hidden lg:flex flex-col w-full space-y-6 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-sc-secondary scrollbar-track-transparent hover:scrollbar-thumb-sc-secondary/80 pr-2 relative">
                <Description description={offersData[selectedOffer].description} />
                
                <div className="w-full h-0.5" style={{ backgroundColor: 'var(--color-sc-secondary)' }}></div>
                
                <CasUsage useCase={offersData[selectedOffer].useCase} />
                
                <div className="w-full h-0.5" style={{ backgroundColor: 'var(--color-sc-secondary)' }}></div>
                
                <Method />
              </div>
              

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
