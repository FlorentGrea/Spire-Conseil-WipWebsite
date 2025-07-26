'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div 
      className="screen-container"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)' }}
      data-screen="contact"
    >
        <div className="relative screen-content flex flex-col gap-4">
            <svg 
                viewBox="0 0 1057 1100" 
                width="1057" 
                height="1100" 
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-full z-10"
                style={{ fill: 'var(--color-sc-primary)' }}
            >
        	    <path d="m419 208c-58.6 5.4-113 10.3-121 10.9-9.7 0.8-15.8 1.7-18.5 2.9-2.2 1-6 3.6-8.4 5.8-2.6 2.3-5.6 6.4-7.3 9.9-2.2 4.7-2.8 7.5-2.8 12.5 0 3.6 0.6 8.3 1.3 10.5 0.8 2.2 11.5 18.6 23.8 36.5 16.4 23.9 22.3 33.3 22.3 35.5 0.1 2.4-0.8 3.6-4.8 6.5-2.7 1.9-10.1 7.4-16.5 12.1-6.4 4.7-16.5 13-22.6 18.5-6 5.4-14.9 14.4-19.8 19.9-4.9 5.5-12.3 14.6-16.5 20.2-4.3 5.6-10.6 14.8-14.1 20.5-3.6 5.7-9.1 15.5-12.3 21.8-3.2 6.3-8 17.1-10.7 24-2.7 6.9-6.5 17.7-8.4 24-2 6.3-4.7 17.4-6.1 24.5-1.4 7.1-3.3 18.9-4.1 26-0.8 7.1-1.5 21.5-1.5 32 0 10.8 0.7 24.8 1.6 32.5 0.8 7.4 2.7 18.9 4.1 25.5 1.3 6.6 4 17.2 5.8 23.5 1.8 6.3 5.4 16.9 8 23.5 2.6 6.6 8.2 18.7 12.4 27 4.2 8.2 11.2 20.4 15.6 27 4.4 6.6 11.4 16.3 15.6 21.5 4.2 5.2 11.7 13.8 16.6 19 5 5.2 13.5 13.4 18.9 18.1 5.4 4.7 14.2 11.7 19.4 15.6 5.2 3.8 13.1 9.2 17.5 12 4.4 2.7 12.7 7.5 18.5 10.6 5.8 3 15.4 7.7 21.5 10.2 6.1 2.6 16.2 6.4 22.5 8.5 6.3 2.1 16.4 5 22.5 6.5 9.7 2.3 12.1 3.3 20.5 8.9 5.2 3.4 14.4 9 20.5 12.4 6.1 3.4 16.7 8.7 23.8 11.7 7 3 18.7 7.5 26 9.9 7.2 2.4 18.4 5.5 24.7 7 6.3 1.4 15.8 3.2 21 4 5.2 0.9 14.9 2 21.5 2.6 6.6 0.5 17.2 1 23.5 1 6.3 0 16.7-0.5 23-1 6.3-0.6 17.1-2 24-3.1 6.9-1.1 18.4-3.5 25.5-5.4 7.1-1.8 18-5.1 24-7.3 6-2.2 15.5-5.9 21-8.4 5.5-2.4 14.5-7 20-10 5.5-3.1 14-8.3 19-11.6 5-3.2 13.3-9.2 18.5-13.3 5.2-4 14.8-12.5 21.4-18.9 6.5-6.3 15.3-15.5 19.6-20.5 4.2-5 10.8-13.3 14.7-18.5 3.9-5.2 10.1-14.5 13.8-20.5 3.8-6 10.1-17.5 14.1-25.5 3.9-8 9.7-20.8 12.7-28.5 3.1-7.7 7.4-20.1 9.6-27.5 2.3-7.4 5.7-20.7 7.6-29.5 1.8-8.8 4.1-21.1 4.9-27.3 0.9-6.1 2-19.2 2.5-28.9 0.6-11.2 0.6-24.1 0.1-34.8-0.6-9.4-1.7-22.4-2.6-29-0.8-6.6-2.7-17.6-4.1-24.5-1.4-6.9-4.3-18.8-6.5-26.5-2.2-7.7-6.4-20.3-9.5-28-3-7.7-8.5-19.8-12.1-27-3.7-7.1-10-17.9-14.1-24-4-6-10.1-14.4-13.6-18.5-3.4-4.1-10.4-11.5-15.6-16.3-5.2-4.9-13.9-11.9-19.4-15.6-5.5-3.8-11.8-7.4-14-8.1-2.3-0.7-6.6-1.1-10-0.8-5.6 0.4-8.1 1.6-40 19.8-18.7 10.6-35.4 20.3-37 21.5-1.6 1.2-4.2 4.6-5.8 7.6-2.1 4.1-2.7 6.8-2.7 11.4 0 3.7 0.8 7.6 1.9 10 1 2.2 5.5 10.1 10.1 17.5 4.5 7.4 11.9 20.9 16.5 30 4.6 9.1 10.3 21.4 12.8 27.5 2.5 6 5.9 15.3 7.7 20.5 1.7 5.2 4.2 13.8 5.5 19 1.3 5.2 3.1 14.7 4.1 21 1.3 8.9 1.5 15.5 1.1 29.5-0.3 9.9-1.3 22.7-2.2 28.5-0.9 5.8-3.1 16.4-5 23.5-1.8 7.1-4.9 17.5-6.9 23-2.1 5.5-7 16.7-11.1 25-4.1 8.2-10.8 20.2-15 26.5-4.2 6.3-11.1 15.7-15.3 20.9-4.3 5.2-12 13.7-17.2 19-5.3 5.3-14.3 13.4-20 18-5.8 4.7-15.9 12-22.5 16.4-6.6 4.3-18.5 11.1-26.5 15.1-8 3.9-19.7 9.1-26 11.4-6.3 2.3-15.5 5.3-20.5 6.7-5 1.4-13.3 3.4-18.5 4.5-5.2 1.1-15.1 2.7-22 3.6-8.5 1.2-19.2 1.7-33.5 1.7-14 0-24.8-0.6-32.5-1.7-10.7-1.5-11.9-1.9-16.5-5.5-2.7-2.1-8.8-7.3-13.5-11.5-4.7-4.2-12.2-11.8-16.8-16.9-4.6-5.1-11.4-13.2-15.1-18.2-3.8-5-9.4-13-12.6-18-3.1-5-9-15.8-13-24-4.1-8.3-9-19.5-11-25-2.1-5.5-5.2-15.9-7-23-1.8-7.1-4-17.3-4.9-22.5-0.9-5.2-2.1-15.1-2.7-22-0.7-7.4-0.9-19.2-0.5-29 0.3-9.1 1.2-21 2-26.5 0.8-5.5 2.4-14.5 3.6-20 1.2-5.5 3.7-15.3 5.6-21.8 1.9-6.4 5.6-17.4 8.4-24.5 2.7-7 7.8-18.3 11.3-25.2 3.5-6.9 9-16.8 12.2-22 3.3-5.2 9.8-14.7 14.6-21 4.7-6.3 13.1-16.2 18.5-21.9 5.5-5.7 10.8-10.7 11.9-11.1 1.1-0.4 3.1-0.3 4.5 0.2 1.4 0.5 18.3 16.6 37.5 35.7 32.8 32.7 35.3 35 40.5 36.6 4 1.3 7.5 1.6 12.5 1.3 4.4-0.3 8.6-1.3 11.3-2.6 2.3-1.2 5.8-3.7 7.8-5.5 2-1.7 4.8-5.5 6.2-8.2 2.1-4.3 5.2-22.5 22.3-130.5 11-69 19.9-127.4 19.9-129.8 0-2.3-1-6.8-2.2-9.9-1.4-3.6-3.9-7.5-6.8-10.3-2.8-2.9-6.7-5.4-10.3-6.8-4-1.6-7.7-2.2-12.4-2.1-3.8 0.1-54.7 4.5-113.3 9.9z"/>
            </svg>
            <div className="relative px-4 lg:px-6 py-2 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}}>
                <h1 className="title-text" style={{ color: 'var(--color-sc-primary)'}}>
                    Nous contacter
                </h1>
            </div>

            {/* Contact Information Section */}
            <motion.div 
                className="w-full p-4 lg:p-6 mt-4 z-20"
                style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-start gap-3">
                    <div className="w-1 h-8 mt-1" style={{ backgroundColor: 'var(--color-sc-primary)' }}></div>
                    <div>
                        <h2 className="text-lg lg:text-2xl font-bold mb-2" style={{ color: 'var(--color-sc-primary)' }}>
                            Échangeons de vive voix
                        </h2>
                        <p className="text-sm lg:text-base" style={{ color: 'var(--color-sc-quaternary)' }}>
                            Pour un premier contact plus direct, vous pouvez nous joindre par téléphone, du lundi au vendredi de 9h à 17h, au{' '}
                            <a 
                                href="tel:0651464048" 
                                className="underline hover:no-underline transition-all duration-200"
                                style={{ color: 'var(--color-sc-primary)' }}
                            >
                                06 51 46 40 48
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                className="w-full p-4 lg:p-6 mt-4 z-20"
                style={{ backgroundColor: 'var(--color-sc-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <form onSubmit={handleSubmit} className="space-y-2 lg:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 lg:gap-4">
                        <div>
                            <label className="block text-xs lg:text-xl font-medium mb-0.5" style={{ color: 'var(--color-sc-primary)'}}>Nom et prénom *</label>
                            <input
                                className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Votre nom complet"
                                required
                                style={{ color: 'var(--color-sc-quaternary)'}}
                            />
                        </div>
                        <div>
                            <label className="block text-xs lg:text-xl font-medium mb-0.5" style={{ color: 'var(--color-sc-primary)'}}>Email *</label>
                            <input
                                className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="votre@email.com"
                                required
                                style={{ color: 'var(--color-sc-quaternary)'}}
                            />
                        </div>
                        <div>
                            <label className="block text-xs lg:text-xl font-medium mb-0.5" style={{ color: 'var(--color-sc-primary)'}}>Téléphone</label>
                            <input
                                className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 text-xs lg:text-xl"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="06 12 34 56 78"
                                style={{ color: 'var(--color-sc-quaternary)'}}
                            />
                        </div>
                    </div>
                     
                    <div>
                        <label className="block text-xs lg:text-xl font-medium mb-0.5" style={{ color: 'var(--color-sc-primary)'}}>Message</label>
                        <textarea
                            className="w-full px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 border border-gray-300 focus:ring-2 focus:ring-[#012073] focus:border-transparent transition-all duration-200 min-h-[50px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] resize-none text-xs lg:text-xl"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Décrivez votre projet ou votre besoin..."
                            style={{ color: 'var(--color-sc-quaternary)'}}
                        />
                    </div>
                     
                    <div className="flex flex-row items-center justify-start">
                        <input 
                            type="checkbox" 
                            name="subscribe" 
                            checked={form.subscribe} 
                            onChange={handleChange} 
                            className="mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4 text-[#012073] border-gray-300 focus:ring-[#012073]"
                            style={{ color: 'var(--color-sc-quaternary)'}}
                        />
                        <label className="text-xs lg:text-xl" style={{ color: 'var(--color-sc-primary)'}}>
                            Je souhaite être tenu informé des prochaines publications de SPIRE.
                        </label>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <button 
                            type="submit" 
                            className="self-center button button-primary mx-auto font-bold py-2 px-4 sm:px-6 md:px-8 text-xs lg:text-xl"
                        >
                            ENVOYER LE MESSAGE
                        </button>
                    </div>
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
            </motion.div>
        </div>
    </div>
  );
}
