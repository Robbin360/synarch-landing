"use client";
import React from 'react';

const PrinciplesSection = () => {
  const principles = [
    {
      name: "Maquiavelo",
      subtitle: "El Arquitecto del Poder Realista",
      quote: "«Es más seguro ser temido que amado. El fin justifica los medios.»"
    },
    {
      name: "Sun Tzu",
      subtitle: "El Maestro de la Estrategia Indirecta",
      quote: "«El supremo arte de la guerra es someter al enemigo sin luchar.»"
    },
    {
      name: "Clausewitz",
      subtitle: "El Filósofo de la Voluntad y la Fricción",
      quote: "«La guerra es la continuación de la política por otros medios.»"
    }
  ];

  return (
    <section id="principles" className="py-24 bg-black sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white font-playfair sm:text-5xl">
            Construido sobre los Hombros de Gigantes.
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-gray-300 font-inter">
            Nuestra doctrina no nace del vacío. Es la síntesis de siglos de pensamiento estratégico, destilada en un sistema operativo para el poder en el siglo XXI.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-16 sm:mt-20 md:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.name} className="p-8 border rounded-lg bg-gray-900/50 border-white/10">
              <h3 className="text-lg font-semibold text-white">{principle.name}</h3>
              <p className="text-sm text-gray-400">{principle.subtitle}</p>
              <blockquote className="pl-4 mt-4 italic text-gray-300 border-l-2 border-luxury-gold">
                {principle.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
