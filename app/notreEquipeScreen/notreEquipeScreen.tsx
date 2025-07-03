"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "framer-motion"

interface TeamAlveoleData {
  id: string
  title: string
  description: string
  color: string
  textColor: string
}

const teamAlveoles: TeamAlveoleData[] = [
  {
    id: "expertise",
    title: "EXPERTISE",
    description: "Plus de 15 ans d'expérience dans le management et la transformation organisationnelle",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "accompagnement",
    title: "ACCOMPAGNEMENT",
    description: "Méthodologie personnalisée adaptée aux spécificités de chaque organisation",
    color: "#F1C40F",
    textColor: "#000",
  },
  {
    id: "resultats",
    title: "RÉSULTATS",
    description: "Mesurables et durables, avec un suivi continu des indicateurs de performance",
    color: "#F1C40F",
    textColor: "#000",
  },
]

const textContent = [
  {
    title: "Human 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Human 2",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  },
  {
    title: "Human 3",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
  }
]

export default function NotreEquipeScreen() {
  const [activeHexagon, setActiveHexagon] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [isScrollLocked, setIsScrollLocked] = useState(false)
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
          setPrev(current)
          setActiveHexagon(current + 1)
          setDirection('up')
        } else {
          // At last hexagon, allow normal page scroll only, do not wrap
          setIsScrollLocked(false)
        }
      } else {
        // Scrolling up
        if (current > 0) {
          setPrev(current)
          setActiveHexagon(current - 1)
          setDirection('down')
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
            setPrev(current)
            setActiveHexagon(current + 1)
            setDirection('up')
          } else {
            setIsScrollLocked(false)
          }
        } else {
          // Swipe down (scroll up)
          if (current > 0) {
            setPrev(current)
            setActiveHexagon(current - 1)
            setDirection('down')
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
          setPrev(current)
          setActiveHexagon(current + 1)
          setDirection('up')
        } else {
          setIsScrollLocked(false)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const current = activeHexagonRef.current
        if (current > 0) {
          setPrev(current)
          setActiveHexagon(current - 1)
          setDirection('down')
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
              setPrev(null)
            } else if (entry.boundingClientRect.top < 0) {
              // Entering from below (scrolling up)
              setActiveHexagon(textContent.length - 1)
              activeHexagonRef.current = textContent.length - 1
              setPrev(null)
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
      setPrev(activeHexagon)
      setActiveHexagon(index)
      setDirection(index > activeHexagon ? 'up' : 'down')
    }
  }

  // Animation variants using custom direction
  const textVariants: Variants = {
    initial: (dir: 'up' | 'down') => ({ opacity: 0, y: dir === 'up' ? 80 : -80 }),
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 0, transition: { duration: 0.05 } },
  }

  const handleExitComplete = () => {
    setPrev(null)
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
        
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center">
          {/* Text Section */}
          <div className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            <div className="relative overflow-hidden w-full min-h-[160px] sm:min-h-[200px] flex items-center justify-center">
              <AnimatePresence initial={false} mode="wait" onExitComplete={handleExitComplete}>
                <motion.div
                  key={activeHexagon}
                  custom={direction}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    {textContent[activeHexagon].title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {textContent[activeHexagon].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Alveoles Section */}
          <div className="flex-1 flex items-start justify-center w-full">
            {/* New flex layout for hexagons */}
            <div className={`flex flex-col w-full max-w-[${isMd ? 220 : 180}px] h-auto items-center justify-center overflow-visible`}>
              {/* First row: hexagon 1 */}
              <div className="flex justify-center -mb-10 md:-mb-5">
                <div className="m-auto">
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
                      <clipPath id="hex1">
                        <path d={createHexagonPath(hexSize)} transform="rotate(-90 0 0)" />
                      </clipPath>
                    </defs>
                    <path
                      d={createHexagonPath(hexSize)}
                      fill={teamAlveoles[0].color}
                      stroke="#fff"
                      strokeWidth="3"
                      className="transition-all duration-200 hover:drop-shadow-xl"
                      transform="rotate(-90 0 0)"
                    />
                    <image
                      href="/human1.jpg"
                      x={-hexSize}
                      y={-hexSize}
                      width={hexSize * 2}
                      height={hexSize * 2}
                      clipPath="url(#hex1)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>
                </div>
              </div>
              {/* Second row: hexagons 2 and 3 */}
              <div className="flex flex-row justify-center -mt-4 md:-mt-0 md:gap-2">
                <div className="-mr-10 md:-mr-0">
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
                      <clipPath id="hex2">
                        <path d={createHexagonPath(hexSize)} transform="rotate(-90 0 0)" />
                      </clipPath>
                    </defs>
                    <path
                      d={createHexagonPath(hexSize)}
                      fill={teamAlveoles[1].color}
                      stroke="#fff"
                      strokeWidth="3"
                      className="transition-all duration-200 hover:drop-shadow-xl"
                      transform="rotate(-90 0 0)"
                    />
                    <image
                      href="/human2.jpg"
                      x={-hexSize}
                      y={-hexSize}
                      width={hexSize * 2}
                      height={hexSize * 2}
                      clipPath="url(#hex2)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    width={svgSize}
                    height={svgSize}
                    viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
                    className="drop-shadow-lg"
                    style={{
                      filter: activeHexagon === 2 
                        ? 'drop-shadow(0 8px 18px rgba(241,196,15,0.9))' 
                        : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                    }}
                    onClick={() => handleHexagonClick(2)}
                  >
                    <defs>
                      <clipPath id="hex3">
                        <path d={createHexagonPath(hexSize)} transform="rotate(-90 0 0)" />
                      </clipPath>
                    </defs>
                    <path
                      d={createHexagonPath(hexSize)}
                      fill={teamAlveoles[2].color}
                      stroke="#fff"
                      strokeWidth="3"
                      className="transition-all duration-200 hover:drop-shadow-xl"
                      transform="rotate(-90 0 0)"
                    />
                    <image
                      href="/human3.jpg"
                      x={-hexSize}
                      y={-hexSize}
                      width={hexSize * 2}
                      height={hexSize * 2}
                      clipPath="url(#hex3)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
