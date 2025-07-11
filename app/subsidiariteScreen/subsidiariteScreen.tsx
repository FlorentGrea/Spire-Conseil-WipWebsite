"use client"

import { useState, useEffect } from "react"

export default function SubsidiariteScreen() {
  return (
    <div className="flex flex-col items-center w-full h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="subsidiarite">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Notre methode innovante : la Subsidiarité
        </h1>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-center justify-center mt-8 sm:mt-12 md:mt-16">
          {/* Content Section */}
          <div className="flex-1 min-w-[220px] max-w-xl w-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Notre Approche
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-xs aspect-square">
              <img 
                src="/spire-dominos_bc.jpg" 
                alt="Spire Dominos" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* White overlay with hexagonal hole */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <mask id="hex-mask">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <polygon 
                      points="70,50 60,67.32 40,67.32 30,50 40,32.68 60,32.68" 
                      fill="black" 
                    />
                  </mask>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="white" mask="url(#hex-mask)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

