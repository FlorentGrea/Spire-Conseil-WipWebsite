"use client"

export default function SubsidiariteScreen() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="subsidiarite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">
          Notre methode innovante : la Subsidiarité
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl">
          {/* Content Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Notre Approche
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Placeholder Image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}