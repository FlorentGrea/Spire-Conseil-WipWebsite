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
