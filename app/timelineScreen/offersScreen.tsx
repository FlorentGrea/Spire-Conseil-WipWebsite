"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";
import { getDynamicShadow } from "../../utils/dynamicShadow";

const offersData = [
  {
    title: "Réussir vos transitions managériales",
    description: "Identifiez les dysfonctionnements managériaux et leurs impacts financiers pour optimiser vos pratiques.",
    useCase: "Une entreprise du secteur médico-social avec un taux d'absentéisme élevé (60% lié aux dysfonctionnements managériaux) a pu réduire ses coûts de 45% grâce à notre intervention.",
    method: "Audit des 6 familles de dysfonctionnement + analyse des indicateurs + mesure financière + préconisations d'actions.",
    image: "audit.jpg"
  },
  {
    title: "Révélez les gains cachés du management",
    description: "Développez les compétences managériales de vos équipes avec une approche basée sur la subsidiarité.",
    useCase: "Une entreprise digitale française de 160 salariés a retrouvé son agilité initiale en formant ses managers à l'approche subsidiaire, responsabilisant chaque collaborateur.",
    method: "Diagnostic des leviers + formation en alternance + application digitale + mesure du ROI + accompagnement in situ.",
    image: "savings.jpg"
  },
  {
    title: "Formation et mise en action de vos managers pour un ROI immédiat",
    description: "Accompagnez les transitions organisationnelles et les transmissions d'entreprise avec une approche structurée.",
    useCase: "Un fondateur du secteur du bâtiment a pu transmettre son entreprise à ses salariés grâce à un audit stratégique et un accompagnement complet de la transition.",
    method: "Audit stratégique + mobilisation des parties prenantes + formation-action + accompagnement sur mesure + mesure d'impact.",
    image: "coaching.jpg"
  },
  {
    title: "Pilotez le management dans la durée grâce à OLI",
    description: "Mettez en place des outils adaptés pour assurer le suivi et la pérennisation de vos transformations.",
    useCase: "Une entreprise agricole en croissance a structuré ses organes de gouvernance et mis en place un CODIR avec un référentiel managérial partagé.",
    method: "Création d'outils sur mesure + formation aux outils + suivi régulier + ajustements + capitalisation des bonnes pratiques.",
    image: "Application.jpg"
  }
];

function Hexagon({ image }: { image: string }) {
  return (
    <div className="relative aspect-square w-32 md:w-40 lg:w-64" style={{ minWidth: '0', minHeight: '0' }}>
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
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#012073" />
          </linearGradient>
        </defs>
        
        {/* Hexagon-shaped image background */}
        <image
          href={`/${image}`}
          x="-60"
          y="-60"
          width="120"
          height="120"
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
        />

        {/* Right side of hexagon with gradient */}
        <polyline
          points="0,-55 47,-27.5 47,27.5 0,55" 
          fill="none"
          stroke="url(#hexagonGradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function OffersScreen() {
  return (
    <div className="h-fit snap-start" data-screen="offers">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-screen p-8 relative">
        {/* Connecting polylines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="polylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#012073" />
            </linearGradient>
          </defs>
          
          {/* First polyline - Column 1 */}
          <polyline
            points="50,30 20,30 20,70"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Second polyline - Column 2 */}
          <polyline
            points="50,30 80,30 80,70"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        
        {offersData.map((offer, index) => (
          <div 
            key={index}
            className="flex flex-col items-center justify-center"
            data-screen={`offers${index}`}
          >
            {/* Hexagon Section */}
            <Hexagon image={offer.image} />
            {/* Title */}
            <h2 className="text-md md:text-xl lg:text-2xl font-bold text-[#012073] text-center leading-tight">
              {offer.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
