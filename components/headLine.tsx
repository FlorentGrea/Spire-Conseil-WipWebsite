"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ColorPicker from "./ColorPicker";

export default function HeadLine() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showPopup, setShowPopup] = useState(false);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const screenNames = ["Accueil", "Notre Parcours", "Notre Méthode", "Témoignages", "Les Fondateurs", "Nous Contacter", "Informations"];

  // Handle scroll-based header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not at the very top
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogoClick = () => {
    if (isHomePage) {
      // Scroll to first screen (TimelineScreen)
      scrollToSection(0);
    }
    // If not on home page, the Link component will handle navigation
  };

  const scrollToSection = (sectionIndex: number) => {
    let targetSection;
    
    // Map navigation indices to actual screen elements
    if (sectionIndex === 0) {
      targetSection = document.querySelector('[data-screen="home"]');
    } else if (sectionIndex === 1) {
      targetSection = document.querySelector('[data-screen="products"]');
    } else if (sectionIndex === 2) {
      targetSection = document.querySelector('[data-screen="subsidiarite"]');
    } else if (sectionIndex === 3) {
      targetSection = document.querySelector('[data-screen="reviews"]');
    } else if (sectionIndex === 4) {
      targetSection = document.querySelector('[data-screen="team"]');
    } else if (sectionIndex === 5) {
      targetSection = document.querySelector('[data-screen="contact"]');
    } else if (sectionIndex === 6) {
      targetSection = document.querySelector('[data-screen="footer"]');
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
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
      document.querySelector('[data-screen="products"]'),
      document.querySelector('[data-screen="subsidiarite"]'),
      document.querySelector('[data-screen="reviews"]'),
      document.querySelector('[data-screen="team"]'),
      document.querySelector('[data-screen="contact"]'),
      document.querySelector('[data-screen="footer"]'),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isNavigating) {
            const screenIndex = screens.findIndex(screen => screen === entry.target);
            
            console.log('Intersection detected:', {
              target: entry.target.getAttribute('data-screen'),
              screenIndex,
              current,
              isNavigating
            });
            
            if (screenIndex !== -1 && screenIndex !== current) {
              // Map screen indices to navigation indices
              let newCurrent;
              if (screenIndex === 0) {
                newCurrent = 0; // "Accueil"
              } else if (screenIndex === 1) {
                newCurrent = 1; // "Nos Produits"
              } else if (screenIndex === 2) {
                newCurrent = 2; // "Subsidiarité"
              } else if (screenIndex === 3) {
                newCurrent = 3; // "Reviews"
              } else if (screenIndex === 4) {
                newCurrent = 4; // "Les fondateurs"
              } else if (screenIndex === 5) {
                newCurrent = 5; // "Nous Contacter"
              } else if (screenIndex === 6) {
                newCurrent = 6; // "Informations" (footer)
              } else {
                newCurrent = screenIndex;
              }
              
              if (newCurrent !== current) {
                console.log('Updating navigation:', { from: current, to: newCurrent });
                setPrev(current);
                setCurrent(newCurrent);
                setDirection(newCurrent > current ? 'up' : 'down');
              }
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-10% 0px -10% 0px' // Adjust trigger area
      }
    );

    // Observe all screens
    screens.forEach((screen, index) => {
      if (screen) {
        observer.observe(screen);
        console.log(`Observing screen ${index}:`, screen.getAttribute('data-screen'));
      } else {
        console.log(`Screen ${index} not found`);
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
    <motion.header 
      className="w-full backdrop-blur-sm shadow-lg fixed top-0 z-50" 
      style={{ backgroundColor: 'var(--color-sc-primary)' }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <div className="flex justify-between items-center h-fit py-1 sm:py-1.5">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={handleLogoClick} className="cursor-pointer">
              <svg 
                version="1.2" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 2243 1099" 
                width="2243" 
                height="1099"
                className="h-12 w-auto md:h-16 lg:h-24 object-contain"
                style={{ fill: 'var(--color-sc-secondary)' }}
              >
                <path 
                      id="Path 0" 
                      fillRule="evenodd" 
                      d="m528.8 291.1c2.8 0 6.9 0.6 9 1.5 2 0.8 5.2 2.9 7 4.7 1.9 1.8 4.2 4.9 5.3 6.9 1.2 2.3 1.9 5.8 1.9 9 0 2.9-6.5 46.6-14.5 97-10.3 65.4-15 92.9-16.4 95.5-1 2.1-3 4.8-4.3 6-1.2 1.2-4.3 3.1-6.8 4.2-2.6 1.2-6.6 2.1-9.5 2.1-2.7-0.1-6.7-0.8-8.8-1.8-2.4-1.1-13.4-11.4-29.5-27.4-21.1-21.2-26.2-25.8-28.4-25.8-2.2 0-4.6 1.9-11.5 9.3-4.9 5.2-11.8 13.6-15.5 18.8-3.7 5.2-9.4 14.1-12.7 19.9-3.2 5.8-8 15.5-10.6 21.5-2.6 6-6.2 16-8 22-1.8 6-4.2 15.7-5.4 21.5-1.1 5.8-2.5 16.3-3.1 23.5-0.7 9.2-0.7 16.9 0 26.5 0.6 7.4 2.2 18.9 3.5 25.5 1.3 6.6 4.2 17.3 6.5 23.7 2.2 6.5 6.3 16.4 9.1 22 2.8 5.7 7.6 14.1 10.7 18.8 3 4.7 7.5 11.2 10.1 14.5 2.5 3.3 8.4 10 13.1 14.9 4.7 4.8 11.4 11.2 15 14.2 5.5 4.5 7.5 5.5 13 6.6 3.9 0.7 15 1.2 28 1.2 17.5-0.1 23.6-0.5 33-2.2 6.3-1.2 16-3.4 21.5-5 5.5-1.6 14.3-4.6 19.5-6.7 5.2-2 13.3-5.8 18-8.3 4.7-2.5 12.5-7.2 17.5-10.5 5-3.3 12.2-8.5 16-11.7 3.9-3.2 11.1-10 16.1-15.1 4.9-5.2 11.9-13.2 15.3-17.9 3.5-4.7 8.8-12.8 11.9-18 3.1-5.2 7.2-13.3 9.3-18 2-4.7 5-12.8 6.7-18 1.7-5.2 4-14 5.2-19.5 1.6-7.4 2.3-14.8 2.7-29 0.4-16.8 0.2-20.2-1.7-29.5-1.1-5.8-4.1-16.6-6.6-24-2.5-7.4-7.8-20.3-11.8-28.5-4-8.3-10.8-20.9-23.1-41v-7.1c0-6.1 0.4-7.5 2.8-10.7 2-2.8 7.9-6.6 23.5-15.3 11.4-6.4 22.8-13 25.5-14.5 2.6-1.6 6.6-3.4 9-4 2.9-0.7 5.4-0.7 8.2 0 2.2 0.5 7.6 3.5 12 6.6 4.4 3.1 11.3 8.9 15.3 12.8 4.1 4 10.2 10.8 13.6 15.2 3.5 4.4 8.7 12 11.7 17 2.9 4.9 7.6 13.9 10.3 20 2.7 6 6.6 16.2 8.6 22.5 2.1 6.3 5 16.7 6.4 23 1.4 6.3 3.2 16.7 4 23 0.8 6.3 1.8 17.6 2.2 25 0.4 8.1 0.2 19.3-0.6 28-0.6 8-2 19.5-3.1 25.5-1.1 6-3.1 15.3-4.4 20.5-1.3 5.2-4.2 14.7-6.4 21-2.2 6.3-5.6 15.3-7.6 20-2 4.7-5.9 12.8-8.6 18-2.8 5.2-8.4 14.5-12.4 20.5-4 6-11.5 16-16.8 22-5.2 6-13 14.2-17.3 18.1-4.4 3.9-10.8 9.3-14.4 12.1-3.6 2.8-10.1 7.4-14.5 10.3-4.4 2.9-13.8 8.1-21 11.5-7.1 3.5-18.5 8.2-25.2 10.4-6.8 2.3-17.8 5.2-24.5 6.5-6.8 1.4-17.9 3-24.8 3.7-7.1 0.7-18.3 0.9-26 0.6-7.4-0.3-18.2-1.3-24-2.2-5.8-0.9-14.8-2.7-20-4-5.2-1.3-14.2-4-20-6-5.8-2-16.3-6.5-23.5-10-7.1-3.5-16.8-9-21.5-12.1-6.2-4.1-10.5-6.2-16-7.6-4.1-1-12.4-3.5-18.5-5.5-6-1.9-16.8-6.3-24-9.7-7.1-3.5-16.8-8.6-21.5-11.5-4.7-3-11.9-7.9-16-11-4.1-3.1-12.8-10.8-19.4-17.1-6.5-6.3-14.5-14.9-17.9-19-3.3-4.1-8.7-11.5-12-16.5-3.3-5-8.4-13.5-11.3-19-2.9-5.5-7.3-15.2-9.8-21.5-2.5-6.3-6.1-17.6-8-25-1.9-7.4-4.2-19.6-5.1-27-1.4-10.4-1.6-17.7-1.2-32 0.3-10.2 1.3-22.8 2.2-28 0.9-5.2 2.7-13.8 4-19 1.3-5.2 4-14 6-19.5 1.9-5.5 6.2-15.4 9.4-22 3.2-6.6 9-16.7 12.8-22.5 3.8-5.8 10.3-14.6 14.5-19.5 4.1-5 11.9-13.2 17.4-18.4 5.4-5.2 14.2-12.6 19.4-16.5 5.2-3.8 11-8 12.8-9.3 1.8-1.3 3.2-3.2 3.2-4.3 0-1.1-7.5-12.9-16.7-26.3-10.5-15.3-17.1-25.8-17.9-28.7-0.7-2.5-1-6.3-0.7-8.5 0.3-2.2 1.4-5.6 2.3-7.5 1-1.9 3.5-5.1 5.6-7.1 2.2-1.9 5-3.9 6.4-4.4 1.4-0.4 42.8-4.5 92-9 49.2-4.6 91.9-8.3 94.8-8.4zm421.2 130.4c11.8 0.2 21 1 25.5 2 3.9 0.8 10.6 2.7 15 4.2 4.4 1.4 11.6 4.4 16 6.6 4.4 2.1 10.7 5.8 14 8.2 3.3 2.3 9.4 7.8 13.5 12.2 4.1 4.4 8.8 10.4 10.5 13.4 2.5 4.5 3 6.5 2.9 11.9 0 4.3-0.7 8.1-2.1 11-1.1 2.5-3.3 6-4.9 7.9-1.6 1.9-5.6 4.7-8.9 6.3-4.9 2.3-7.3 2.8-13.5 2.8-5.7 0-8.7-0.6-12.5-2.3-2.7-1.3-8.6-4.9-13-8.1-4.4-3.1-10.7-7-14-8.5-3.3-1.6-8.5-3.5-11.5-4.2-3.3-0.8-11-1.4-19-1.4-10.2 0-15 0.5-19.5 1.9-3.3 1-8.1 2.9-10.7 4.2-2.7 1.3-6.5 3.9-8.5 5.8-2.1 1.8-5.1 5.8-6.7 8.7-2 3.7-3.1 7.3-3.4 11.4-0.2 3.3 0.1 7.9 0.7 10.2 0.6 2.5 2.8 6.1 5 8.5 2.1 2.4 6 5.5 8.7 7 2.7 1.5 8.3 3.9 12.4 5.3 4.1 1.4 17.4 4.6 29.5 7.1 12.1 2.5 27.4 6.3 34 8.5 6.6 2.2 16.5 6.2 22 8.9 5.5 2.7 13.6 7.8 18 11.3 4.4 3.4 10.4 9.2 13.3 12.7 2.9 3.6 7.3 10.5 9.8 15.5 2.4 5 5.2 12.4 6 16.5 1 4.5 1.6 12.3 1.6 19.5 0 8.9-0.5 14.3-2.1 21-1.2 5-3.9 12.6-6 17-2 4.4-5.7 10.9-8.1 14.5-2.4 3.6-7.8 9.9-11.9 14-4.2 4.2-11.2 10-15.6 12.9-4.4 2.9-11.3 6.8-15.2 8.7-4 1.9-10.8 4.5-15 5.9-4.3 1.4-11.6 3.3-16.3 4.2-5.9 1.2-13.5 1.7-25 1.7-12.9-0.1-18.7-0.5-26.5-2.2-5.5-1.2-14-3.5-19-5.3-4.9-1.7-12.1-4.7-16-6.7-3.8-1.9-10.4-5.7-14.5-8.5-4.1-2.7-12-9.5-17.5-15.1-5.5-5.6-11.5-12.6-13.2-15.6-1.8-3-4.5-8.4-5.9-12-1.9-4.7-2.6-8.3-2.6-13 0-4.4 0.7-8.2 2.1-11.5 1.1-2.8 4.2-7.1 6.8-9.7 2.7-2.6 7.1-5.7 9.8-6.9 3.3-1.5 7.1-2.3 11-2.3 4.2 0 7.5 0.7 11 2.3 3.1 1.4 7.7 5.1 12 9.5 3.9 4 9.7 10.2 13 13.8 3.3 3.6 8.9 8.4 12.5 10.7 3.6 2.3 10.1 5.4 14.5 6.8 6.2 2 10.8 2.6 20.5 3 9.1 0.4 14.5 0.1 20-1.1 4.1-0.9 10.9-3.2 15-5.3 4.1-2 9.4-5.6 11.8-8 2.3-2.4 5.1-6.2 6.2-8.6 1.4-2.9 2-6.3 2-11.2 0-4.7-0.7-8.3-1.9-11-1-2.2-2.9-5.2-4.2-6.6-1.3-1.4-4.3-3.7-6.6-5.2-2.4-1.5-6.9-3.6-10-4.6-3.2-1.1-13.2-3.3-22.3-5.1-9.1-1.7-20.8-4.2-26-5.5-5.2-1.3-14.2-4-20-6.1-5.8-2-14.1-5.4-18.5-7.6-4.4-2.2-11.3-6.4-15.4-9.2-4-2.8-10.6-8.5-14.5-12.6-4-4.1-9.1-10.7-11.3-14.5-2.3-3.9-5.3-10.4-6.7-14.5-1.3-4.1-3-11.5-3.7-16.5-0.6-5.1-0.9-12.6-0.5-17.3 0.3-4.5 1.3-11.5 2.2-15.5 0.9-3.9 3.1-10.6 4.8-14.7 1.7-4.1 5.3-10.7 7.8-14.5 2.6-3.9 7.1-9.7 10-12.9 2.9-3.2 8.7-8.4 12.8-11.5 4.1-3.1 11.1-7.5 15.5-9.8 4.4-2.3 12.1-5.5 17-7.2 5-1.7 12.6-3.7 17-4.5 6-1.2 12.7-1.4 26.5-1.1zm232.5 1.8c51.5 0.3 53.2 0.4 61 2.6 4.4 1.2 11.6 3.9 16 6 4.4 2 10.9 5.7 14.5 8.1 3.6 2.5 9.4 7.2 12.9 10.5 3.5 3.3 8.4 8.7 10.9 12 2.5 3.3 6.7 10.5 9.3 16 2.7 5.5 5.8 14 7 19 1.8 7.2 2.2 11.8 2.2 23 0 11.6-0.5 15.6-2.5 23.5-1.4 5.2-4.6 13.5-7.1 18.5-2.4 5-6.7 11.9-9.3 15.4-2.7 3.6-8.1 9.4-12.1 13-3.9 3.6-10.6 8.7-15 11.2-4.3 2.5-11.2 6-15.3 7.7-4.1 1.7-10.9 3.8-15 4.7-6.1 1.4-13.9 1.8-74 2.5v50.7c0 45-0.2 51.4-1.7 55.8-1.1 3.4-3.4 6.7-7.2 10.6-4.1 4.1-7.1 6.1-11.1 7.4-3 1-8 1.8-11 1.8-3 0-7.7-0.7-10.5-1.6-2.8-0.9-7.2-3.5-9.9-5.9-2.7-2.4-6.1-6.6-10.1-14.3l-0.2-136.5c-0.2-84.4 0.1-137.8 0.7-140 0.5-1.9 2.2-5.5 3.9-8 1.6-2.5 4.6-5.8 6.7-7.5 2.2-1.6 6.2-3.8 8.9-4.7 4.6-1.6 9.5-1.8 58-1.5zm-16.5 130.7c61.3-0.5 61.5-0.5 66.5-3 2.7-1.4 7-4.3 9.5-6.6 2.5-2.2 6.1-7 8-10.5 3.3-6 3.5-7 3.5-15.4 0-8.1-0.3-9.5-3-14.4-1.7-3-4.8-7.2-7-9.3-2.2-2.2-6.5-5.2-9.5-6.6l-5.5-2.7-62.4-0.6zm229.5-130.7c4 0.2 8.9 1.2 11.5 2.3 2.5 1.1 6.4 3.9 8.8 6.2 2.3 2.3 5.2 6.1 8.7 12.7l0.5 275-2.8 5.9c-1.7 3.8-4.5 7.5-7.7 10.3-2.8 2.5-7.2 5.1-10 6-2.7 0.9-7.5 1.6-10.5 1.6-3 0-8-0.8-11-1.8-4-1.3-7-3.3-11.1-7.4-3.9-3.9-6.1-7.1-7.2-10.6-1.6-4.6-1.7-16.2-1.2-279l3-5.4c1.7-3 5-7 7.4-9 2.5-2 6.8-4.4 9.5-5.4 3.6-1.2 7.2-1.7 12.1-1.4zm173 0c51.5 0.3 53.2 0.4 61 2.6 4.4 1.2 11.6 3.9 16 6 4.4 2 10.9 5.7 14.5 8.1 3.6 2.5 9.4 7.2 12.9 10.5 3.5 3.3 8.4 8.7 10.9 12 2.5 3.3 6.7 10.5 9.3 16 2.7 5.5 5.7 13.8 6.8 18.5 1.1 4.7 2.3 12.1 2.7 16.5 0.3 4.4 0.1 12.2-0.5 17.2-0.6 5.1-2.3 13-3.7 17.5-1.5 4.6-4.3 11.7-6.4 15.8-2.1 4.1-6 10.4-8.6 13.9-2.7 3.6-8.1 9.4-12 13-4 3.6-11 8.8-24.2 16.6l26 46c14.3 25.3 26.6 48.2 27.5 51 1 3.2 1.4 6.8 1.1 10-0.3 2.7-1.6 7.4-2.9 10.4-1.5 3.3-4.3 7.2-7.4 10-3.1 2.9-7.1 5.4-10.5 6.6-3.1 1-8.1 1.8-11.5 1.8-3.8 0-7.8-0.8-11-2.2-2.7-1.1-6.9-4-9.2-6.3-3.1-3.1-13.4-20.4-68.1-117.3l-29.2-0.5v50.7c0 45-0.2 51.4-1.7 55.8-1.1 3.4-3.4 6.7-7.2 10.6-4.1 4.1-7.1 6.1-11.1 7.4-3 1-8 1.8-11 1.8-3 0-7.7-0.7-10.5-1.6-2.8-0.9-7.2-3.5-9.9-5.9-2.7-2.4-6-6.6-10.1-14.3l-0.2-136.5c-0.2-84.4 0.1-137.8 0.7-140 0.5-1.9 2.2-5.5 3.9-8 1.6-2.5 4.6-5.9 6.7-7.5 2.2-1.6 6.2-3.8 8.9-4.7 4.6-1.6 9.5-1.8 58-1.5zm-16.5 130.7c61.3-0.5 61.5-0.5 66.5-3 2.7-1.4 7-4.3 9.5-6.6 2.5-2.3 6.1-7 8-10.5 3.3-6 3.5-7 3.5-15.4 0-8.1-0.3-9.5-3-14.4-1.6-3-4.8-7.2-7-9.3-2.2-2.2-6.5-5.2-9.5-6.6l-5.5-2.7-62.4-0.6zm371.5-130.5l5 2.6c2.8 1.4 6.9 4.8 9.3 7.5 2.4 2.7 5 7.1 6 9.9 0.9 2.8 1.6 7.8 1.6 11.5-0.1 4.4-0.8 8.1-2.3 11.5-1.2 2.7-4.1 7-6.4 9.4-2.3 2.4-6.4 5.4-14.2 9.1h-103.5v68l75.5 0.5 5.5 2.7c3 1.4 7.3 4.6 9.5 7 2.1 2.3 4.8 6.3 5.9 8.8 1.5 3.2 2.1 6.6 2.1 12 0 6.1-0.5 8.5-2.6 13-1.5 3-4.6 7.2-7 9.3-2.4 2.1-6.8 4.6-9.6 5.7-4.9 1.8-8 2-79.3 2v67l51.3 0.2c51 0.3 51.2 0.3 56.2 2.6 2.8 1.2 7.2 4.4 9.8 7 2.6 2.6 5.7 6.9 6.9 9.7 1.3 3.3 2.1 7.2 2.2 11.5 0 3.7-0.7 8.7-1.6 11.5-1 2.7-3.6 7.2-6 9.8-2.5 2.8-6.6 6-15.3 10.2h-142l-5.5-2.6c-3-1.4-7.2-4.1-9.3-6-2.1-1.9-5.1-5.9-9.2-14.4v-137c0-136.2 0-137 2.1-141.5 1.1-2.5 3.8-6.5 6-8.9 2.1-2.4 5.7-5.3 7.9-6.4 2.2-1.1 5.1-2.4 6.5-2.8 1.4-0.4 34.5-0.7 144.5-0.4z"
                  />
              </svg>
            </Link>
          </div>

          {/* Colour Button */}
          <div className="flex items-center">                 
              <button
                className="button button-secondary text-lg lg:text-xl px-4 lg:px-6 py-2 font-bold"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                Couleurs
              </button>
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
                      className="absolute left-0 right-0 w-full flex justify-center items-center text-center text-xs md:text-sm lg:text-lg font-bold whitespace-nowrap"
                      style={{ color: 'var(--color-sc-secondary)' }}
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
                    className="absolute left-0 right-0 w-full flex justify-center items-center text-center text-xs md:text-sm lg:text-lg font-bold whitespace-nowrap"
                    style={{ color: 'var(--color-sc-secondary)' }}
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
                className="mr-2 md:mr-3 lg:mr-5 w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7"
                style={{ color: 'var(--color-sc-secondary)' }}
              >
                <line x1="2" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Popup Menu */}
            {showPopup && (
              <div 
                className="absolute top-full right-0 mt-6 md:mt-8 lg:mt-10 shadow-lg min-w-[120px] md:min-w-[140px] lg:min-w-[180px] z-20"
                style={{ 
                  backgroundColor: 'var(--color-sc-primary)',
                  color: 'var(--color-sc-secondary)'
                }}
                onMouseLeave={() => setShowPopup(false)}
              >
                {screenNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`w-full text-left px-2 md:px-3 lg:px-5 py-1 md:py-2 lg:py-4 text-xs md:text-sm lg:text-lg font-medium transition-colors hover:bg-sc-tertiary/9 ${
                      current === index && 'bg-sc-tertiary/9'
                    }`}
                    style={{
                      color: 'var(--color-sc-secondary)'
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Picker */}
          {showColorPicker && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
              <ColorPicker onClose={() => setShowColorPicker(false)} />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
