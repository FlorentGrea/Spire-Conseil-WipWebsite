"use client"

import { useState, useEffect, useRef } from "react"
import { getDynamicShadow } from "../utils/dynamicShadow"



const textContent = [
  {
    title: "David Gréa",
    description: "Responsable d'une organisation, il a accompagné son développement de 100 à 2000 personnes par un management subsidiaire et grâce à une raison d'être partagée entre tous les acteurs. Son approche humaniste et systémique s'appuie sur la recherche des ressources positives des personnes et des contextes."
  },
  {
    title: "Marc Fassier",
    description: "Enseignant-chercheur, il est spécialiste de l'éthique des affaires et de la sociologie des organisations et fondateur de la chaire ICP-ESSEC Entreprises et bien commun. Il accompagne les grands dirigeants dans la nouvelle étape de leur responsabilité sociale et environnementale."
  }
]

export default function NotreEquipeScreen() {
  const [activeHexagon, setActiveHexagon] = useState(0)
  const [isLayoutSwapped, setIsLayoutSwapped] = useState(false)
  const [isSm, setIsSm] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [shadowTime, setShadowTime] = useState(0)
  const [isManualSelection, setIsManualSelection] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)
  const activeHexagonRef = useRef(activeHexagon)
  // Responsive hexagon size
  const [isMd, setIsMd] = useState(false);

  // Keep ref in sync with state
  useEffect(() => {
    activeHexagonRef.current = activeHexagon
  }, [activeHexagon])

  // Dynamic hexagon selection
  useEffect(() => {
    if (isManualSelection) return;

    const interval = setInterval(() => {
      setActiveHexagon(prevHex => {
        const nextHex = (prevHex + 1) % textContent.length;
        
        // Special handling for second hexagon (index 1)
        if (nextHex === 1) {
          setIsLayoutSwapped(true)
        } else {
          setIsLayoutSwapped(false)
        }
        
        return nextHex;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isManualSelection]);

  const handleHexagonClick = (index: number) => {
    if (index !== activeHexagon) {
      setActiveHexagon(index)
      setIsManualSelection(true); // Stop automatic cycling when manually clicked
      
      // Special handling for second hexagon (index 1)
      if (index === 1) {
        setIsLayoutSwapped(true)
      } else {
        setIsLayoutSwapped(false)
      }
    }
  }



  const createHexagonPath = (size: number) => {
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = size * Math.cos(angle)
      const y = size * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    return `M ${points.join(" L ")} Z`
  }

  // Set mounted state and responsive hexagon size
  useEffect(() => {
    setHasMounted(true);
    
    // Update shadow animation every frame
    const interval = setInterval(() => {
      setShadowTime(Date.now());
    }, 16); // ~60fps
    
    const checkSize = () => {
      setIsMd(window.innerWidth >= 768);
      setIsSm(window.innerWidth >= 640);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  // Responsive hexagon size for all hexagons
  const hexSize = isMd ? 100 : 60;
  const svgSize = isMd ? 220 : 160;





  return (
    <div ref={screenRef} className="screen-container" data-screen="notre-equipe">
      <div className="screen-content flex-col">
        
        <div className="relative max-w-6xl">
        {textContent.map((content, index) => (
          <div 
            key={index}
            className={`flex flex-col-reverse sm:flex-row gap-2 sm:gap-8 lg:gap-12 max-w-6xl items-center justify-center transition-all duration-300 ease-in-out ${isLayoutSwapped ? 'sm:flex-row-reverse' : ''}`}
            style={{
              position: activeHexagon === index ? "relative" : "absolute",
              top: activeHexagon === index ? "auto" : "0",
              left: activeHexagon === index ? "auto" : "0",
              right: activeHexagon === index ? "auto" : "0",
              visibility: activeHexagon === index ? "visible" : "hidden",
              zIndex: activeHexagon === index ? "auto" : "1",
              opacity: activeHexagon === index ? 1 : 0,
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
            }}
          >
            {/* Text Section */}
            <div 
              className="flex-1 max-w-sm sm:max-w-none flex flex-col items-center justify-center text-center px-2 sm:px-4"
              style={{
                transform: activeHexagon === index ? "translateX(0)" : (index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"),
                transition: "transform 0.3s ease-in-out"
              }}
            >
              {/* Title on top of the box */}
              <div className="title-container title-container-v5">
                <h2 className="title-text">
                  {content.title}
                </h2>
              </div>
              
              <div className="content-box content-box-v5 w-full">
                <div className="text-xs lg:text-xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6 text-center sm:text-left">
                  <p>
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Alveoles Section */}
            <div 
              className="flex-1 flex flex-row gap-0 sm:gap-4 sm:grid sm:grid-cols-2 sm:grid-rows-2 overflow-visible"
              style={{
                transform: activeHexagon === index ? "translateX(0)" : (index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"),
                transition: isSm ? "transform 0.3s ease-in-out" : "none"
                }}
              >              
              <div className="flex justify-end items-end col-start-1 row-start-1 -mr-4 sm:-mr-15 sm:-mb-10 lg:-mr-14 lg:-mb-4" style={{ overflow: 'visible' }}>
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
                  className="drop-shadow-lg"
                  style={{
                    overflow: 'visible',
                    filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))'
                  }}
                  onClick={() => handleHexagonClick(0)}
                >
                  <defs>
                    <clipPath id={`hex1-${index}`}>
                      <path d={createHexagonPath(hexSize)} transform="rotate(-90 0 0)" />
                    </clipPath>
                  </defs>
                  <path
                    d={createHexagonPath(hexSize)}
                    fill="#F1C40F"
                    stroke="#fff"
                    strokeWidth="3"
                    className="hover:drop-shadow-xl"
                    transform="rotate(-90 0 0)"
                    style={{
                      filter: activeHexagon === 0 ? `drop-shadow(0 6px 8px -1px ${getDynamicShadow(hasMounted, shadowTime)})` : 'drop-shadow(0 6px 8px -1px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                  <image
                    href="/leD.webp"
                    x={-hexSize}
                    y={-hexSize}
                    width={hexSize * 2}
                    height={hexSize * 2}
                    clipPath={`url(#hex1-${index})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
              </div>
              <div className="flex justify-start items-start col-start-2 row-start-2 -ml-4 sm:-ml-15 sm:-mt-10 lg:-ml-14 lg:-mt-4" style={{ overflow: 'visible' }}>
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
                  className="drop-shadow-lg"
                  style={{
                    overflow: 'visible',
                    filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))'
                  }}
                  onClick={() => handleHexagonClick(1)}
                >
                  <defs>
                    <clipPath id={`hex2-${index}`}>
                      <path d={createHexagonPath(hexSize)} transform="rotate(-90 0 0)" />
                    </clipPath>
                  </defs>
                  <path
                    d={createHexagonPath(hexSize)}
                    fill="#F1C40F"
                    stroke="#fff"
                    strokeWidth="3"
                    className="hover:drop-shadow-xl"
                    transform="rotate(-90 0 0)"
                    style={{
                      filter: activeHexagon === 1 ? `drop-shadow(0 6px 8px -1px ${getDynamicShadow(hasMounted, shadowTime)})` : 'drop-shadow(0 6px 8px -1px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                  <image
                    href="/leM.jpg"
                    x={-hexSize}
                    y={-hexSize}
                    width={hexSize * 2}
                    height={hexSize * 2}
                    clipPath={`url(#hex2-${index})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
