"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Hexagon from "../svgs/hexagone";

export default function ReviewsScreen() {
  const [rating, setRating] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0)
  const [review, setReview] = useState("");
  const [name, setName] = useState("");  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const [shadowTime, setShadowTime] = useState(0)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }
    }, 5000); // 5 seconds
    
    return () => clearInterval(interval);
  }, [isDragging])

  // Set mounted state and update shadow animation
  useEffect(() => {
    setHasMounted(true);
    
    // Update shadow animation every frame
    const interval = setInterval(() => {
      setShadowTime(Date.now());
    }, 16); // ~60fps
    
    // Initialize shadow visibility on mount
    setTimeout(() => {
      const scrollContainers = document.querySelectorAll('[data-carousel] > div > div');
      scrollContainers.forEach((container, index) => {
        const element = container as HTMLElement;
        const shadow = element.nextElementSibling as HTMLElement;
        if (shadow && element) {
          const isScrollable = element.scrollHeight > element.clientHeight;
          shadow.style.opacity = isScrollable ? '1' : '0';
        }
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Touch/Mouse event handlers
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setStartPos(clientX)
    const containerWidth = (e.currentTarget as HTMLElement).offsetWidth
    setCurrentTranslate(-currentSlide * containerWidth)
    setPrevTranslate(-currentSlide * containerWidth)
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - startPos
    setCurrentTranslate(prevTranslate + diff)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const threshold = 50 // Minimum distance to trigger slide change
    const diff = currentTranslate - prevTranslate
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped right (previous slide)
        prevSlide()
      } else {
        // Swiped left (next slide)
        nextSlide()
      }
    }
    
    // Reset for next interaction
    setCurrentTranslate(-currentSlide * (document.querySelector('[data-carousel]') as HTMLElement)?.offsetWidth || 0)
    setPrevTranslate(-currentSlide * (document.querySelector('[data-carousel]') as HTMLElement)?.offsetWidth || 0)
  }

  const testimonials = [
    {
      quote: "« Enfin, une approche de management pleine de bon sens qui replace vraiment l'homme au cœur du système et l'entreprise dans sa fonction première : développer un projet commun ! Avec l'homme au centre, l'Ecologie « humaine » devient une évidence, un objectif à atteindre et protéger ensemble. »",
      author: "Jean-Marie Clément",
      position: "DG, La Table de Cana, entreprise sociale et solidaire"
    },
    {
      quote: "« Spire offre à la fois un diagnostic pertinent et une formation au management par la subsidiarité. De plus, ils accompagnent aussi patiemment la mise en œuvre concrète de la formation, de telle sorte que l'évolution est réelle, au points d'être mesurée par des KPI précis. Leurs plateforme digitale permet un accompagnement sérieux et l'apport de nombreuses ressources. L'offre Spire allie le profond respect des personnes, des relations professionnelles respectueuses et ajustées, des interactions positives visibles sur la société, l'environnement et les partenaire de l'entreprise. »",
      author: "Matthieu BOUTON",
      position: "Directeur Commercial et Marketing Vidéo & VOD TF1 STUDIO"
    },
    {
      quote: "« Nous voulons donner plus de sens à notre façon de manager. Pour moi les plus du management par la subsidiarité c'est l'implication des collaborateurs, ce sens des responsabilités, cette motivation supplémentaire que ça leur donne parce qu'ils font réellement partie de la dynamique de l'entreprise ils s'inscrivent complètement dans son développement, ils en sont acteurs. »",
      author: "Johanna",
      position: "Directrice Générale"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, review, name });
  };

  const hexPositions = [
    { col: 1,  rows: [2, 4] },
    { col: 4,  rows: [1, 3] },
    { col: 7,  rows: [2, 4] },
    { col: 10, rows: [3, 5] },
    { col: 13, rows: [2, 4] },
    { col: 16, rows: [1, 3] },
    { col: 19, rows: [2, 4] },
    { col: 22, rows: [3, 5] },
    { col: 25, rows: [2, 4] },
    { col: 28, rows: [1, 3] },
    { col: 31, rows: [2, 4] },
    { col: 34, rows: [3, 5] },
    { col: 37, rows: [2, 4] },
    { col: 40, rows: [1, 3] },
    { col: 43, rows: [2, 4] },
    { col: 46, rows: [3, 5] },
    { col: 49, rows: [2, 4] },
    { col: 52, rows: [1, 3] },
    { col: 55, rows: [2, 4] },
    { col: 58, rows: [3, 5] },
    { col: 61, rows: [2, 4] },
    { col: 64, rows: [1, 3] },
    { col: 67, rows: [2, 4] },
  ];

  const hexImages = [
    'logoBatiss.jpg',
    'logoBeychevelle.png',
    'logoCaissedEpargne.png',
    'logoDentMaster.png',
    'logoDynaren.png',
    'logoGlevents.jpg',
    'logoKayentis.png',
    'logoMieuxVivre.jpg',
    'logoSpatiotempo.png',
    'logoU.png'
  ]

  // Create a component for the grid content to avoid duplication
  const GridContent = () => (
    <>
      {hexPositions.map(({ col, rows }, idx) =>
        rows.map((row, i) => {
          const imageIndex = (idx * 2 + i) % hexImages.length;
          const imagePath = `/brands/${hexImages[imageIndex]}`;
          
          return (
            <div
              key={`${idx}-${i}`}
              style={{
                gridColumnStart: col,
                gridColumnEnd: col + 4,
                gridRowStart: row,
                gridRowEnd: row + 2,
                color: 'var(--color-sc-primary)',
              }}
              className="aspect-square rotate-90 p-1 relative"
            >
              <Hexagon 
                className="size-32" 
                imageSrc={imagePath}
                imageAlt={`Brand ${imageIndex + 1}`}
                imageStyle={{
                  transform: 'scale(1) translate(0%, 0%)',
                  transformOrigin: 'center',
                }}
                preserveAspectRatio='meet'
              />
            </div>
          );
        })
      )}
    </>
  );

  return (
    <div 
        className="screen-container" 
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)' }}
        data-screen="reviews"
    >
        <div className="screen-content relative">

            {/* Infinite Scrolling Grid Section */}
            <div className="absolute top-0 w-full h-fit z-10 -translate-x-full">
              <div 
                className="grid grid-cols-72 grid-rows-6 gap-12"
                style={{
                  width: '400%',
                  animation: 'scroll 30s linear infinite',
                }}
              >
                {/* First set of hexagons */}
                <GridContent />
                {/* Second set of hexagons (duplicate for seamless loop) */}
                <GridContent />
              </div>
            </div>

            {/* Add CSS animation for infinite scroll */}
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style>
            
            {/* Video Section */}
            <div className="absolute top-1/2 -translate-y-full right-0 aspect-video w-[90%] sm:w-[60%] md:w-[70%] z-30 overflow-hidden" style={{ boxShadow: `0.20rem 0.20rem color-mix(in srgb, var(--color-sc-secondary) 80%, transparent)` }}>
                <iframe
                    src="https://www.youtube.com/embed/ZAmK31x3qDs"
                    title="Témoignage Spire Conseil"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Carousel Section */}
            <div 
                className="absolute bottom-1/2 translate-y-full left-0 w-[90%] sm:w-[80%] lg:w-[70%] z-20 !aspect-video flex flex-col p-2 sm:p-4 lg:p-8"
                style={{ backgroundColor: 'var(--color-sc-secondary)' }}
            >
                {/* Title on top of the box */}
                <div className="title-container">
                    <h1 className="title-text" style={{ color: 'var(--color-sc-primary)' }}>
                        Ils nous font confiance
                    </h1>
                </div>
          
                <div className="flex-grow h-[30vh] sm:h-[30vh] px-2 z-10 flex flex-col">
                    {/* Carousel Container - takes remaining space */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-hidden relative">
                            <div 
                                data-carousel
                                className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'} cursor-grab active:cursor-grabbing select-none`}
                                style={{ 
                                    transform: isDragging 
                                    ? `translateX(${currentTranslate}px)` 
                                    : `translateX(-${currentSlide * 100}%)`,
                                }}
                                onMouseDown={handleStart}
                                onMouseMove={handleMove}
                                onMouseUp={handleEnd}
                                onMouseLeave={handleEnd}
                                onTouchStart={handleStart}
                                onTouchMove={handleMove}
                                onTouchEnd={handleEnd}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div 
                                        key={index}
                                        className="w-full flex-shrink-0 p-1 relative"
                                    >
                                        <div 
                                            className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${isDragging ? 'pointer-events-none' : 'pointer-events-auto'}`}
                                            onScroll={(e) => {
                                                const element = e.currentTarget;
                                                const shadow = element.nextElementSibling as HTMLElement;
                                                if (shadow) {
                                                    const isScrollable = element.scrollHeight > element.clientHeight;
                                                    const isScrolledToBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
                                                    shadow.style.opacity = (isScrollable && !isScrolledToBottom) ? '1' : '0';
                                                }
                                            }}
                                        >
                                            <blockquote className="text-xs lg:text-sm leading-relaxed text-left italic" style={{ color: 'var(--color-sc-quaternary)' }}>
                                                {testimonial.quote}
                                            </blockquote>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                          
                        {/* Bottom section: Author & Position with sliding animation */}
                        <div 
                            className="border-t pt-1 lg:pt-5 mt-auto overflow-hidden" 
                            style={{ borderColor: 'var(--color-sc-primary)' }}
                        >
                            <div 
                                className={`flex ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
                                style={{ 
                                    transform: isDragging 
                                    ? `translateX(${currentTranslate}px)` 
                                    : `translateX(-${currentSlide * 100}%)` 
                                }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <h4 className="font-bold text-xs md:text-sm lg:text-xl xl:text-2xl text-left" style={{ color: 'var(--color-sc-primary)' }}>
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-xs lg:text-sm text-left font-medium" style={{ color: 'var(--color-sc-quaternary)' }}>
                                            {testimonial.position}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
          
            {/* Navigation Dots - Outside and under the box */}
            <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 transition-all duration-300 ${
                            currentSlide === index ? 'bg-sc-primary w-6' : 'bg-sc-quaternary'
                        }`}
                    />
                ))}
            </div>
        </div>
        </div>
    </div>
  );
}
