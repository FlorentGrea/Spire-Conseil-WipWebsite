"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"



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
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [isLayoutSwapped, setIsLayoutSwapped] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)
  const scrollCooldown = 500 // milliseconds
  const activeHexagonRef = useRef(activeHexagon)
  // Touch state for mobile
  const touchStartY = useRef<number | null>(null)
  const touchInProgress = useRef(false)
  const touchThreshold = 40 // px
  // Responsive hexagon size
  const [isMd, setIsMd] = useState(false);

  // Keep ref in sync with state
  useEffect(() => {
    activeHexagonRef.current = activeHexagon
  }, [activeHexagon])

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      const now = Date.now()
      if (now - lastScrollTime.current < scrollCooldown) {
        return
      }
      lastScrollTime.current = now

      const isScrollingDown = e.deltaY > 0
      const current = activeHexagonRef.current
      
      if (isScrollingDown) {
        // Scrolling down
        if (current < textContent.length - 1) {
          setActiveHexagon(current + 1)
          
          // Special handling for second hexagon (index 1)
          if (current + 1 === 1) {
            setIsLayoutSwapped(true)
          } else {
            setIsLayoutSwapped(false)
          }
        } else {
          // At last hexagon, allow normal page scroll only, do not wrap
          setIsScrollLocked(false)
        }
      } else {
        // Scrolling up
        if (current > 0) {
          setActiveHexagon(current - 1)
          
          // Special handling for second hexagon (index 1)
          if (current - 1 === 1) {
            setIsLayoutSwapped(true)
          } else {
            setIsLayoutSwapped(false)
          }
        } else {
          // At first hexagon, allow normal page scroll only, do not wrap
          setIsScrollLocked(false)
        }
      }
    }

    // Touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY
        touchInProgress.current = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchInProgress.current || touchStartY.current === null) return
      const now = Date.now()
      if (now - lastScrollTime.current < scrollCooldown) return
      const currentY = e.touches[0].clientY
      const deltaY = currentY - touchStartY.current
      const current = activeHexagonRef.current
      // Only prevent default if not at boundary in the swipe direction
      if (
        isScrollLocked &&
        !(
          (current === 0 && deltaY > 0) || // at Human 1, swiping down
          (current === textContent.length - 1 && deltaY < 0) // at Human 3, swiping up
        )
      ) {
        e.preventDefault();
      }
      if (Math.abs(deltaY) > touchThreshold) {
        lastScrollTime.current = now
        if (deltaY < 0) {
          // Swipe up (scroll down)
          if (current < textContent.length - 1) {
            setActiveHexagon(current + 1)
            
            // Special handling for second hexagon (index 1)
            if (current + 1 === 1) {
              setIsLayoutSwapped(true)
            } else {
              setIsLayoutSwapped(false)
            }
          } else {
            setIsScrollLocked(false)
          }
        } else {
          // Swipe down (scroll up)
          if (current > 0) {
            setActiveHexagon(current - 1)
            
            // Special handling for second hexagon (index 1)
            if (current - 1 === 1) {
              setIsLayoutSwapped(true)
            } else {
              setIsLayoutSwapped(false)
            }
          } else {
            setIsScrollLocked(false)
          }
        }
        touchInProgress.current = false
      }
    }

    const handleTouchEnd = () => {
      touchStartY.current = null
      touchInProgress.current = false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const current = activeHexagonRef.current
        if (current < textContent.length - 1) {
          setActiveHexagon(current + 1)
          
          // Special handling for second hexagon (index 1)
          if (current + 1 === 1) {
            setIsLayoutSwapped(true)
          } else {
            setIsLayoutSwapped(false)
          }
        } else {
          setIsScrollLocked(false)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const current = activeHexagonRef.current
        if (current > 0) {
          setActiveHexagon(current - 1)
          
          // Special handling for second hexagon (index 1)
          if (current - 1 === 1) {
            setIsLayoutSwapped(true)
          } else {
            setIsLayoutSwapped(false)
          }
        } else {
          setIsScrollLocked(false)
        }
      }
    }

    // Lock scroll when entering the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsScrollLocked(true)
            // Determine entry direction: from above or below
            if (entry.boundingClientRect.top > 0) {
              // Entering from above (scrolling down)
              setActiveHexagon(0)
              activeHexagonRef.current = 0
            } else if (entry.boundingClientRect.top < 0) {
              // Entering from below (scrolling up)
              setActiveHexagon(textContent.length - 1)
              activeHexagonRef.current = textContent.length - 1
            }
          } else {
            setIsScrollLocked(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (screenRef.current) {
      observer.observe(screenRef.current)
      // Attach touch listeners for mobile
      if (isScrollLocked) {
        screenRef.current.addEventListener('touchstart', handleTouchStart, { passive: false })
        screenRef.current.addEventListener('touchmove', handleTouchMove, { passive: false })
        screenRef.current.addEventListener('touchend', handleTouchEnd, { passive: false })
      }
    }

    if (isScrollLocked) {
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
      if (screenRef.current) {
        screenRef.current.removeEventListener('touchstart', handleTouchStart)
        screenRef.current.removeEventListener('touchmove', handleTouchMove)
        screenRef.current.removeEventListener('touchend', handleTouchEnd)
      }
      observer.disconnect()
    }
  }, [isScrollLocked])

  const handleHexagonClick = (index: number) => {
    if (index !== activeHexagon) {
      setActiveHexagon(index)
      
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

  // Responsive hexagon size
  useEffect(() => {
    const checkSize = () => setIsMd(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Responsive hexagon size for all hexagons
  const hexSize = isMd ? 100 : 70;
  const svgSize = isMd ? 220 : 180;

  return (
    <div 
      ref={screenRef}
      className="flex flex-col items-center w-full min-h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border" 
      data-screen="notre-equipe"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Notre Équipe
        </h1>
        
        {textContent.map((content, index) => (
          <div 
            key={index}
            className={`flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center transition-all duration-300 ease-in-out ${isLayoutSwapped ? 'lg:flex-row-reverse' : ''}`}
            style={{
              position: activeHexagon === index ? "relative" : "absolute",
              visibility: activeHexagon === index ? "visible" : "hidden"
            }}
          >
            {/* Text Section */}
            <div 
              className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4"
              style={{
                opacity: activeHexagon === index ? 1 : 0,
                transform: activeHexagon === index ? "translateX(0)" : (index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"),
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
              }}
            >
              <div className="relative overflow-hidden w-full min-h-[160px] sm:min-h-[200px] flex items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    {content.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Alveoles Section */}
            <div 
              className="flex-1 flex flex-row lg:grid grid-cols-2 grid-rows-2 overflow-visible"
              style={{
                opacity: activeHexagon === index ? 1 : 0,
                transform: activeHexagon === index ? "translateX(0)" : (index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"),
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
              }}
            >              
              <div className="flex justify-end items-end col-start-1 row-start-1 lg:-mr-14 lg:-mb-4">
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
                  className="drop-shadow-lg"
                  style={{
                    filter: activeHexagon === 0 
                      ? 'drop-shadow(0 8px 18px rgba(241,196,15,0.9))' 
                      : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
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
                    className="transition-all duration-200 hover:drop-shadow-xl"
                    transform="rotate(-90 0 0)"
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
              <div className="flex justify-start items-start col-start-2 row-start-2 lg:-ml-14 lg:-mt-4">
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
                  className="drop-shadow-lg"
                  style={{
                    filter: activeHexagon === 1 
                      ? 'drop-shadow(0 8px 18px rgba(241,196,15,0.9))' 
                      : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
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
                    className="transition-all duration-200 hover:drop-shadow-xl"
                    transform="rotate(-90 0 0)"
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
  )
}
