"use client"

import { useState, useEffect } from "react";

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



  return (
    <div className="flex items-center justify-center w-full h-screen snap-start" data-screen="contact">
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-12 sm:max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Left Section - Contact Info */}
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-sm sm:max-w-md lg:max-w-none">
          <div className="border-2 border-[#012073] rounded-lg p-4 bg-white w-full">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-x-4 md:gap-x-6">
              {/* Left side - Contact info */}
              <div className="flex-1">
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#012073] rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-4xl font-bold text-[#012073]">Échangeons de vive voix</h2>
                    <p className="text-gray-700 text-xs lg:text-xl">Lundi au vendredi, 9h-17h</p>
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#012073] rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3">
                      <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a href="mailto:contact@spire-conseil.fr" className="text-gray-700 hover:text-[#012073] transition-colors text-xs lg:text-xl break-all">
                      contact@spire-conseil.fr
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#012073] rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3">
                      <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a href="tel:0651464048" className="text-gray-700 hover:text-[#012073] transition-colors font-semibold text-xs lg:text-xl">
                      06 51 46 40 48
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
                {/* Right Section - Contact Form */}
        <div className="flex-1 flex flex-col max-w-sm sm:max-w-lg lg:max-w-none">
          {/* Title on top of the box */}
          <div className="w-full h-fit p-2 z-10 bg-[#012073] mb-4">
            <h2 className="text-lg lg:text-4xl font-bold text-white text-center lg:text-left">
              Écrivez-nous
            </h2>
          </div>
          
          <div className="border-2 border-[#012073] rounded-lg p-4 bg-white w-full flex-grow">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Nom et prénom *</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Email *</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Téléphone</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
               
              <div>
                <label className="block text-xs lg:text-xl font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-2">Message</label>
                <textarea
                  className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 min-h-[50px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] resize-none text-xs lg:text-xl"
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
                  <label className="text-xs lg:text-xl text-gray-600">
                    Je souhaite être tenu informé des prochaines publications de SPIRE.
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#012073] text-white font-bold py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg hover:bg-[#1e40af] transition-all duration-300 text-xs lg:text-xl"
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
