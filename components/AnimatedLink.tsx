'use client';

import { motion } from 'framer-motion';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedLink({ href, children, className = '' }: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <motion.span
        variants={{
          hover: {
            y: -2,
            transition: { duration: 0.3 }
          }
        }}
        className="block"
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-px bg-current"
        variants={{
          hover: {
            width: '100%',
            transition: { duration: 0.3 }
          }
        }}
      />
    </motion.a>
  );
}
