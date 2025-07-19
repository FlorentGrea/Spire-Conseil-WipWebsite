"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "../../utils/mouseCoordinates"
import { getDynamicShadow } from "../../utils/dynamicShadow"



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
  const [isSm, setIsSm] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [shadowTime, setShadowTime] = useState(0)
  const mousePosition = useMousePosition()
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
              setIsLayoutSwapped(true)
            }
          } else {
            setIsScrollLocked(false)
            // Reset to first hexagon when leaving the screen
            setActiveHexagon(0)
            activeHexagonRef.current = 0
            setIsLayoutSwapped(false)
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
  const hexSize = isMd ? 100 : 70;
  const svgSize = isMd ? 220 : 180;





  return (
    <div 
      ref={screenRef}
      className="flex items-center justify-center w-full h-screen snap-start" data-screen="notre-equipe"
    >
      <div className="flex flex-col items-center justify-center gap-2 lg:gap-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#012073] mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Les fondateurs
        </h1>
        
        <div className="relative w-full max-w-6xl" style={{ minHeight: "400px" }}>
        {textContent.map((content, index) => (
          <div 
            key={index}
            className={`flex flex-col-reverse sm:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center transition-all duration-300 ease-in-out ${isLayoutSwapped ? 'lg:flex-row-reverse' : ''}`}
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
              className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4"
              style={{
                transform: activeHexagon === index ? "translateX(0)" : (index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"),
                transition: "transform 0.3s ease-in-out"
              }}
            >
              <div className="w-full border-2 border-[#012073] rounded-lg p-4 bg-white">
                <h2 className="text-lg lg:text-4xl font-bold text-[#012073] mb-4 text-center lg:text-left leading-tight">
                  {content.title}
                </h2>
                <div className="text-xs lg:text-xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6 text-center lg:text-left">
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
                    overflow: 'visible'
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
                    overflow: 'visible'
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
