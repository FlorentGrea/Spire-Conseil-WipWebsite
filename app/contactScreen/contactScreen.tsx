"use client"

import { useState, useEffect } from "react";
import { useMousePosition } from "../../utils/mouseCoordinates";

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
    accept: false,
  });
  const [status, setStatus] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const mousePosition = useMousePosition();

  // Set mounted state
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email || !form.accept) {
      setStatus("Veuillez remplir tous les champs obligatoires et accepter la politique.");
      return;
    }
    setStatus("Envoi en cours...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("Message envoyé ! Merci.");
      setForm({ name: "", email: "", phone: "", message: "", subscribe: false, accept: false });
    } else {
      setStatus("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  // Function to calculate dynamic shadow for form
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
    
    // Blend the colors based on mouse position with brand colors
    const blendedColor = `rgba(${Math.round(1 * blueIntensity + 247 * yellowIntensity)}, ${Math.round(32 * blueIntensity + 228 * yellowIntensity)}, ${Math.round(115 * blueIntensity + 0 * yellowIntensity)}, 0.9)`;
    
    return `drop-shadow(${moveX}px ${moveY}px 8px ${blendedColor})`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full snap-start box-border" data-screen="contact">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-y-6 md:gap-y-0 md:gap-x-8">
        
        {/* Left Section - Contact Info */}
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-sm sm:max-w-md lg:max-w-none">
                    <div className="bg-gradient-to-br from-[#012073] to-[#1e40af] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 text-white w-full" style={{ filter: getDynamicShadow() }}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-x-4 md:gap-x-6">
              {/* Left side - Contact info */}
              <div className="flex-1 min-w-[180px]">
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#f7e400] rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#012073]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold">Échangeons de vive voix</h2>
                    <p className="text-blue-100 text-xs sm:text-sm">Lundi au vendredi, 9h-17h</p>
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#f7e400] rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3">
                      <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[#012073]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a href="mailto:contact@spire-conseil.fr" className="text-blue-100 hover:text-[#f7e400] transition-colors text-xs sm:text-sm md:text-base break-all">
                      contact@spire-conseil.fr
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#f7e400] rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3">
                      <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[#012073]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a href="tel:0651464048" className="text-blue-100 hover:text-[#f7e400] transition-colors font-semibold text-xs sm:text-sm md:text-base">
                      06 51 46 40 48
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right side - Promise box */}
              <div className="w-full max-w-full">
                <div className="w-full max-w-full p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg flex flex-col justify-center overflow-hidden">
                  <h3 className="font-semibold mb-1 text-xs sm:text-sm md:text-base whitespace-normal break-words">
                    Réponse garantie sous 48h
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm leading-tight whitespace-normal break-words">
                    Notre équipe s'engage à vous répondre dans les plus brefs délais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
                {/* Right Section - Contact Form */}
        <div className="flex-1 flex items-center justify-center max-w-sm sm:max-w-lg lg:max-w-none">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-full shadow-xl" style={{ filter: getDynamicShadow() }}>
            <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#012073] rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
                             <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-[#012073]">Écrivez-nous</h2>
            </div>
            
                                      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
               <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
                 <div>
                   <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Nom et prénom *</label>
                   <input
                     className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs sm:text-xs md:text-sm"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     placeholder="Votre nom complet"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Téléphone</label>
                   <input
                     className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs sm:text-xs md:text-sm"
                     name="phone"
                     value={form.phone}
                     onChange={handleChange}
                     placeholder="06 12 34 56 78"
                   />
                 </div>
               </div>
               
               <div>
                 <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Email *</label>
                 <input
                   className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs sm:text-xs md:text-sm"
                   name="email"
                   type="email"
                   value={form.email}
                   onChange={handleChange}
                   placeholder="votre@email.com"
                   required
                 />
               </div>
               
                                <div>
                   <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Message</label>
                   <textarea
                     className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 min-h-[50px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] resize-none text-xs sm:text-xs md:text-sm"
                     name="message"
                     value={form.message}
                     onChange={handleChange}
                     placeholder="Décrivez votre projet ou votre besoin..."
                   />
                 </div>
               
               <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="subscribe" 
                    checked={form.subscribe} 
                    onChange={handleChange} 
                    className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4 text-[#012073] border-gray-300 rounded focus:ring-[#012073]"
                  />
                  <label className="text-xs sm:text-xs md:text-sm text-gray-600">
                    Je souhaite être tenu informé des prochaines publications de SPIRE.
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="accept" 
                    checked={form.accept} 
                    onChange={handleChange} 
                    className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4 text-[#012073] border-gray-300 rounded focus:ring-[#012073]"
                    required 
                  />
                  <label className="text-xs sm:text-xs md:text-sm text-gray-600">
                    En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées pour permettre de me recontacter dans le cadre de la relation commerciale qui découle de cette demande.
                  </label>
                </div>
              </div>
              
                             <button 
                 type="submit" 
                 className="w-full bg-gradient-to-r from-[#012073] to-[#1e40af] text-white font-bold py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg hover:from-[#1e40af] hover:to-[#012073] transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-xs md:text-sm lg:text-base"
               >
                 ENVOYER LE MESSAGE
               </button>
              
              {status && (
                <div className={`mt-4 p-4 rounded-lg text-sm ${
                  status.includes("envoyé") 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : status.includes("Erreur") 
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
