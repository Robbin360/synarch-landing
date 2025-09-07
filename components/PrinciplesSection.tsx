"use client";
import React from 'react';

const PrinciplesSection = () => {
  const principles = [
    {
      name: "Machiavelli",
      subtitle: "The Architect of Realist Power",
      quote: "\"It is better to be feared than loved. The end justifies the means.\""
    },
    {
      name: "Sun Tzu",
      subtitle: "The Master of Indirect Strategy",
      quote: "\"Supreme excellence consists in breaking the enemy's resistance without fighting.\""
    },
    {
      name: "Clausewitz",
      subtitle: "The Philosopher of Will and Friction",
      quote: "\"War is merely the continuation of politics by other means.\""
    }
  ];

  return (
    <section id="principles" className="py-24 bg-black sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white font-playfair sm:text-5xl">
            Built on the Shoulders of Giants
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-gray-300 font-inter">
            Our doctrine does not emerge from a vacuum. It is the synthesis of centuries of strategic thought, distilled into an operating system for power in the 21st century.
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
