'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatProps {
  number: string;
  label: string;
  delay: number;
}

const Stat = ({ number, label, delay }: StatProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.span 
        className="block text-5xl md:text-6xl font-bold mb-2"
        initial={{ scale: 0.5 }}
        animate={inView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ type: "spring", stiffness: 100, delay }}
      >
        {number}
      </motion.span>
      <span className="text-gray-300 text-lg">{label}</span>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: "200+", label: "universos creados" },
    { number: "12", label: "semanas en promedio para convertir ideas en realidades" },
    { number: "97%", label: "de nuestros clientes vuelven a confiar en nosotros" },
    { number: "150+", label: "Premios internacionales" },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Stat
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
