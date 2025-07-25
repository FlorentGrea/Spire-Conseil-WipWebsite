"use client"

export default function FooterScreen() {
  return (
    <div className="screen-container relative" data-screen="footer">
      <div className="screen-content flex-col h-full">
        
        {/* Contact Info Section */}
        <div className="flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-lg">
                      <div className="title-container">
            <h2 className="title-text text-sc-secondary">
              Échangeons de vive voix
            </h2>
          </div>
          
                      <div className="content-box w-full">
            <div className="flex flex-col items-center text-center">
              
              <div className="space-y-3 lg:space-y-6 w-full">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#012073] rounded-full flex items-center justify-center mr-3 lg:mr-4">
                    <svg 
                      className="w-3 h-3 lg:w-4 lg:h-4 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      style={{ filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))' }}
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a href="mailto:contact@spire-conseil.fr" className="text-sc-tertiary hover:text-[#012073] transition-colors text-sm lg:text-xl font-medium">
                    contact@spire-conseil.fr
                  </a>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#012073] rounded-full flex items-center justify-center mr-3 lg:mr-4">
                      <svg 
                        className="w-3 h-3 lg:w-4 lg:h-4 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        style={{ filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.8))' }}
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a href="tel:0651464048" className="text-sc-tertiary hover:text-[#012073] transition-colors font-semibold text-sm lg:text-xl">
                      06 51 46 40 48
                    </a>
                  </div>
                  <p className="text-sc-tertiary text-xs lg:text-sm mt-1 ml-9 lg:ml-12">
                    Du lundi au vendredi 9h 17h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section - Always at bottom */}
        <footer className="absolute bottom-0 w-full mb-2 max-w-6xl">
          <div className="border-t border-gray-200 pt-2">
            <div className="flex flex-col items-center text-center space-y-1 lg:space-y-2">
              
              {/* Logo and Company Name */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl lg:text-3xl font-bold text-[#012073]">
                  SPIRE
                </div>
                <div className="text-2xl lg:text-3xl text-sc-tertiary">
                  - CONSEIL
                </div>
              </div>
              
              {/* Tagline */}
                              <p className="text-xs lg:text-lg text-sc-tertiary max-w-md">
                Accompagnement en management subsidiaire pour organisations responsables
              </p>
              
              {/* Copyright */}
                              <div className="text-xs lg:text-sm text-sc-tertiary">
                © {new Date().getFullYear()} SPIRE CONSEIL. Tous droits réservés.
              </div>
              
            </div>
          </div>
        </footer>
        
      </div>
    </div>
  );
} 