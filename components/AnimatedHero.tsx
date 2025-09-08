'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const translateY = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-0" />
      
      <motion.div 
        className="text-center z-10 px-4"
        style={{ y: translateY }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We empower brands to inspire people
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Creamos experiencias que encienden pasiones, reinventando lo posible
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all">
            EXPLORA NUESTRO UNIVERSO
          </button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"
        style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
      />
    </motion.div>
  );
};

export default AnimatedHero;
