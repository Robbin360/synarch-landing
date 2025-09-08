'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatItemProps {
  number: string;
  label: string;
  delay: number;
}

function StatItem({ number, label, delay }: StatItemProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay }}
        className="block text-5xl md:text-6xl font-bold mb-2"
      >
        {number}
      </motion.span>
      <span className="text-gray-400 text-lg">{label}</span>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      number: '200+',
      label: 'universos creados',
    },
    {
      number: '12',
      label: 'semanas en promedio para convertir ideas en realidades',
    },
    {
      number: '97%',
      label: 'de nuestros clientes vuelven a confiar en nosotros',
    },
    {
      number: '150+',
      label: 'Premios internacionales',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <StatItem
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
}
