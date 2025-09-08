'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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
      title: 'BRANDING',
      subtitle: 'CREAMOS LA IDENTIDAD',
      description: 'En un mundo digital que no para de cambiar, ayudamos a las marcas a descubrir su esencia. Diseñamos identidades que crecen, se adaptan y se destacan, creando experiencias que conectan y expresan lo que las hace únicas.',
      href: '/services/branding'
    },
    {
      title: 'DIGITAL',
      subtitle: 'DISEÑAMOS LA EXPERIENCIA',
      description: 'Creamos sitios web, apps, plataformas a medida y e-commerce que ayudan a las marcas a generar impacto global y conectar de forma auténtica con su audiencia.',
      href: '/services/digital'
    },
    {
      title: 'LABS',
      subtitle: 'CONTAMOS LA HISTORIA',
      description: 'Diseñamos las experiencias del mañana — pensadas para conectar, emocionar y lograr resultados excepcionales que dejan una marca en cada interacción.',
      href: '/services/labs'
    },
    {
      title: 'BOOST',
      subtitle: 'ACOMPAÑAMOS LA EVOLUCIÓN',
      description: 'Elevamos marcas para que se mantengan relevantes, únicas y siempre un paso adelante. Acompañamos su evolución, potenciando lo que son y proyectando lo que pueden llegar a ser.',
      href: '/services/boost'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Link href={service.href} className="block">
              <div className="overflow-hidden rounded-lg aspect-[16/9] mb-8">
                <motion.div
                  className="w-full h-full bg-zinc-900"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{service.subtitle}</span>
                  <span>/</span>
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-lg hover:text-gray-300 transition-colors"
        >
          <span>CONOCÉ TODOS NUESTROS SERVICIOS</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>
      </div>
      </div>
    </section>
  );
}
