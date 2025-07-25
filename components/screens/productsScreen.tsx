"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
    {
        keyWord: "Parcours",
        title: "Vos transitions dans toutes ses dimensions managériales",
        description: "Pour accompagner la croissance ou permettre le maintien de l’activité nous structurons ou créons avec vous les organes de gouvernances, les modes de coopération et les relations.",
        useCase: "Dans le secteur de l’agriculture, une entreprise a grandi en fonction de l’activité et de ses performances. Il est devenu indispensable de repenser les organes de gouvernance, de mettre en place un CODIR, d’avoir un référentiel commun des attendus du management et de faire monter les cadres en compétence managériale.",
        method: ["Audit stratégique et managérial avec leurs livrables", "Mobilisation des personnes et des instances", "Formation-action des managers", "Accompagnement in situ dans le temps", "Mesure d’impact de l’ensemble de l’intervention", "Valorisation de la transformation auprès de l’ensemble des parties prenantes"],
    },
    {
        keyWord: "Viser",
        title: "Audit: Révéler les gains gâchés du management",
        description: "Pour augmenter vos gains, identifiez et limitez vos dysfonctionnements managériaux : réunions trop nombreuses ou inefficaces ; aller-retour dans la chaine décisionnelle ; des managers occupés par des tâches dévolues à leur N-1 ; des défaillances dans les relations entre collaborateurs et inter-services… Gagnez en sérénité et efficacité !",
        useCase: "Dans le secteur médico-social, le directeur nous a demandé d’identifier les causes d’un taux d’absentéisme très élevé. Résultat, 60% de ses causes sont lié à des dysfonctionnements managériaux absentéisme, gestion des horaires relations au sein des équipes et manque de compétences sur l’utilisation du matériel. Lorsque le management n’est pas adapté, manque de soutien ressenti par les équipes de terrain, manque de présence des cadres auprès des salariés, absence d’orientation claire. Sur un total de coût de 278.000€, nous avons pu compresser 45%.",
        method: ["Audit des 6 familles de dysfonctionnement managérial", "Analyse des indicateurs", "Analyse des impacts", "Mesure financière et extra financière", "Préconisations et premières actions"],
    },
    {
        keyWord: "Ancrer",
        title: "Formation: Former et Accompagner vos managers",
        description: "Pour des managers sereins et motivants, co-élaboration d’un référentiel managérial ; Une formation fondée sur les 5 fonctions du management : la posture du manager ; l’animation de l’équipes, le pilotage de l’activité ; la relation aux collaborateurs et aux collègues ; la cohérence avec les valeurs et objectifs de l’entreprise. Une approche unique : la subsidiairité qui consiste à donner une capacité d’agir aux collaborateurs en favorisant leur responsabilisation, l’autonomie et leur prise de décision.",
        useCase: "Dans le secteur des assurances, suite à une réorganisation, des collaborateurs sont devenus managers de leurs anciens collègues, certains découvraient le management et la direction générale voulait que chaque collaborateur gagne en autonomie et en responsabilité. Nous avons été sollicités pour former les managers de proximité jusqu’aux membres du CODIR.",
        method: ["Diagnostique pour évaluer les leviers de transformation", "Engager les participants", "Adapter la formation", "Formation en alternance avec des temps de mise en œuvre in situ", "Une application digitale pour assurer la mise en œuvre des apprentissages dans le temps, apporter des ressources, soutenir les objectifs des managers pour la croissance des collaborateurs"],
    },
    {
        keyWord: "Mesurer",
        title: "Mesure: Maitriser BENEFICES FINANCIERS ET EXTRA FINANCIERS | Mesure du ROI des formations des managers OLI | Mesure de la compression des coûts cachés du management et des bénéfices pour l’entreprise.",
        description: "Nous accompagnons les managers dans le temps par un mentor digital dédié à chaque manager et lui permettant au quotidien de trouver des conseils innovants grâce à l'IA, d'avoir des ressources à portée de main et de mettre en oeuvre des plans d'action pour leur progression, celle de leur équipe et de leurs collaborateurs. Chaque manager est rendu capable de mesurer les bénéfices de nouvelles pratiques managériales. SPIRE est capable de vous fournir dans le temps une mesure de la compression des coûts cachés du management et des gains financiers et extra-financiers obtenus.",
        useCase: "Dans une entreprise du secteur agricole, l'ensemble des managers a été formé aux principes du management par la subsidiarité. En parallèle, chaque manager a utilisé OLI pour construire des plans d'actions. Les managers ont pu évaluer régulièrement la mesure de progression des pratiques managériales au sein de leur équipe. Les bénéfices constaté ont pu nous permettre d'établir une mesure du ROI objectivée de la formation pour l'entreprise.",
        method: ["Formation des managers à la subsidiarité", "Déploiement de l'application mentor OLI", "Construction guidée par l'IA de plans d'actions", "Mesure continue des bénéfices des pratiques managériales au niveau de chaque manager", "Restitution et valorisation des bénéfices financiers et extra-financiers à partir de 6 familles de dysfonctionnements à 3 mois / 6 mois / 1 an"],
    },
]

