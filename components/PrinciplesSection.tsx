"use client";

export default function PrinciplesSection() {
  return (
    <section id="principles" className="py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            Built on the Shoulders of Giants
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Our doctrine does not emerge from a vacuum. It is the synthesis of centuries of strategic thought, distilled into an operating system for power in the 21st century.
          </p>
        </div>

        {/* Grid of Principles */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Machiavelli Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Machiavelli
                </h3>
                <p className="text-sm text-gray-400">
                  The Architect of Realist Power
                </p>
                <blockquote className="mt-4 border-l-2 border-luxury-gold pl-4 italic text-gray-300">
                  "It is better to be feared than loved. The end justifies the means."
                </blockquote>
              </div>
            </div>

            {/* Sun Tzu Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Sun Tzu
                </h3>
                <p className="text-sm text-gray-400">
                  The Master of Indirect Strategy
                </p>
                <blockquote className="mt-4 border-l-2 border-luxury-gold pl-4 italic text-gray-300">
                  "Supreme excellence consists in breaking the enemy&apos;s resistance without fighting."
                </blockquote>
              </div>
            </div>

            {/* Clausewitz Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Clausewitz
                </h3>
                <p className="text-sm text-gray-400">
                  The Philosopher of Will and Friction
                </p>
                <blockquote className="mt-4 border-l-2 border-luxury-gold pl-4 italic text-gray-300">
                  "War is the continuation of politics by other means."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
