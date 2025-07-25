"use client"

import { useState } from "react";

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
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
    if (!form.name || !form.email) {
      setStatus("Veuillez remplir tous les champs obligatoires.");
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
      setForm({ name: "", email: "", phone: "", message: "", subscribe: false });
    } else {
      setStatus("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };



  return (
    <div className="screen-container" data-screen="contact">
      <div className="screen-content flex-col">
        
        {/* Contact Form Section */}
        <div className="flex flex-col items-center justify-center max-w-sm sm:max-w-lg lg:max-w-xl">
          {/* Title on top of the box */}
          <div className="title-container">
            <h2 className="title-text text-sc-secondary">
              Écrivez-nous
            </h2>
          </div>
          
          <div className="content-box w-full flex-grow">
            <form onSubmit={handleSubmit} className="space-y-2 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 lg:gap-4">
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-sc-tertiary mb-0.5">Nom et prénom *</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-sc-tertiary mb-0.5">Email *</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-xl font-medium text-sc-tertiary mb-0.5">Téléphone</label>
                  <input
                    className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
               
              <div>
                <label className="block text-xs lg:text-xl font-medium text-sc-tertiary mb-0.5">Message</label>
                <textarea
                  className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 min-h-[50px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] resize-none text-xs lg:text-xl"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre besoin..."
                />
              </div>
               
              <div className="flex flex-row items-center justify-start">
                <input 
                  type="checkbox" 
                  name="subscribe" 
                  checked={form.subscribe} 
                  onChange={handleChange} 
                  className="mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4 text-[#012073] border-gray-300 focus:ring-[#012073]"
                />
                                  <label className="text-xs lg:text-xl text-sc-tertiary">
                  Je souhaite être tenu informé des prochaines publications de SPIRE.
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#012073] text-white font-bold py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 hover:bg-[#1e40af] transition-all duration-300 text-xs lg:text-xl"
              >
                ENVOYER LE MESSAGE
              </button>
              
              {status && (
                <div className={`mt-4 p-4 text-sm ${
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
