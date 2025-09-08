'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-[100svh] flex flex-col items-center justify-center">
      <motion.div
        ref={ref}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/_next/static/media/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
          scale
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"
        style={{ opacity }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold leading-tight mb-8">
            <div>We empower brands</div>
            <div>to inspire people</div>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12">
            Creamos experiencias que encienden pasiones, reinventando lo posible
          </p>

          <motion.button
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">EXPLORÁ NUESTRO UNIVERSO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        style={{ opacity }}
    </div>
  );
}
