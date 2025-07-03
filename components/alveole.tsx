"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AlveoleData {
  id: string
  title: string
  description: string
  color: string
  textColor: string
}

const alveoles: AlveoleData[] = [
  {
    id: "coaching",
    title: "COACHING",
    description: "Accompagnement personnalisé pour développer les compétences",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "formation",
    title: "FORMATION",
    description: "Programmes de formation adaptés aux besoins",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "mentorat",
    title: "MENTORAT",
    description: "Guidance et conseil par des experts expérimentés",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "engagement",
    title: "ENGAGEMENT NOUVELLE GÉNÉRATION",
    description: "Mobilisation et implication des jeunes talents",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "manager",
    title: "MANAGER DE PROXIMITÉ",
    description: "Management de proximité et leadership local",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "plateforme",
    title: "UNE PLATEFORME DIGITALE DÉDIÉE",
    description: "Outils numériques pour optimiser les processus",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "comite",
    title: "COMITÉ DE DIRECTION",
    description: "Gouvernance et prise de décision stratégique",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "raison",
    title: "RAISON D'ÊTRE",
    description: "Purpose et mission fondamentale de l'organisation",
    color: "#F1C40F",
    textColor: "#000",
  },
]

const centerAlveole: AlveoleData = {
  id: "center",
  title: "VERS LA SUBSIDIARITÉ",
  description: "Principe de gouvernance décentralisée",
  color: "#2C3E50",
  textColor: "#FFF",
}

export default function Alveoles() {
  const [selectedAlveole, setSelectedAlveole] = useState<AlveoleData | null>(null)
  const [hoveredAlveole, setHoveredAlveole] = useState<string | null>(null)

  const handleAlveoleClick = (alveole: AlveoleData) => {
    setSelectedAlveole(alveole)
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

  const getHexagonPosition = (index: number, radius: number) => {
    if (index === -1) return { x: 0, y: 0 } // Center position

    const angle = (Math.PI / 3) * index - Math.PI / 2
    const x = Math.round(radius * Math.cos(angle) * 1000000) / 1000000
    const y = Math.round(radius * Math.sin(angle) * 1000000) / 1000000
    return { x, y }
  }

  const hexSize = 80
  const hexRadius = 160
  const svgSize = 500

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Alveoles Interactives</h1>
        <p className="text-gray-600">Cliquez sur chaque hexagone pour découvrir son contenu</p>
      </div>

      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
          className="drop-shadow-lg"
        >
          {/* Surrounding hexagons */}
          {alveoles.map((alveole, index) => {
            const position = getHexagonPosition(index, hexRadius)
            const isHovered = hoveredAlveole === alveole.id
            const scale = isHovered ? 1.1 : 1

            return (
              <g key={alveole.id}>
                <path
                  d={createHexagonPath(hexSize)}
                  fill={alveole.color}
                  stroke="#fff"
                  strokeWidth="3"
                  transform={`translate(${position.x}, ${position.y}) scale(${scale})`}
                  className="cursor-pointer transition-all duration-200 hover:drop-shadow-xl"
                  onClick={() => handleAlveoleClick(alveole)}
                  onMouseEnter={() => setHoveredAlveole(alveole.id)}
                  onMouseLeave={() => setHoveredAlveole(null)}
                />
                <text
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={alveole.textColor}
                  fontSize="11"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                  style={{
                    textShadow: alveole.textColor === "#FFF" ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
                  }}
                >
                  {(() => {
                    const words = alveole.title.split(" ")
                    const lineHeight = 12
                    const totalHeight = (words.length - 1) * lineHeight
                    const startY = position.y - totalHeight / 2

                    return words.map((word, i) => (
                      <tspan key={i} x={position.x} y={startY + i * lineHeight}>
                        {word}
                      </tspan>
                    ))
                  })()}
                </text>
              </g>
            )
          })}

          {/* Center hexagon */}
          <g>
            <path
              d={createHexagonPath(hexSize)}
              fill={centerAlveole.color}
              stroke="#fff"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-200 hover:scale-110 hover:drop-shadow-xl"
              onClick={() => handleAlveoleClick(centerAlveole)}
              onMouseEnter={() => setHoveredAlveole(centerAlveole.id)}
              onMouseLeave={() => setHoveredAlveole(null)}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill={centerAlveole.textColor}
              fontSize="12"
              fontWeight="bold"
              className="pointer-events-none select-none"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              {(() => {
                const words = centerAlveole.title.split(" ")
                const lineHeight = 14
                const totalHeight = (words.length - 1) * lineHeight
                const startY = -totalHeight / 2

                return words.map((word, i) => (
                  <tspan key={i} x="0" y={startY + i * lineHeight}>
                    {word}
                  </tspan>
                ))
              })()}
            </text>
          </g>
        </svg>
      </div>

      {/* Information panel */}
      {selectedAlveole && (
        <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedAlveole.color }} />
              <h3 className="text-lg font-semibold text-gray-800">{selectedAlveole.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{selectedAlveole.description}</p>
            <button
              onClick={() => setSelectedAlveole(null)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Fermer
            </button>
          </CardContent>
        </Card>
      )}

      {!selectedAlveole && (
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Sélectionnez un hexagone pour voir les détails</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
