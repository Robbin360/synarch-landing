"use client";

import Link from 'next/link';

export default function StructureSection() {
  return (
    <section id="structure" className="py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            The Architecture of Power
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            SYNARCH does not operate directly. It deploys sovereign entities, each with a precise mandate to dominate a sector. This is the anatomy of our first conquest.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          {/* SYNARCH Node */}
          <div className="flex justify-center">
            <div className="inline-block rounded-lg bg-gray-900/50 border border-luxury-gold/50 px-8 py-4">
              <h3 className="text-2xl font-bold text-white text-center">
                SYNARCH
              </h3>
              <p className="text-sm text-gray-400">
                The Sovereign Will
              </p>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="relative mx-auto mt-8 mb-12">
            <div className="mx-auto h-16 w-px bg-white/10"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="flex gap-4">
                <div className="w-24 h-px bg-white/10 -rotate-45"></div>
                <div className="w-24 h-px bg-white/10 rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Entity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* NOEMA Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                NOEMA
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                The Truth Catalyst
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mission: Expose a systemic vulnerability. Its product is a truth so undeniable that the market demands a solution.
              </p>
            </div>

            {/* FULCRUM Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                FULCRUM
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                The Consequence Implementer
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mission: Be the only viable response to the crisis. Its product is perpetual containment, control, and value extraction.
              </p>
            </div>
          </div>
        </div>

        {/* Deep Dive Link */}
        <div className="mt-16 text-center">
          <Link 
            href="/doctrine" 
            className="text-sm font-semibold leading-6 text-luxury-gold hover:text-luxury-gold/80 transition-colors"
          >
            Study the Complete Doctrine →
          </Link>
        </div>
      </div>
    </section>
  );
}
