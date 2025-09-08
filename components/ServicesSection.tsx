'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

function ServiceCard({ title, description, index }: ServiceCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-white/5"
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const services = [
    {
      title: 'Branding',
      description: 'Diseñamos identidades que crecen, se adaptan y se destacan, creando experiencias que conectan y expresan lo que hace única a cada marca.',
    },
    {
      title: 'Digital',
      description: 'Creamos sitios web, apps y plataformas a medida que ayudan a las marcas a generar impacto global y conectar de forma auténtica.',
    },
    {
      title: 'Labs',
      description: 'Diseñamos las experiencias del mañana — pensadas para conectar, emocionar y lograr resultados excepcionales en cada interacción.',
    },
    {
      title: 'Boost',
      description: 'Elevamos marcas para que se mantengan relevantes, únicas y siempre un paso adelante, potenciando lo que son y lo que pueden llegar a ser.',
    },
  ];

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transformamos ideas en experiencias memorables que generan impacto real
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
