'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Hexagon from "../svgs/hexagone";

interface TeamMember {
  title: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
      {
        title: "David Gréa",
        image: "/david.jpg",
        description: "Responsable d'une organisation, il a accompagné son développement de 100 à 2000 personnes par un management subsidiaire et grâce à une raison d'être partagée entre tous les acteurs. Son approche humaniste et systémique s'appuie sur la recherche des ressources positives des personnes et des contextes."
      },
      {
        title: "Marc Fassier",
        image: "/marc.jpg",
        description: "Enseignant-chercheur, il est spécialiste de l'éthique des affaires et de la sociologie des organisations et fondateur de la chaire ICP-ESSEC Entreprises et bien commun. Il accompagne les dirigeants dans la nouvelle étape de leur responsabilité sociale et environnementale."
      }
    ]

export default function TeamScreen() {
  const [selectedMember, setSelectedMember] = useState<number>(0); // Start with David selected
  const [autoRotate, setAutoRotate] = useState<boolean>(true); // Control auto-rotation
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        setSelectedMember((prev) => (prev === 0 ? 1 : 0));
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate]);

  // Handle manual selection
  const handleMemberClick = (index: number) => {
    setSelectedMember(index);
    setAutoRotate(false); // Stop auto-rotation when user clicks
  };

  return (
    <div 
        className="screen-container"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)' }}
        data-screen="team"
    >
        <div className="screen-content flex flex-col gap-4">
            <div className="relative px-4 lg:px-6 py-2 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}}>
                <h1 className="title-text" style={{ color: 'var(--color-sc-primary)'}}>
                    Les Fondateurs
                </h1>
            </div>
            
            {/* Team members with clickable hexagons */}
            <div className="flex flex-row justify-between w-full px-4 lg:px-6 py-2 z-20">
                <div className="flex flex-col items-center w-[30%] sm:w-[20%] gap-4">
                    <button
                        onClick={() => handleMemberClick(0)}
                        className="relative w-full transition-transform duration-300 ease-in-out focus:outline-none sm:translate-x-0"
                        style={{
                            transform: selectedMember === 0 ? 'scale(1.8) translateX(10px)' : 'scale(1)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d',
                        }}
                        onMouseEnter={(e) => {
                            const isSmOrLarger = window.innerWidth >= 640; // sm breakpoint
                            const translateX = isSmOrLarger ? '20px' : '10px';
                            e.currentTarget.style.transform = selectedMember === 0 ? `scale(1.85) translateX(${translateX})` : 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            const isSmOrLarger = window.innerWidth >= 640; // sm breakpoint
                            const translateX = isSmOrLarger ? '20px' : '10px';
                            e.currentTarget.style.transform = selectedMember === 0 ? `scale(1.8) translateX(${translateX})` : 'scale(1)';
                        }}
                    >
                        <Hexagon 
                            className="size-full" 
                            style={{ color: 'var(--color-sc-secondary)'}}
                            imageSrc="/david.webp"
                            imageAlt="David Gréa"
                        />
                        <div 
                            className="absolute bottom-0 -right-2 px-3 sm:px-4 lg:px-6 py-1 text-center" 
                            style={{ backgroundColor: 'var(--color-sc-secondary)'}}
                        >
                            <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold" style={{ color: 'var(--color-sc-primary)'}}>
                                David Gréa
                            </h1>
                        </div>
                    </button>
                </div>
                
                <div className="flex flex-col items-center w-[30%] sm:w-[20%] gap-4">
                    <button
                        onClick={() => handleMemberClick(1)}
                        className="relative w-full transition-transform duration-300 ease-in-out focus:outline-none sm:translate-x-0"
                        style={{
                            transform: selectedMember === 1 ? 'scale(1.8) translateX(-10px)' : 'scale(1)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d',
                        }}
                        onMouseEnter={(e) => {
                            const isSmOrLarger = window.innerWidth >= 640; // sm breakpoint
                            const translateX = isSmOrLarger ? '-20px' : '-10px';
                            e.currentTarget.style.transform = selectedMember === 1 ? `scale(1.85) translateX(${translateX})` : 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            const isSmOrLarger = window.innerWidth >= 640; // sm breakpoint
                            const translateX = isSmOrLarger ? '-20px' : '-10px';
                            e.currentTarget.style.transform = selectedMember === 1 ? `scale(1.8) translateX(${translateX})` : 'scale(1)';
                        }}
                    >
                        <Hexagon 
                            className="size-full" 
                            style={{ color: 'var(--color-sc-secondary)'}}
                            imageSrc="/marc.jpg"
                            imageAlt="Marc Fassier"
                        />
                        <div 
                            className="absolute bottom-0 -left-2 px-3 sm:px-4 lg:px-6 py-1 text-center" 
                            style={{ backgroundColor: 'var(--color-sc-secondary)'}}
                        >
                            <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold" style={{ color: 'var(--color-sc-primary)'}}>
                                Marc Fassier
                            </h1>
                        </div>
                    </button>
                </div>
            </div>
            
            {/* Selected member description */}
            <motion.div 
                className="w-full p-4 lg:p-6 mt-8 md:mt-10 lg:mt-12"
                style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-sm md:text-base" style={{ color: 'var(--color-sc-quaternary)' }}>
                    {teamMembers[selectedMember].description}
                </p>
            </motion.div>
        </div>
    </div>
  );
}
