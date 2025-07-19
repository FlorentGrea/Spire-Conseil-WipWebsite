"use client"

import { useEffect, useState } from "react"
import { useMousePosition } from "../../utils/mouseCoordinates"
import { getDynamicShadow } from "../../utils/dynamicShadow"


export default function TemoignagesScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const [shadowTime, setShadowTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)
  const mousePosition = useMousePosition()

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

  return (
    <div className="flex items-center justify-center w-full h-screen snap-start" data-screen="temoignages">
      <div className="flex flex-col sm:flex-row-reverse sm:justify-stretch items-center justify-center gap-8 lg:gap-12 sm:max-w-6xl px-4 sm:px-6 lg:px-8">
      
        {/* Video Section */}
          <div className="aspect-video w-full max-w-sm sm:min-w-[300px] lg:min-w-[500px] z-10 rounded-lg overflow-hidden" style={{ boxShadow: `0 6px 8px -1px ${getDynamicShadow(hasMounted, shadowTime)}, 0 4px 6px -1px ${getDynamicShadow(hasMounted, shadowTime)}` }}>
          <iframe
            src="https://www.youtube.com/embed/ZAmK31x3qDs"
            title="Témoignage Spire Conseil"
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
          
        {/* Carousel Section */}
        <div className="max-w-sm sm:max-w-none h-[40vh] sm:h-[60vh] px-2 z-10 border-2 border-[#012073] rounded-lg p-4 bg-white overflow-hidden">
          <h1 className="text-lg lg:text-4xl font-bold text-[#012073] text-center sm:text-left leading-tight">
            Ils nous font confiance
          </h1>
          {/* Custom Carousel with Swipe */}
          <div className="relative w-full overflow-hidden">
            {/* Carousel Container */}
            <div 
              data-carousel
              className={`flex ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'} cursor-grab active:cursor-grabbing select-none`}
              style={{ 
                transform: isDragging 
                  ? `translateX(${currentTranslate}px)` 
                  : `translateX(-${currentSlide * 100}%)` 
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
                  className="flex flex-col justify-between w-full flex-shrink-0 p-2 pointer-events-none"
                >
                  <blockquote className="text-xs lg:text-sm text-gray-700 leading-relaxed mb-1 text-left italic line-clamp-4 lg:line-clamp-none">
                   {testimonial.quote}
                  </blockquote>
                  <div className="border-t border-gray-200 pt-3 lg:pt-5">
                    <h4 className="font-bold text-[#012073] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-left mb-1">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-600 text-xs lg:text-sm text-left font-medium">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#012073] w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}