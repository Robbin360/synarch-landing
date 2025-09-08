'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomCursor from './CustomCursor';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <CustomCursor />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Synarch
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/studio" className="hover:text-gray-300 transition-colors">
                Studio
              </Link>
              <Link href="/projects" className="hover:text-gray-300 transition-colors">
                Proyectos
              </Link>
              <Link href="/services" className="hover:text-gray-300 transition-colors">
                Servicios
              </Link>
              <Link href="/news" className="hover:text-gray-300 transition-colors">
                Novedades
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EXPLORÁ</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/studio" className="hover:text-gray-300 transition-colors">
                    Studio
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-gray-300 transition-colors">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-300 transition-colors">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-gray-300 transition-colors">
                    Novedades
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">CONECTEMOS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/awards" className="hover:text-gray-300 transition-colors">
                    Premios
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-gray-300 transition-colors">
                    Preguntas frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/archive" className="hover:text-gray-300 transition-colors">
                    Archivo
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">CONTACTO</h3>
              <p className="text-gray-400 mb-4">
                ¿Tenés un proyecto en mente? Nos encantaría escucharte.
              </p>
              <a
                href="mailto:contacto@synarch.com"
                className="text-white hover:text-gray-300 transition-colors"
              >
                contacto@synarch.com
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2025 Synarch. Todos los derechos reservados.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacidad
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Términos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
