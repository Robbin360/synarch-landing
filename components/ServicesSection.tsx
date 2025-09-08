'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ title, description, index }: ServiceCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="p-8 bg-zinc-900 rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.span 
        className="text-xl font-bold mb-4 block"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ type: "spring", stiffness: 100, delay: index * 0.2 }}
      >
        {title}
      </motion.span>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Branding",
      description: "En un mundo digital que no para de cambiar, ayudamos a las marcas a descubrir su esencia. Diseñamos identidades que crecen, se adaptan y se destacan."
    },
    {
      title: "Digital",
      description: "Creamos sitios web, apps, plataformas a medida y e-commerce que ayudan a las marcas a generar impacto global y conectar de forma auténtica."
    },
    {
      title: "Labs",
      description: "Diseñamos las experiencias del mañana — pensadas para conectar, emocionar y lograr resultados excepcionales que dejan una marca en cada interacción."
    },
    {
      title: "Boost",
      description: "Elevamos marcas para que se mantengan relevantes, únicas y siempre un paso adelante. Acompañamos su evolución, potenciando lo que son."
    }
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Nuestros Servicios
        </motion.h2>
        
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
};

export default ServicesSection;
