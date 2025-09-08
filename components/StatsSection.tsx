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
      label: 'universos creados*',
      footnote: '* o tal vez más'
    },
    {
      number: '12',
      label: 'semanas en promedio para convertir ideas en realidades'
    },
    {
      number: '97%',
      label: 'de nuestros clientes vuelven a confiar en nosotros para sus próximos proyectos'
    },
    {
      number: '5',
      label: 'continentes (hasta que descubramos más)'
    },
    {
      number: '10x',
      label: 'aumento en visitas gracias a la conexión con audiencias globales'
    },
    {
      number: '150+',
      label: 'Premios nos convierten en el estudio más premiado de Latinoamérica'
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              >
                {stat.number}
              </motion.div>
              <div className="text-lg text-gray-400">
                {stat.label}
                {stat.footnote && (
                  <div className="text-sm text-gray-500 mt-2">
                    {stat.footnote}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
