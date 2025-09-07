"use client";

import Link from 'next/link';

export default function ThesisSection() {
  return (
    <section id="thesis" className="py-24 sm:py-32 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Stop watching the scoreboard. Start moving the pieces.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300 font-inter max-w-2xl mx-auto">
          Traditional analytics is a rearview mirror, perfect for seeing where you&apos;ve been, but useless for anticipating the curve ahead. It measures effects, not causes. Synarch is not a mirror. It&apos;s a prism that decomposes the complexity of the present to project probable futures, allowing you to act on the cause, not the consequence.
        </p>
        <div className="mt-10">
          <Link 
            href="/thesis" 
            className="text-sm font-semibold leading-6 text-luxury-gold hover:text-luxury-gold/80 transition-colors"
          >
            Read the complete thesis →
          </Link>
        </div>
      </div>
    </section>
  );
}
