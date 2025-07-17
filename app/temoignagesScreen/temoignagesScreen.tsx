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
    if (!api) return;
    
    const interval = setInterval(() => {
      if (api && typeof (api as { scrollNext: Function }).scrollNext === "function") {
        (api as { scrollNext: () => void }).scrollNext()
      }
    }, 5000); // 5 seconds
    
    return () => clearInterval(interval);
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
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full items-center justify-center">
          {/* Video Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
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
          <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">
              <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-[#012073] mb-3 sm:mb-4 text-center px-2 mt-4 sm:mt-6 md:mt-8">
                Ils nous font confiance
              </h1>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent className="overflow-visible -ml-2 sm:-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-2 sm:pl-4 pr-2 sm:pr-4">
                      <div 
                        className={`bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] flex flex-col justify-between transition-all duration-700 ease-in-out ${
                          currentSlide === index 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-60 scale-95'
                        }`}
                      >
                        <div className="flex-grow">
                          <blockquote className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-left italic">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                        <div className="border-t border-gray-200 pt-3 sm:pt-4 md:pt-5">
                          <h4 className="font-bold text-[#012073] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-left mb-1">
                            {testimonial.author}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-left font-medium">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}