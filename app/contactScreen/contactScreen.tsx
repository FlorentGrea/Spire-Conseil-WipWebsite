"use client"

import { useState } from "react";

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
    <div className="flex flex-col items-center w-full min-h-screen snap-start pt-10 sm:pt-16 md:pt-24 lg:pt-32 pb-6 sm:pb-10 md:pb-16 lg:pb-20 box-border"  data-screen="contact">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 text-center">Nous contacter</h1>
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Top: Phone Info */}
        <h2 className="text-3xl font-bold text-cyan-500 mb-2 border-l-4 border-cyan-300 pl-2 w-full">Échangeons de vive voix</h2>
        <p className="mb-4 text-gray-700 w-full">Pour un premier contact plus direct, vous pouvez nous joindre par téléphone, du lundi au vendredi de 9h à 17h, au <a href="tel:0651464048" className="underline text-cyan-700">06 51 46 40 48</a>.</p>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white w-full">
          <h2 className="text-3xl font-bold text-cyan-500 mb-2 border-l-4 border-cyan-300 pl-2">Écrivez-nous</h2>
          <p className="mb-4 text-gray-700">Utilisez ce formulaire pour toute demande de renseignement. Nous vous répondrons sous 48h.</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-cyan-400"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom et prénom *"
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-cyan-400"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Adresse mail *"
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-cyan-400"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="N° de téléphone"
          />
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-cyan-400 min-h-[100px]"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Votre message"
          />
          <div className="mb-2 flex items-center">
            <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} className="mr-2" />
            <label htmlFor="subscribe" className="text-sm">Je souhaite être tenu informé des prochaines publications de SPIRE.</label>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" name="accept" checked={form.accept} onChange={handleChange} className="mr-2" required />
            <label htmlFor="accept" className="text-sm">En soumettant ce formulaire, j&apos;accepte que les informations saisies soient utilisées pour permettre de me recontacter dans le cadre de la relation commerciale qui découle de cette demande.</label>
          </div>
          <button type="submit" className="bg-cyan-900 text-white font-bold px-8 py-2 rounded-full hover:bg-cyan-800 transition">ENVOYER</button>
          {status && <div className="mt-2 text-sm text-cyan-700">{status}</div>}
        </form>
      </div>
    </div>
  );
}
