"use client";

import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-black">
      <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
          The Conversation Starts Here
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          If you&apos;ve understood the nature of our thesis and the inevitability of our structure, the next step is logical. We don&apos;t offer demonstrations. We initiate strategic dialogues.
        </p>
        <div className="mt-10">
          <Link href="/contact">
            <AnimatedButton variant="luxury" size="lg">
              Initiate Strategic Dialogue
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
