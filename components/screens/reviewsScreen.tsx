"use client";

import { useState, useEffect } from "react";

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

  return (
    <div className="screen-container">
        <div className="screen-content">
            <h1 className="text-2xl font-bold mb-6">Product Reviews</h1>

      
            {/* Carousel Section */}
            <div className=" max-w-sm sm:max-w-none sm:min-w-[35vw] lg:min-w-[600px] flex flex-col bg-sc-primary p-2 sm:p-4 lg:p-8 sm:-mr-4 lg:-mr-10 sm:-mb-30 lg:-mb-40">
                {/* Title on top of the box */}
                <div className="title-container">
                    <h1 className="title-text text-sc-secondary">
                        Ils nous font confiance
                    </h1>
                </div>
          
                <div className="content-box flex-grow h-[30vh] sm:h-[40vh] px-2 z-10 flex flex-col">
                    {/* Carousel Container - takes remaining space */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-hidden relative">
                            <div 
                                data-carousel
                                className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'} cursor-grab active:cursor-grabbing select-none`}
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
                                            <blockquote className="text-xs lg:text-sm text-sc-tertiary leading-relaxed text-left italic">
                                                {testimonial.quote}
                                            </blockquote>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                          
                        {/* Bottom section: Author & Position with sliding animation */}
                        <div className="border-t border-sc-secondary pt-1 lg:pt-5 mt-auto overflow-hidden">
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
                                        <h4 className="font-bold text-sc-secondary text-xs md:text-sm lg:text-xl xl:text-2xl text-left">
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-sc-tertiary text-xs lg:text-sm text-left font-medium">
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
                            currentSlide === index ? 'bg-[#012073] w-6' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
        </div>
    </div>
  );
}