export default function ProductsScreen() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is on the backdrop (the outer div with bg-black/80)
      if (target.classList.contains('popup-backdrop')) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div 
        className="screen-container"
        style={{
            backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)',
        }}
        data-screen="products"
    >
        <div className="screen-content flex flex-col gap-4">
            <div className="relative px-4 lg:px-6 py-2 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}}>
                <div className="absolute top-0 left-0 w-full h-30 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}} />
                <h1 className="relative title-text text-center z-20" style={{ color: 'var(--color-sc-primary)'}}>
                    Un parcours complet en <br className="block sm:hidden" />trois étapes
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-4 w-full gap-2 sm:gap-4 max-h-[600px] z-20 auto-rows-min">
                <button 
                    className="button button-secondary col-start-1 sm:col-end-4 row-start-1 text-lg lg:text-xl h-30 sm:h-30 lg:h-35 px-4 lg:px-6 py-2 relative overflow-hidden"
                    onClick={() => {
                        setSelectedButton("Parcours");
                        setShowPopup(true);
                    }}
                 >
                    <div 
                        className="absolute top-0 left-0 w-full h-full z-20" 
                        style={{
                        backgroundColor: 'color-mix(in srgb, black 40%, transparent)',
                        }}
                     />
                    <Image
                        src="/parcours.jpg"
                        alt="Parcours"
                        fill
                        className="object-cover z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30 p-2">
                        <h1 className="text-white text-center text-2xl"
                            style={{
                                color: 'var(--color-sc-primary)'
                            }}
                        >
                            Vos transitions dans toutes ses dimensions managériales
                        </h1>
                    </div>
                </button>
                <div 
                    className="row-start-1 row-end-3 sm:row-end-4 col-start-1 w-4 sm:w-10 h-[50%] sm:h-[90%] ml-[2%] my-auto sm:m-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <div 
                    className="row-start-2 sm:row-start-1 row-end-4 sm:row-end-4 col-start-1 sm:col-start-2 w-4 sm:w-10 h-[50%] sm:h-[90%] ml-auto mr-[2%] my-auto sm:m-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <div 
                    className="row-start-3 sm:row-start-1 row-end-5 sm:row-end-4 col-start-1 sm:col-start-3 w-4 sm:w-10 h-[50%] sm:h-[90%] ml-[2%] my-auto sm:m-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <div 
                    className="block sm:hidden row-start-2 col-start-1 h-4 w-[96%] ml-[2%] my-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <div 
                    className="block sm:hidden row-start-3 col-start-1 h-4 w-[96%] ml-auto mr-[2%] my-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <div 
                    className="block sm:hidden row-start-4 col-start-1 h-4 w-[96%] ml-[2%] my-auto"
                    style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                />
                <button 
                    className="button button-secondary col-start-1 row-start-2 sm:row-end-5 w-[90%] sm:w-full ml-auto text-lg lg:text-xl px-4 lg:px-6 py-2 relative overflow-hidden"
                    onClick={() => {
                        setSelectedButton("Viser");
                        setShowPopup(true);
                    }}
                >
                    <div 
                        className="absolute top-0 left-0 w-full h-full z-20" 
                        style={{
                        backgroundColor: 'color-mix(in srgb, black 40%, transparent)'
                        }}
                    />
                    <Image
                        src="/audit.jpg"
                        alt="Audit"
                        fill
                        className="object-cover z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
                        <h1 className="text-white text-center text-2xl"
                            style={{
                                color: 'var(--color-sc-primary)'
                            }}
                        >
                            VISER
                        </h1>                        
                    </div>
                </button>
                <button 
                    className="button button-secondary col-start-1 sm:col-start-2 row-start-3 sm:row-start-2 sm:row-end-5 w-[90%] sm:w-full text-lg lg:text-xl px-4 lg:px-6 py-2 relative overflow-hidden"
                    onClick={() => {
                        setSelectedButton("Ancrer");
                        setShowPopup(true);
                    }}
                >
                    <div 
                        className="absolute top-0 left-0 w-full h-full z-20" 
                        style={{
                        backgroundColor: 'color-mix(in srgb, black 40%, transparent)'
                        }}
                    />
                    <Image
                        src="/coaching.jpg"
                        alt="Coaching"
                        fill
                        className="object-cover z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
                        <h1 className="text-white text-center text-2xl"
                            style={{
                                color: 'var(--color-sc-primary)'
                            }}
                        >
                            ANCRER
                        </h1>                        
                    </div>
                </button>
                <button 
                    className="button button-secondary col-start-1 sm:col-start-3 row-start-4 sm:row-start-2 sm:row-end-5 w-[90%] sm:w-full ml-auto text-lg lg:text-xl px-4 lg:px-6 py-2 relative overflow-hidden"
                    onClick={() => {
                        setSelectedButton("Mesurer");
                        setShowPopup(true);
                    }}
                >
                    <div 
                        className="absolute top-0 left-0 w-full h-full z-20" 
                        style={{
                        backgroundColor: 'color-mix(in srgb, black 40%, transparent)'
                        }}
                    />
                    <Image
                        src="/application.jpg"
                        alt="Application"
                        fill
                        className="object-cover z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
                        <h1 className="text-white text-center text-2xl"
                            style={{
                                color: 'var(--color-sc-primary)'
                            }}
                        >
                            MESURER
                        </h1>                        
                    </div>
                </button>
              </div>
        </div>

        {/* Popup */}
        {showPopup && (
            <motion.div 
                className="fixed h-screen inset-0 bg-black/80 flex items-center justify-center z-50 p-4 popup-container popup-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className="w-[90%] relative flex flex-col shadow-xl max-w-[900px] h-[90vh] max-h-[900px] overflow-y-auto"
                    style={{ backgroundColor: 'var(--color-sc-primary)' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                >
                    <div className="relative flex flex-col w-full h-30 sm:h-30 lg:h-35">
                        <div className="absolute top-0 left-0 w-full h-full z-20" 
                            style={{
                                backgroundColor: 'color-mix(in srgb, black 40%, transparent)'
                            }}
                        />
                        <Image
                            src="/parcours.jpg"
                            alt="Parcours"
                            fill
                            className="absolute top-0 left-0 w-full h-full object-cover z-10"
                        />  
                        {/* Close button */}
                        <button
                            className="button button-secondary absolute top-4 right-4 text-gray-500 rounded-sm z-30"
                            onClick={() => setShowPopup(false)}
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                style={{
                                    color: 'var(--color-sc-primary)'
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="absolute bottom-0 left-0 w-full p-2 z-30">
                            <h1 className="text-center text-2xl" style={{ color: 'var(--color-sc-primary)' }}>
                                {products.find(item => item.keyWord === selectedButton)?.title}
                            </h1>
                        </div>
                    </div>


                    {/* Popup content */}
                    <div className="p-6">
                        {/* Tabs for small/medium screens */}
                        <Tabs defaultValue="description" className="flex flex-col justify-center items-center w-full lg:hidden" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
                            <TabsList className="flex flex-row justify-center items-center w-full gap-1" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
                                <TabsTrigger 
                                    value="description" 
                                    className="button button-secondary text-base rounded-none px-4 py-2 font-['Barlow_Semi_Condensed'] font-bold"
                                >
                                    Description
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="method" 
                                    className="button button-secondary text-base rounded-none px-4 py-2 font-['Barlow_Semi_Condensed'] font-bold"
                                >
                                    Méthode
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="description" className="text-sc-tertiary leading-relaxed">
                                {products.find(item => item.keyWord === selectedButton)?.description}
                                {products.find(item => item.keyWord === selectedButton)?.useCase}
                            </TabsContent>

                            <TabsContent value="method" className="text-sc-tertiary leading-relaxed w-full overflow-y-auto">
                                <div className="flex flex-col justify-center space-y-2">
                                    {products.find(item => item.keyWord === selectedButton)?.method.map((step, index) => (
                                        <div key={index}>
                                            <div className="flex flex-row items-center relative">
                                                <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                                                    <span className="text-white font-bold text-sm">
                                                        {(index + 1).toString().padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <p className="text-sm md:text-base font-bold">{step}</p>
                                            </div>
                                            {index < (products.find(item => item.keyWord === selectedButton)?.method.length || 0) - 1 && (
                                                <div className="flex gap-4">
                                                    <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                        
                        {/* All content for large screens */}
                        <div className="hidden lg:flex flex-col w-full space-y-6 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-sc-secondary scrollbar-track-transparent hover:scrollbar-thumb-sc-secondary/80 pr-2 relative">
                            <div>
                                <p style={{ color: 'var(--color-sc-tertiary)' }}>
                                    {products.find(item => item.keyWord === selectedButton)?.description}
                                </p>
                            </div>
                            
                            <div className="w-full h-0.5" style={{ backgroundColor: 'var(--color-sc-secondary)' }}></div>
                            
                            <div>
                                <p style={{ color: 'var(--color-sc-tertiary)' }}>
                                    {products.find(item => item.keyWord === selectedButton)?.useCase}
                                </p>
                            </div>
                            
                            <div className="w-full h-0.5" style={{ backgroundColor: 'var(--color-sc-secondary)' }}></div>
                            
                            <div className="flex flex-col justify-center space-y-2">
                                {products.find(item => item.keyWord === selectedButton)?.method.map((step, index) => (
                                    <div key={index}>
                                        <div className="flex flex-row items-center relative">
                                            <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
                                                <span className="text-white font-bold text-sm">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <p className="text-sm md:text-base font-bold">{step}</p>
                                        </div>
                                        {index < (products.find(item => item.keyWord === selectedButton)?.method.length || 0) - 1 && (
                                            <div className="flex gap-4">
                                                <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </div>
  );
}