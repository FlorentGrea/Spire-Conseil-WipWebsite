"use client"

import { useEffect, useState } from "react"
import { useMousePosition } from "../utils/mouseCoordinates"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function TemoignagesScreen() {
  const [api, setApi] = useState<unknown>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const mousePosition = useMousePosition()

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (api && typeof (api as { scrollNext: Function }).scrollNext === "function") {
      (api as { scrollNext: () => void }).scrollNext()
    }
  }, [api])

  // Set mounted state
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Track current slide for animations
  useEffect(() => {
    if (api && typeof (api as { on: Function }).on === "function") {
      const onSelect = () => {
        setCurrentSlide((api as { selectedScrollSnap: () => number }).selectedScrollSnap())
      }
      (api as { on: (event: string, cb: () => void) => void }).on('select', onSelect)
      return () => (api as { off: (event: string, cb: () => void) => void }).off('select', onSelect)
    }
  }, [api])

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

  // Function to calculate dynamic shadow for video
  const getDynamicShadow = () => {
    if (!hasMounted || mousePosition.x === 0 && mousePosition.y === 0) return 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))';
    
    // Calculate the normalized position of the mouse in the browser window
    const xPercent = mousePosition.x / window.innerWidth - 0.5;
    const yPercent = mousePosition.y / window.innerHeight - 0.5;
    
    const moveX = xPercent * 20;
    const moveY = yPercent * 20;
    
    // Create a gradient-like effect by alternating colors
    const intensity = Math.abs(xPercent) + Math.abs(yPercent);
    const blueIntensity = Math.max(0, 1 - intensity);
    const yellowIntensity = Math.min(1, intensity);
    
    // Blend the colors based on mouse position with more vibrant colors
    const blendedColor = `rgba(${Math.round(0 * blueIntensity + 255 * yellowIntensity)}, ${Math.round(50 * blueIntensity + 255 * yellowIntensity)}, ${Math.round(150 * blueIntensity + 0 * yellowIntensity)}, 0.9)`;
    
    return `drop-shadow(${moveX}px ${moveY}px 8px ${blendedColor})`;
  };

  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border" data-screen="temoignages">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Ils nous font confiance
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl items-center">
          {/* Video Section */}
          <div className="flex-1 flex items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden" style={{ filter: getDynamicShadow() }}>
              <iframe
                src="https://www.youtube.com/embed/ZAmK31x3qDs"
                title="Témoignage Spire Conseil"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          
          {/* Carousel Section */}
          <div className="flex-1 flex items-center">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="w-full max-w-[calc(100%-6rem)] h-[450px]"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-0 h-[450px]">
                    <div 
                      className={`bg-white p-6 rounded-lg h-full flex flex-col justify-center transition-all duration-700 ease-in-out ${
                        currentSlide === index 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-60 scale-95'
                      }`}
                    >
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                        {testimonial.quote}
                      </blockquote>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.author}
                        </h4>
                        <small className="text-gray-600">
                          {testimonial.position}
                        </small>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}