'use client';

import { motion } from 'framer-motion';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
}

export default function Grid({ children, className = '', columns = 3 }: GridProps) {
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
