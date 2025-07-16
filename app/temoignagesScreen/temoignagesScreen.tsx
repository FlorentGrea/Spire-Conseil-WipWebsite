"use client"

import { useEffect, useState } from "react"
import { useMousePosition } from "../../utils/mouseCoordinates"
import { getDynamicShadow } from "../../utils/dynamicShadow"
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
  const [shadowTime, setShadowTime] = useState(0)
  const mousePosition = useMousePosition()

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (api && typeof (api as { scrollNext: Function }).scrollNext === "function") {
      (api as { scrollNext: () => void }).scrollNext()
    }
  }, [api])

  // Set mounted state and update shadow animation
  useEffect(() => {
    setHasMounted(true);
    
    // Update shadow animation every frame
    const interval = setInterval(() => {
      setShadowTime(Date.now());
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
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

  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-0 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border" data-screen="temoignages">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#012073] mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-center px-2">
          Ils nous font confiance
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center">
          {/* Video Section */}
          <div className="flex-1 flex items-center justify-center w-full lg:w-auto">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none aspect-video rounded-lg sm:rounded-xl overflow-hidden" style={{ boxShadow: `0 6px 8px -1px ${getDynamicShadow(hasMounted, shadowTime)}, 0 4px 6px -1px ${getDynamicShadow(hasMounted, shadowTime)}` }}>
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
          <div className="flex-1 flex items-center justify-center w-full lg:w-auto px-2 sm:px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none"
            >
              <CarouselContent className="overflow-visible -ml-2 sm:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 pr-2 sm:pr-4">
                    <div 
                      className={`bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex flex-col justify-between transition-all duration-700 ease-in-out ${
                        currentSlide === index 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-60 scale-95'
                      }`}
                    >
                      <blockquote className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 flex-grow text-left">
                        {testimonial.quote}
                      </blockquote>
                      <div className="border-t border-gray-200 pt-3 sm:pt-4">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base lg:text-lg text-left">
                          {testimonial.author}
                        </h4>
                        <small className="text-gray-600 text-xs sm:text-sm text-left">
                          {testimonial.position}
                        </small>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}