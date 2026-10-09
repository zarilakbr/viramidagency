import React from 'react';

export interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

export const TECH_LIST: TechItem[] = [
  {
    name: 'React',
    category: 'UI Library',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 115.3 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="57.65" cy="50" r="10.5" fill="#61DAFB" />
        <ellipse cx="57.65" cy="50" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="57.65" cy="50" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 57.65 50)" />
        <ellipse cx="57.65" cy="50" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 57.65 50)" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Typed Language',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path d="M72 80V67.8H96.5V56H57.5V67.8H82V80H72ZM108 56H97V80H108V56Z" fill="#F4F3FF" />
        <path d="M42 56H26V64.6H31.5V80H42V56Z" fill="#F4F3FF" opacity="0.9" />
        <path d="M49 80C55 80 59.8 77.5 59.8 72C59.8 66 54.5 64.5 49 63.5C44.5 62.5 42 61 42 59C42 57.2 44.5 56 48 56C51.5 56 54.5 57 56.5 58.5L59.5 52C56.5 50 52.5 49 48 49C40.5 49 35 52.8 35 59C35 65.5 40.5 67 46 68.2C50.5 69.2 53 70.5 53 72.8C53 75.2 50 76.8 46 76.8C41.5 76.8 37.5 75.2 34.5 72.8L31 79.5C34.5 82.5 41 84 46 84" fill="#F4F3FF" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Design System',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Fullstack Framework',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="85" fill="#000" stroke="#5a3c8e" strokeWidth="6" />
        <path d="M149.5 147.5L78.5 56H61V124H74.5V74L137.5 154C141.8 152 145.8 149.8 149.5 147.5Z" fill="url(#next-g2)" />
        <rect x="119" y="56" width="13.5" height="68" fill="#F4F3FF" />
        <defs>
          <linearGradient id="next-g2" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4F3FF" />
            <stop offset="1" stopColor="#F4F3FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Vite',
    category: 'Fast Bundler',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M29.5 5.5L16.5 28.5L2.5 5.5L18.5 2.5L29.5 5.5Z"
          fill="url(#vite-g2)"
        />
        <path
          d="M20.5 4.5L12 15.5H16.5L13.5 24.5L22.5 13.5H17.5L20.5 4.5Z"
          fill="#FFD21E"
        />
        <defs>
          <linearGradient id="vite-g2" x1="5" y1="5" x2="27" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend Runtime',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2.5L3.5 9.7V24.3L16 31.5L28.5 24.3V9.7L16 2.5Z"
          stroke="#22C55E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M16 9.5V23.5M10 13L16 16.5L22 13M10 19L16 22.5L22 19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Product Design',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C13.75 28.5 9.5 24.25 9.5 19C9.5 13.75 13.75 9.5 19 9.5H28.5V28.5H19Z" fill="#F24E1E" />
        <path d="M9.5 9.5C9.5 4.25 13.75 0 19 0H28.5V9.5H19C13.75 9.5 9.5 9.5 9.5 9.5Z" fill="#FF7262" />
        <path d="M28.5 0V19H38C38 13.75 33.75 9.5 28.5 9.5V0Z" fill="#1ABCFE" />
        <path d="M9.5 28.5C9.5 33.75 13.75 38 19 38H28.5V28.5H9.5Z" fill="#0ACF83" />
        <path d="M9.5 47.5C9.5 42.25 13.75 38 19 38C24.25 38 28.5 42.25 28.5 47.5C28.5 52.75 24.25 57 19 57C13.75 57 9.5 52.75 9.5 47.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#336791" />
        <path
          d="M16 6C11.5 6 8 9.5 8 14C8 17.5 10.2 20.5 13.5 21.6V26H18.5V21.6C21.8 20.5 24 17.5 24 14C24 9.5 20.5 6 16 6ZM16 19C13.2 19 11 16.8 11 14C11 11.2 13.2 9 16 9C18.8 9 21 11.2 21 14C21 16.8 18.8 19 16 19Z"
          fill="#F4F3FF"
        />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containerization',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.5 10.5C22.1 9.8 21.3 9.4 20.5 9.4C20.2 9.4 19.9 9.5 19.6 9.6C19 8.2 17.7 7.2 16.2 7.2C16 7.2 15.8 7.2 15.6 7.3C15.1 6.5 14.2 6 13.2 6H11V8.5H13V11H8V8.5H10V6H5V8.5H7V11H2V13.5C2 17.1 4.9 20 8.5 20C13.6 20 18.2 16.6 19.6 11.7C20.8 11.9 22 11.5 22.5 10.5Z"
          fill="#2496ED"
        />
        <rect x="2" y="8.5" width="2" height="2" fill="#2496ED" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    category: 'API Standards',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 3L27.5 9.6V22.4L16 29L4.5 22.4V9.6L16 3Z"
          stroke="#E10098"
          strokeWidth="2"
        />
        <path d="M16 3V29M4.5 9.6L27.5 22.4M4.5 22.4L27.5 9.6" stroke="#E10098" strokeWidth="1.5" />
        <circle cx="16" cy="3" r="2.5" fill="#E10098" />
        <circle cx="27.5" cy="9.6" r="2.5" fill="#E10098" />
        <circle cx="27.5" cy="22.4" r="2.5" fill="#E10098" />
        <circle cx="16" cy="29" r="2.5" fill="#E10098" />
        <circle cx="4.5" cy="22.4" r="2.5" fill="#E10098" />
        <circle cx="4.5" cy="9.6" r="2.5" fill="#E10098" />
      </svg>
    ),
  },
];

/**
 * TechnologyStack
 * Marquee banner of logos and names of modern technologies
 * showcasing the agency's toolkit.
 */
export const TechnologyStack: React.FC = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...TECH_LIST, ...TECH_LIST];

  return (
    <section className="relative py-10 border-y border-[#5a3c8e]/30 bg-[#1e1136]/40 overflow-hidden">
      {/* Label Kicker di atas banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-5 flex items-center justify-between">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#B8A9D4]/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          Standar Teknologi &amp; Arsitektur Kode
        </span>
        <span className="text-[11px] font-mono text-[#B8A9D4]/50 hidden sm:inline">
          Produksi Modern · Kecepatan Maksimal
        </span>
      </div>

      {/* Marquee Track Container with gradient fading edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Scrim */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #1e1136 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Right Fade Scrim */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #1e1136 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Running Row */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 py-2">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3.5 px-5 py-2.5 rounded-xl bg-[#281744]/70 border border-[#5a3c8e]/40 hover:border-[#F97316]/70 hover:bg-[#281744] transition-all duration-200 select-none group shadow-sm"
              title={`${tech.name} - ${tech.category}`}
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                {tech.icon}
              </div>
              <div className="flex flex-col text-left whitespace-nowrap">
                <span className="font-heading font-bold text-sm text-[#F4F3FF] group-hover:text-[#F97316] transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-[#B8A9D4]/70">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Re-export as TechMarquee for backwards compatibility
export const TechMarquee = TechnologyStack;
