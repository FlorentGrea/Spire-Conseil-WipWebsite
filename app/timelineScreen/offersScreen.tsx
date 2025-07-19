"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

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

  // Calculate the left offset accounting for container constraints
  const calculateLeftOffset = () => {
    if (!lineRightPosition || !screenSize.isSm) return {};
    
    let offset = lineRightPosition;
    
    // Account for container padding based on screen size
    let containerPadding;
    if (screenSize.isLg) {
      containerPadding = 32; // lg:px-8 = 32px
    } else if (screenSize.isSm) {
      containerPadding = 24; // sm:px-6 = 24px
    } else {
      containerPadding = 16; // px-4 = 16px
    }
    
    offset -= containerPadding;
    
    // Account for max-w-6xl centering (1152px = 72rem)
    const maxContainerWidth = 1152;
    const totalPadding = containerPadding * 2; // padding on both sides
    const availableWidth = screenSize.width;
    
    if (availableWidth > maxContainerWidth + totalPadding) {
      // Container is centered, calculate offset from container left edge
      const containerLeftEdge = (availableWidth - maxContainerWidth) / 2;
      offset -= containerLeftEdge;
    }
    
    return { left: `${offset}px` };
  };

  return (
    <div className="flex items-center justify-center w-full h-screen snap-start" data-screen="offers">
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-12 sm:max-w-6xl px-4 sm:px-6 lg:px-8">
        <div 
          className="w-full  max-w-sm sm:w-[40vw] h-fit p-2 z-10 bg-[#012073] sm:relative sm:self-start"
          style={calculateLeftOffset()}
        >
          <h1 className="text-lg lg:text-4xl font-bold text-white text-center sm:text-left leading-tight">
            Nos offres
          </h1>
        </div>
        <div className="flex-grow grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1  max-w-sm sm:max-w-none h-[70vh] sm:h-[45vh] gap-2 z-10">
          {offersData.map((offer, index) => (
            <div 
              key={index}
              className="w-full h-full"
              data-screen={`offers${index}`}
            >
              <div 
                 className="relative w-full h-full bg-white shadow-lg overflow-hidden rounded-xl cursor-pointer hover:shadow-xl transition-shadow"
                 onClick={() => setSelectedOffer(index)}
              >
                <Image src={offer.image} alt={offer.title} fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <div className="flex justify-center items-end h-full p-2 z-20">
                  <h1 className="text-sm md:text-base lg:text-lg font-bold mb-2 text-white z-10">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedOffer(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl w-[90vw] h-[90vh] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="relative flex flex-col h-32">
              <Image src={offersData[selectedOffer].image} alt={offersData[selectedOffer].title} fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
              <div className="flex justify-center items-end h-full p-2 z-20">
                <h1 className="text-sm md:text-base lg:text-lg font-bold mb-2 text-white z-20">
                  {offersData[selectedOffer].title}
                </h1>
              </div>
              <button 
                className="absolute top-4 right-4 text-4xl text-[#012073] transition-colors z-30 rounded-full bg-black/30 p-1"
                onClick={() => setSelectedOffer(null)}
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex flex-col h-full p-4">
              <Tabs defaultValue="description" className="flex flex-col justify-center items-center w-full">
                <TabsList className="flex flex-row justify-center items-center w-full gap-1">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="useCase">Cas d'usage</TabsTrigger>
                  <TabsTrigger value="method">Méthode</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-gray-700 leading-relaxed">
                  {offersData[selectedOffer].description}
                </TabsContent>
                <TabsContent value="useCase" className="text-gray-700 leading-relaxed">
                  {offersData[selectedOffer].useCase}
                </TabsContent>
                <TabsContent value="method" className="text-gray-700 leading-relaxed">
                  {offersData[selectedOffer].method}
                </TabsContent>
              </Tabs>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
