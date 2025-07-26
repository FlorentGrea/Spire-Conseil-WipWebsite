"use client";

import { useState, useEffect, useRef } from "react";
import SubsidiariteCircle from "../SubsidiariteCircle";
import Image from "next/image";

interface MethodButton {
  id: string;
  title: string;
  description: string;
}

const methodButtons: MethodButton[] = [
  {
    id: "management",
    title: "MANAGEMENT",
    description: "Mise en place d'un référentiel et d'une culture managériale fondée sur les 5 fonctions du manager et les 10 critères liés à la subsidiarité."
  },
  {
    id: "soutien",
    title: "SOUTIEN",
    description: "Les managers subsidiaires sont en soutiens des collaborateurs pour les faire monter en compétences et leur permettre d'assumer leurs responsabilités. Il est disponible, apporte un cadre et les ressources nécessaires."
  },
  {
    id: "autonomie",
    title: "AUTONOMIE",
    description: "Elle se distingue de l'indépendance car elle tient compte des interactions et contraintes de son écosystème. Elle consiste à donner une grande latitude dans l'organisation et l'initiative concernant l'activité."
  },
  {
    id: "benefices",
    title: "BÉNÉFICES",
    description: "La subsidiarité agit sur les dysfonctionnements des relations managériales. Spire mesure avec précision et comprime les coûts générés par le management, le plus souvent sans qu'on en ait connaissance."
  },
  {
    id: "decisions",
    title: "DÉCISIONS",
    description: "Les décisions sont prises au juste niveau, par les personnes au plus près des enjeux. La subsidiarité augmente la responsabilisation des collaborateurs."
  },
  {
    id: "mentorat",
    title: "MENTORAT",
    description: "La subsidiarité s'applique là où le management est difficile, par un outil digital qui accompagne les managers au quotidien et permet la progression des managers et des collaborateurs."
  }
];

export default function MethodScreen() {
  const [selectedButton, setSelectedButton] = useState<string>("management"); // Start with management selected
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        setSelectedButton(prev => {
          const currentIndex = methodButtons.findIndex(b => b.id === prev);
          const nextIndex = (currentIndex + 1) % methodButtons.length;
          return methodButtons[nextIndex].id;
        });
      }, 4000); // Change every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate]);

  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
    setAutoRotate(false); // Stop auto-rotation when user clicks
  };

  return (
    <div 
        className="screen-container"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)' }}
        data-screen="method"
    >
        <div className="relative screen-content flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:items-end">
                <Image
                    src="/livre2.png"
                    alt="Method 1"
                    width={1920}
                    height={1080}
                    className="w-full h-40 sm:h-auto sm:w-[50%] object-cover sm:aspect-square"
                />
                <div className="w-[90%] sm:w-[60%] p-4 mb-4 -ml-4 gap-4 flex flex-col justify-center items-center" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h1 className=" w-full text-xl lg:text-2xl font-bold text-center sm:text-left" style={{ color: 'var(--color-sc-primary)' }}>
                        Vers la subsidiarité
                    </h1>
                    <p className="text-sm lg:text-base text-center sm:text-left" style={{ color: 'var(--color-sc-quaternary)' }}>
                        La subsidiarité consiste à déléguer des responsabilités plus que des tâches.<br />
                        Donner une forte capacité de décision & être en soutien de collaborateurs plus autonomes.<br />
                        Elle se déploie dans 6 dimensions :
                    </p>
                                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full justify-center items-center">
                         {methodButtons.map((button) => (
                             <button
                                 key={button.id}
                                 className={`button text-xs sm:text-sm lg:text-base px-2 py-1 font-bold transition-all duration-300 button-primary`}
                                 style={{
                                    color: 'var(--color-sc-secondary)',
                                    boxShadow: selectedButton === button.id ? 'none' : '0.20rem 0.20rem color-mix(in srgb, var(--color-sc-primary) 20%, transparent)',
                                    transform: selectedButton === button.id ? 'none' : 'translate(-0.20rem, -0.20rem)'
                                 }}
                                 onClick={() => handleButtonClick(button.id)}
                             >
                                 {button.title}
                             </button>
                         ))}
                     </div>
                </div>
            </div>
                         <div className="mt-4 p-4" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
                 <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--color-sc-secondary)' }}>
                     {methodButtons.find(b => b.id === selectedButton)?.title}
                 </h3>
                 <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-sc-secondary)' }}>
                     {methodButtons.find(b => b.id === selectedButton)?.description}
                 </p>
             </div>

            <div className="flex flex-col justify-center items-center gap-2 w-full">
                <h1 className="text-xl sm:text-4xl font-bold" style={{ color: 'var(--color-sc-secondary)' }}>
                    La subsidiarité en 10 critères
                </h1>
                <p className="text-sm sm:text-lg text-center" style={{ color: 'var(--color-sc-secondary)' }}>
                    En activant un critère, l’ensemble des indicateurs qui lui
                    sont associés se mettent en mouvement déclenchant une
                    dynamique vertueuse à travers des actions concrètes,
                    lesquelles sont reliées à chacun des autres critères.
                </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                <div className="w-10 lg:w-13 h-39 lg:h-60 rotate-3 border border-4" style={{ borderColor: 'var(--color-sc-secondary)' }}>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-bottom" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Autonomie</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Solidarité</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Affiliation</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Responsabilité</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Compétence</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Confiance</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Décision</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Droit à l'erreur</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Initiative</h2>
                </div>
                <div className="w-10 lg:w-13 h-40 lg:h-60 p-1 rotate-180" style={{ backgroundColor: 'var(--color-sc-secondary)' }}>
                    <h2 className="w-full text-xs sm:text-xl font-bold text-center align-middle" style={{ color: 'var(--color-sc-primary)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Supléance</h2>
                </div>

            </div>
        </div>
    </div>
  );
}
