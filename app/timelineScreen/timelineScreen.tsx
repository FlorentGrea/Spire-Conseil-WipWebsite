"use client"

import React, { useState, useEffect } from "react"
import { useMousePosition } from "../../utils/mouseCoordinates"

export default function TimelineScreen() {
  const [isMd, setIsMd] = useState(false);
  const [selectedHex, setSelectedHex] = useState<number|null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'situation' | 'details'>('description');
  const [hasMounted, setHasMounted] = useState(false);
  const mousePosition = useMousePosition();
  const hexData = [
    {
      image: "audit.jpg",
      title: "Vos transitions dans toutes ses dimensions managériales",
      description: "Pour accompagner la croissance, lors d'un rachat ou transmission, nous structurons ou créons avec vous les organes de gouvernances, les modes de coopération et les relations.",
      casUsage: [
        "Le fondateur d'une entreprise en croissance dans le secteur du bâtiment souhaite passer la main à des salariés. Il nous a sollicité pour réaliser un état des lieux, réaliser un audit stratégique et accompagner la transition.",
        "Dans le secteur de l'agriculture, une entreprise a grandi en fonction de l'activité et de ses performances. Il est devenu indispensable de repenser les organes de gouvernance, de mettre en place un CODIR, d'avoir un référentiel commun des attendus du management et de faire monter les cadres en compétence managériale."
      ],
      methode: "Audit stratégique et managérial avec leurs livrables + Mobilisation des personnes et des instances + Formation-action des managers + Accompagnement in situ dans le temps + Mesure d'impact de l'ensemble de l'intervention + valoriser la transformation auprès de l'ensemble des parties prenantes."
    },
    {
      image: "savings.jpg",
      title: "Identifiez les gains gâchés du management",
      description: "Pour augmenter vos gains, identifiez et limitez vos dysfonctionnements managériaux : réunions trop nombreuses ou inefficaces ; aller-retour dans la chaine décisionnelle ; des managers occupés par des tâches dévolues à leur N-1 ; des défaillances dans les relations entre collaborateurs et inter-services… Gagnez en sérénité et efficacité !",
      casUsage: [
        "Dans le secteur médico-social, le directeur nous a demandé d'identifier les causes d'un taux d'absentéisme très élevé. Résultat, 60% de ses causes sont lié à des dysfonctionnements managériaux absentéisme, gestion des horaires relations au sein des équipes et manque de compétences sur l'utilisation du matériel. Lorsque le management n'est pas adapté, manque de soutien ressenti par les équipes de terrain, manque de présence des cadres auprès des salariés, absence d'orientation claire. Sur un total de coût de 278.000€, nous avons pu compresser 45%.",
        "Une entreprise du bâtiment a repéré une perte financière conséquente s'élevant à près d'un million d'euros par an. La directrice générale nous a demandé d'agir sur les relations interservices et sur le mode de management. Notre intervention au niveau du CODIR et des managers a permis une réduction rapide de 35% des pertes."
      ],
      methode: "Audit des 6 familles de dysfonctionnement managérial + analyse des indicateurs + analyse des impacts + mesure financière et extra financière + préconisations et premières actions. En dehors du coûts de l'audit, Spire se rémunère sur un pourcentage des économies réalisées."
    },
    {
      image: "coaching.jpg",
      title: "Formation et actions en situation pour vos managers, avec une mesure du ROI",
      description: "Pour des managers sereins et motivants, - Co-élaboration d'un référentiel managérial ; - Une formation fondée sur les 5 fonctions du management : la posture du manager ; l'animation de l'équipes, le pilotage de l'activité ; la relation aux collaborateurs et aux collègues ; la cohérence avec les valeurs et objectifs de l'entreprise. - Une approche unique : la subsidiairité qui consiste à donner une capacité d'agir aux collaborateurs en favorisant leur responsabilisation, l'autonomie et leur prise de décision.",
      casUsage: [
        "Dans le secteur du digital, une entreprise française a réussi à concurrencer des concurrents américains grâce à l'agilité et l'engagement des salariés. Après quelques années et avec près de 160 salariés, les process ont pris plus de places, et chacun se centre sur ses tâches. Désormais, des problèmes sont laissés de cotés sans que personne s'en sente responsable. Grâce à l'approche subsidiaire plaçant la responsabilisation au cœur du management, une nouvelle dynamique a vu le jour.",
        "Dans le secteur des assurances, suite à une réorganisation, des collaborateurs sont devenus managers de leurs anciens collègues, certains découvraient le management et la direction générale voulait que chaque collaborateur gagne en autonomie et en responsabilité. Nous avons été sollicités pour former les managers de proximité jusqu'aux membres du CODIR."
      ],
      methode: "Diagnostique pour évaluer les leviers de transformation ; engager les participants ; adapter la formation + Formation en alternance avec des temps de mise en œuvre in situ + une application digitale pour assurer la mise en œuvre des apprentissages dans le temps, apporter des ressources, soutenir les objectifs des managers pour la croissance des collaborateurs + mesurer les impacts financiers et extra financiers (livrable ROI)."
    },
    {
      image: "Application.jpg",
      title: "Des outils adaptés pour un suivi a long terme",
      description: "Lorem Ipsum",
      casUsage: ["Lorem Ipsum"],
      methode: "Lorem Ipsum"
    },
  ];
  useEffect(() => {
    const checkSize = () => setIsMd(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Set mounted state
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Function to calculate dynamic shadow for popup
  const getDynamicShadow = () => {
    if (!hasMounted || mousePosition.x === 0 && mousePosition.y === 0) return 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))';
    
    // Calculate the normalized position of the mouse in the browser window
    const xPercent = mousePosition.x / window.innerWidth - 0.5;
    const yPercent = mousePosition.y / window.innerHeight - 0.5;
    
    const moveX = xPercent * 20;
    const moveY = yPercent * 20;
    
    // Create a gradient-like effect by alternating colors
    const intensity = Math.abs(xPercent) + Math.abs(yPercent);
    const blueIntensity = Math.max(0, 1 - intensity);
    const yellowIntensity = Math.min(1, intensity);
    
    // Blend the colors based on mouse position with blue and yellow
    const blendedColor = `rgba(${Math.round(1 * blueIntensity + 255 * yellowIntensity)}, ${Math.round(32 * blueIntensity + 255 * yellowIntensity)}, ${Math.round(115 * blueIntensity + 0 * yellowIntensity)}, 0.9)`;
    
    return `drop-shadow(${moveX}px ${moveY}px 8px ${blendedColor})`;
  };

  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="timeline">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-center px-2">
        4 offres pour un parcours complet
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-2 sm:gap-4 w-full max-w-6xl xl:max-w-7xl relative h-full flex-1 min-h-0">
        {/* Connecting line (responsive) */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          {/* Simple connecting line */}
          {isMd ? (
            <polyline
              points="125,250 375,750 625,250 875,750"
              fill="none"
              stroke="#012073"
              strokeWidth="30"
              strokeLinecap="round"
            />
          ) : (
            <polyline
              points="250,120 750,370 250,620 750,870"
              fill="none"
              stroke="#012073"
              strokeWidth="30"
              strokeLinecap="round"
            />
          )}
        </svg>
        {/* Hexagons and titles */}
        <div className="flex items-center justify-center col-start-1 row-start-1 w-24 w-auto">
          <Hexagon image={hexData[0].image} onClick={() => setSelectedHex(0)} />
        </div>
        <div className="flex items-center md:items-start justify-start md:justify-center col-start-2 md:col-start-1 row-start-1 md:row-start-2 md:text-center flex-grow"><h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#012073] my-1 sm:my-2 md:my-4 max-w-xs mx-auto px-1 text-center">{hexData[0].title}</h2></div>
        <div className="flex items-center justify-center col-start-2 md:col-start-2 row-start-2 md:row-start-2 w-24 w-auto">
          <Hexagon image={hexData[1].image} onClick={() => setSelectedHex(1)} />
        </div>
        <div className="flex items-center md:items-end justify-end md:justify-center col-start-1 md:col-start-2 row-start-2 md:row-start-1 md:text-center flex-grow"><h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#012073] my-1 sm:my-2 md:my-4 max-w-xs mx-auto px-1 text-center">{hexData[1].title}</h2></div>
        <div className="flex items-center justify-center col-start-1 md:col-start-3 row-start-3 md:row-start-1 w-24 w-auto">
          <Hexagon image={hexData[2].image} onClick={() => setSelectedHex(2)} />
        </div>
        <div className="flex items-center md:items-start justify-start md:justify-center col-start-2 md:col-start-3 row-start-3 md:row-start-2 md:text-center flex-grow"><h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#012073] my-1 sm:my-2 md:my-4 max-w-xs mx-auto px-1 text-center">{hexData[2].title}</h2></div>
        <div className="flex items-center justify-center col-start-2 md:col-start-4 row-start-4 md:row-start-2 w-24 w-auto">
          <Hexagon image={hexData[3].image} onClick={() => setSelectedHex(3)} />
        </div>
        <div className="flex items-center md:items-end justify-end md:justify-center col-start-1 md:col-start-4 row-start-4 md:row-start-1 md:text-center flex-grow"><h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#012073] my-1 sm:my-2 md:my-4 max-w-xs mx-auto px-1 text-center">{hexData[3].title}</h2></div>
      </div>
      {/* Modal Popup */}
      {selectedHex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelectedHex(null)}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] h-[82%] max-w-6xl xl:max-w-7xl relative flex flex-col items-center mt-[6%]" style={{ filter: getDynamicShadow() }} onClick={e => e.stopPropagation()}>
            <div className="relative -mt-20 sm:-mt-28">
              <Hexagon image={hexData[selectedHex].image} noEffects />
            </div>
            <h2 className="text-xl font-bold text-[#012073] mt-4 mb-2 text-center">{hexData[selectedHex].title}</h2>
            
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col gap-6 w-full mt-4">
              {/* First section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#012073] mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {hexData[selectedHex].description}
                </p>
                <hr className="border-gray-300" />
              </div>
              
              {/* Second section with two columns */}
              <div className="flex flex-row gap-8">
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-semibold text-[#012073] mb-2">Cas d'usage</h3>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                    {hexData[selectedHex].casUsage.map((cas, index) => (
                      <div key={index} className="mb-3">
                        <p>{cas}</p>
                        {index < hexData[selectedHex].casUsage.length - 1 && <hr className="border-gray-200 my-2" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-semibold text-[#012073] mb-2">Méthode</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {hexData[selectedHex].methode}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="md:hidden w-full mt-4">
              <div className="flex gap-2 mb-4 justify-center">
                <button 
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors text-xs ${
                    activeTab === 'description' 
                      ? 'bg-[#012073] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors text-xs ${
                    activeTab === 'situation' 
                      ? 'bg-[#012073] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('situation')}
                >
                  Cas d'usage
                </button>
                <button 
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors text-xs ${
                    activeTab === 'details' 
                      ? 'bg-[#012073] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Méthode
                </button>
              </div>
              
              {activeTab === 'description' && (
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-[#012073] mb-2">Description</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {hexData[selectedHex].description}
                  </p>
                  <hr className="border-gray-300" />
                </div>
              )}
              
              {activeTab === 'situation' && (
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-[#012073] mb-2">Cas d'usage</h3>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                    {hexData[selectedHex].casUsage.map((cas, index) => (
                      <div key={index} className="mb-3">
                        <p>{cas}</p>
                        {index < hexData[selectedHex].casUsage.length - 1 && <hr className="border-gray-200 my-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-[#012073] mb-2">Méthode</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {hexData[selectedHex].methode}
                  </p>
                </div>
              )}
            </div>
            <button className="absolute top-4 right-8 text-4xl text-gray-400 hover:text-[#012073]" onClick={() => setSelectedHex(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Hexagon({ image, onClick, noEffects }: { image: string, onClick?: () => void, noEffects?: boolean }) {
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
  
  const shadow = noEffects ? 'none' : (hover
    ? 'drop-shadow(0 8px 18px #f7e400cc)'
    : 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))');
  
  const size = isSmall ? 120 : 200;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ filter: shadow, cursor: noEffects ? 'default' : 'pointer' }}
      onMouseEnter={noEffects ? undefined : () => setHover(true)}
      onMouseLeave={noEffects ? undefined : () => setHover(false)}
      onClick={onClick}
    >
      <defs>
        <clipPath id={image.replace(/\W/g, "") + "-clip"}>
          <polygon points={hexPoints} />
        </clipPath>
      </defs>
      <polygon points={hexPoints} fill="#012073" stroke="#012073" strokeWidth="4" />
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
