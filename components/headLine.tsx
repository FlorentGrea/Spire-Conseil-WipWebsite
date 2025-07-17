"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function HeadLine() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showPopup, setShowPopup] = useState(false);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isNavigating, setIsNavigating] = useState(false);

  const screenNames = ["Accueil", "Nos Offres", "Notre Méthode", "Témoignages", "Notre Équipe", "Nous Contacter"];

  const handleLogoClick = () => {
    if (isHomePage) {
      // Scroll to first screen (TimelineScreen)
      scrollToSection(0);
    }
    // If not on home page, the Link component will handle navigation
  };

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('[class*="snap-start"]');
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: "smooth" });
    }
    // Update navigation state immediately for clicks and prevent observer interference
    if (sectionIndex !== current) {
      setIsNavigating(true);
      setPrev(current);
      setCurrent(sectionIndex);
      setDirection(sectionIndex > current ? 'up' : 'down');
      
      // Allow observer to work again after animation completes
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }
    setShowPopup(false);
  };

  // Intersection Observer for snap scrolling detection
  useEffect(() => {
    const screens = [
      document.querySelector('[data-screen="home"]'),
      document.querySelector('[data-screen="timeline"]'),
      document.querySelector('[data-screen="subsidiarite"]'),
      document.querySelector('[data-screen="temoignages"]'),
      document.querySelector('[data-screen="notre-equipe"]'),
      document.querySelector('[data-screen="contact"]'),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isNavigating) {
            const screenIndex = screens.findIndex(screen => screen === entry.target);
            
            if (screenIndex !== -1 && screenIndex !== current) {
              setPrev(current);
              setCurrent(screenIndex);
              setDirection(screenIndex > current ? 'up' : 'down');
            }
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of the section is visible
        rootMargin: '-20% 0px -20% 0px' // Adjust trigger area
      }
    );

    // Observe all screens
    screens.forEach((screen) => {
      if (screen) {
        observer.observe(screen);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [current, isNavigating]); // Add isNavigating to dependencies

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.navigation-container')) {
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

  // Animation variants using custom direction
  const textVariants: Variants = {
    initial: (dir: 'up' | 'down') => ({ opacity: 0, y: dir === 'up' ? 20 : -20 }),
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: (dir: 'up' | 'down') => ({ opacity: 0, y: dir === 'up' ? -20 : 20, transition: { duration: 0.25, ease: 'easeIn' } }),
  };

  const handleExitComplete = () => {
    setPrev(null);
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
              <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
        <div className="flex justify-between items-center h-fit py-1 sm:py-1.5">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={handleLogoClick} className="cursor-pointer">
              <Image
                src="/SpireTopPageLogo.png"
                alt="Spire Conseil Logo"
                width={500}
                height={125}
                className="h-12 w-auto md:h-16 lg:h-24 object-contain"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center relative navigation-container">
            {/* Current Screen Display */}
            <div 
              className="flex items-center justify-between cursor-pointer min-w-[120px] md:min-w-[140px] lg:min-w-[180px]"
              onMouseEnter={() => setShowPopup(true)}
              onClick={() => setShowPopup(!showPopup)}
            >
              {/* Animated Text */}
              <div className="relative overflow-hidden h-6 md:h-8 lg:h-9 flex items-center w-full min-w-[120px] md:min-w-[140px] lg:min-w-[180px] justify-center">
                <AnimatePresence initial={false} mode="wait" onExitComplete={handleExitComplete}>
                  {prev !== null && (
                    <motion.span
                      key={`prev-${prev}`}
                      custom={direction}
                      variants={textVariants}
                      initial="animate"
                      animate="exit"
                      exit="exit"
                      className="absolute left-0 right-0 w-full flex justify-center items-center text-center text-xs md:text-sm lg:text-lg font-bold text-[#012073] whitespace-nowrap"
                    >
                      {screenNames[prev]}
                    </motion.span>
                  )}
                  <motion.span
                    key={`current-${current}`}
                    custom={direction}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute left-0 right-0 w-full flex justify-center items-center text-center text-xs md:text-sm lg:text-lg font-bold text-[#012073] whitespace-nowrap"
                  >
                    {screenNames[current]}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              {/* 3 Lines SVG Icon */}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                className="text-[#012073] mr-2 md:mr-3 lg:mr-5 w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7"
              >
                <line x1="2" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Popup Menu */}
            {showPopup && (
              <div 
                className="absolute top-full right-0 mt-1 md:mt-2 lg:mt-4 bg-white border border-gray-200 rounded-lg shadow-lg py-1 md:py-2 lg:py-4 min-w-[120px] md:min-w-[140px] lg:min-w-[180px] z-50"
                onMouseLeave={() => setShowPopup(false)}
              >
                {screenNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`w-full text-left px-2 md:px-3 lg:px-5 py-1 md:py-2 lg:py-4 text-xs md:text-sm lg:text-lg font-medium transition-colors hover:bg-gray-100 ${
                      current === index 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-[#012073]'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
