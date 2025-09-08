'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    name: '',
    email: '',
    company: '',
    message: '',
    timeline: '',
    source: ''
  });

  const projectTypes = [
    "Estrategia de marca y identidad",
    "Diseño y desarrollo de sitio web",
    "Branding + Website",
    "Diseño de experiencia de usuario",
    "Desarrollo",
    "Diseño y desarrollo de eCommerce",
    "Landing Page",
    "Diseño y desarrollo de app",
    "Diseño y animación",
    "Escritura estratégica y mensajería",
    "Otros"
  ];

  const budgetRanges = [
    "USD 75,000 - 100,000",
    "USD 100,000 - 150,000",
    "USD 150,000 - 300,000",
    "USD 300,000 - 400,000",
    "USD 400,000+"
  ];

  const timelineOptions = [
    "2 meses",
    "4 meses",
    "6 meses",
    "Ayer",
    "Otro"
  ];

  const sourceOptions = [
    "Websites de premios",
    "Un proyecto que hicimos",
    "Un artículo",
    "En redes sociales",
    "Una recomendación de un amigo",
    "En Google",
    "Otro"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log(formData);
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            El futuro nos espera
          </h2>
          <p className="text-xl text-gray-400">
            — creémoslo juntos
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <div>
              <label className="block text-lg mb-4">
                /1. Lo que vamos a crear para vos...
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
              >
                <option value="">Por favor, selecciona una opción</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg mb-4">
                /2. Tu presupuesto es...
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
              >
                <option value="">Por favor, selecciona una opción</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg mb-4">
                  Nombre*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ej: Leo Messi"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg mb-4">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-4">
                Empresa
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Tu empresa"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
              />
            </div>

            <div>
              <label className="block text-lg mb-4">
                ¿Qué tenés en mente?*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white h-32"
                required
              />
            </div>

            <div>
              <label className="block text-lg mb-4">
                ¿Para cuándo lo necesitás?
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
              >
                <option value="">Selecciona un timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg mb-4">
                ¿Cómo llegaste hasta acá?
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white"
              >
                <option value="">Selecciona una opción</option>
                {sourceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            className="mt-8 w-full bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ENVIAR MENSAJE
          </motion.button>

          <p className="text-center mt-8 text-gray-400">
            O escribinos a{' '}
            <a href="mailto:contacto@synarch.com" className="text-white hover:text-gray-200 underline">
              contacto@synarch.com
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
};
