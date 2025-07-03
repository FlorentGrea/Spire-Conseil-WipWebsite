"use client"

import React, { useState, useEffect } from "react"

export default function TimelineScreen() {
  const [isMd, setIsMd] = useState(false);
  const [selectedHex, setSelectedHex] = useState<number|null>(null);
  const hexData = [
    {
      image: "audit.jpg",
      title: "Un audit de vos équipes",
    },
    {
      image: "savings.jpg",
      title: "Une révision de vos couts managériaux",
    },
    {
      image: "coaching.jpg",
      title: "Un coaching personnalisé",
    },
    {
      image: "application.jpg",
      title: "Un suivi approfondi",
    },
  ];
  useEffect(() => {
    const checkSize = () => setIsMd(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="timeline">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
        4 offres pour un parcours complet
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 w-full max-w-7xl relative">
        {/* Connecting line (responsive) */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <filter id="hex-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="black" floodOpacity="0.5" />
            </filter>
          </defs>
          {isMd ? (
            <polyline
              points="125,250 375,750 625,250 875,750"
              fill="none"
              stroke="#012073"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#hex-shadow)"
            />
          ) : (
            <polyline
              points="250,120 750,370 250,620 750,870"
              fill="none"
              stroke="#012073"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#hex-shadow)"
            />
          )}
        </svg>
        {/* Hexagons and titles */}
        <div className="flex items-center justify-center col-start-1 row-start-1">
          <Hexagon image={hexData[0].image} onClick={() => setSelectedHex(0)} />
        </div>
        <div className="flex items-center md:items-start justify-start md:justify-center col-start-2 md:col-start-1 row-start-1 md:row-start-2 md:text-center"><h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#012073] my-2 md:my-4 max-w-xs mx-auto">{hexData[0].title}</h2></div>
        <div className="flex items-center justify-center col-start-2 md:col-start-2 row-start-2 md:row-start-2">
          <Hexagon image={hexData[1].image} onClick={() => setSelectedHex(1)} />
        </div>
        <div className="flex items-center md:items-end justify-end md:justify-center col-start-1 md:col-start-2 row-start-2 md:row-start-1 md:text-center"><h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#012073] my-2 md:my-4 max-w-xs mx-auto">{hexData[1].title}</h2></div>
        <div className="flex items-center justify-center col-start-1 md:col-start-3 row-start-3 md:row-start-1">
          <Hexagon image={hexData[2].image} onClick={() => setSelectedHex(2)} />
        </div>
        <div className="flex items-center md:items-start justify-start md:justify-center col-start-2 md:col-start-3 row-start-3 md:row-start-2 md:text-center"><h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#012073] my-2 md:my-4 max-w-xs mx-auto">{hexData[2].title}</h2></div>
        <div className="flex items-center justify-center col-start-2 md:col-start-4 row-start-4 md:row-start-2">
          <Hexagon image={hexData[3].image} onClick={() => setSelectedHex(3)} />
        </div>
        <div className="flex items-center md:items-end justify-end md:justify-center col-start-1 md:col-start-4 row-start-4 md:row-start-1 md:text-center"><h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#012073] my-2 md:my-4 max-w-xs mx-auto">{hexData[3].title}</h2></div>
      </div>
      {/* Modal Popup */}
      {selectedHex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelectedHex(null)}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <Hexagon image={hexData[selectedHex].image} />
            <h2 className="text-xl font-bold text-[#012073] mt-4 mb-2 text-center">{hexData[selectedHex].title}</h2>
            <p className="text-gray-700 text-center mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-[#012073]" onClick={() => setSelectedHex(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Hexagon({ image, onClick }: { image: string, onClick?: () => void }) {
  // Flat-topped hexagon points (horizontal orientation)
  const hexPoints = "43,25 43,-25 0,-50 -43,-25 -43,25 0,50";
  const [hover, setHover] = useState(false);
  const shadow = hover
    ? 'drop-shadow(0 8px 18px #f7e400cc)'
    : 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))';
  return (
    <svg
      width="200"
      height="200"
      viewBox="-60 -60 120 120"
      style={{ filter: shadow, cursor: 'pointer' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
