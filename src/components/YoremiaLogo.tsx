import React from 'react';

interface YoremiaLogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAuthor?: boolean;
}

export const YoremiaLogo: React.FC<YoremiaLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  showAuthor = true
}) => {
  // Isotipo SVG puro con alta fidelidad vectorial
  const renderIsotipo = (dimensions: { width: number; height: number; className?: string }) => (
    <svg
      viewBox="0 0 240 220"
      width={dimensions.width}
      height={dimensions.height}
      className={`flex-shrink-0 ${dimensions.className || ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="yl_bookNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="60%" stopColor="#075985" />
          <stop offset="100%" stopColor="#0C2340" />
        </linearGradient>

        <linearGradient id="yl_leaves" x1="0%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="35%" stopColor="#0284C7" />
          <stop offset="75%" stopColor="#00A896" />
          <stop offset="100%" stopColor="#00C49F" />
        </linearGradient>

        <linearGradient id="yl_pixel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#00C49F" />
        </linearGradient>
      </defs>

      <g id="yl_group" transform="translate(-10, -40)">
        {/* Birrete de graduación */}
        <polygon points="130,52 180,68 130,84 80,68" fill="#0C2340" />
        <polygon points="130,55 175,68 130,81 85,68" fill="#0284C7" />
        <path d="M 105,75 Q 130,88 155,75 L 155,83 Q 130,96 105,83 Z" fill="#0C2340" />
        {/* Borla */}
        <circle cx="130" cy="68" r="2.5" fill="#0C2340" />
        <path d="M 130,68 C 160,72 175,80 175,98" fill="none" stroke="#0C2340" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="175" cy="99" r="3.5" fill="#0C2340" />

        {/* Cabeza del estudiante */}
        <circle cx="130" cy="106" r="18" fill="#0284C7" />
        <path d="M 117,125 C 121,121 139,121 143,125 C 140,132 120,132 117,125 Z" fill="#075985" />

        {/* Hojas internas tipo libro floreciente */}
        <path d="M 130,188 C 128,160 110,122 73,104 C 70,125 85,168 130,188 Z" fill="url(#yl_leaves)" />
        <path d="M 130,188 C 132,160 150,122 187,104 C 190,125 175,168 130,188 Z" fill="url(#yl_leaves)" />
        
        {/* Hojas centrales erguidas */}
        <path d="M 130,192 C 126,155 117,122 103,102 C 114,102 128,145 130,192 Z" fill="#0284C7" opacity="0.85" />
        <path d="M 130,192 C 134,155 143,122 157,102 C 146,102 132,145 130,192 Z" fill="#00A896" opacity="0.85" />

        {/* Hojas externas abiertas verdes/teal */}
        <path d="M 130,196 C 117,172 83,142 51,128 C 51,148 70,185 130,205 Z" fill="url(#yl_leaves)" />
        <path d="M 130,196 C 143,172 177,142 209,128 C 209,148 190,185 130,205 Z" fill="url(#yl_leaves)" />

        {/* Cubiertas del libro exterior azul oscuro */}
        <path d="M 127,208 C 80,192 40,170 31,150 L 31,170 C 40,190 80,212 127,226 Z" fill="url(#yl_bookNavy)" />
        <path d="M 31,150 L 31,170 L 47,170 L 47,150 Z" fill="#0284C7" />
        <path d="M 133,208 C 180,192 220,170 229,150 L 229,170 C 220,190 180,212 133,226 Z" fill="url(#yl_bookNavy)" />

        {/* Base / Lomo central del libro */}
        <path d="M 125,209 L 130,215 L 135,209 L 130,228 Z" fill="#0C2340" />

        {/* Pixeles IA flotantes */}
        <rect x="213" y="92" width="10" height="10" rx="2" fill="url(#yl_pixel)" />
        <rect x="227" y="76" width="12" height="12" rx="2" fill="url(#yl_pixel)" />
        <rect x="203" y="72" width="8" height="8" rx="1.5" fill="url(#yl_pixel)" opacity="0.85" />
        <rect x="223" y="56" width="11" height="11" rx="2" fill="url(#yl_pixel)" />
        <rect x="239" y="60" width="8" height="8" rx="1.5" fill="url(#yl_pixel)" opacity="0.75" />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    const iconSizes = {
      sm: { width: 32, height: 32 },
      md: { width: 44, height: 44 },
      lg: { width: 56, height: 56 },
      xl: { width: 80, height: 80 }
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIsotipo(iconSizes[size])}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Isotipo */}
        <div className="mb-2">
          {renderIsotipo({ width: size === 'xl' ? 140 : 100, height: size === 'xl' ? 130 : 92 })}
        </div>

        {/* Título de Marca */}
        <div className="flex items-baseline justify-center tracking-tight">
          <span className="text-3xl sm:text-4xl font-black text-[#0C2340] tracking-tight">YOREM</span>
          <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#0284C7] via-[#00A896] to-[#00C49F] bg-clip-text text-transparent">
            IA
          </span>
        </div>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base font-semibold text-slate-700 tracking-wide mt-1">
          Inteligencia educativa para docentes
        </p>

        {/* Autor */}
        {showAuthor && (
          <div className="flex items-center justify-center gap-3 mt-2 text-xs font-medium text-slate-500 w-full max-w-xs">
            <span className="h-px bg-slate-300 flex-1" />
            <span className="text-slate-600 whitespace-nowrap">Por Yovana María Remuzgo Velazco</span>
            <span className="h-px bg-slate-300 flex-1" />
          </div>
        )}
      </div>
    );
  }

  // Variant "horizontal" (por defecto para Navbar y cabeceras)
  const sizesConfig = {
    sm: {
      svg: { width: 36, height: 36 },
      titleClass: 'text-lg',
      subClass: 'text-[10px]',
      authorClass: 'text-[9px]'
    },
    md: {
      svg: { width: 48, height: 48 },
      titleClass: 'text-2xl',
      subClass: 'text-xs',
      authorClass: 'text-[10px]'
    },
    lg: {
      svg: { width: 62, height: 62 },
      titleClass: 'text-3xl',
      subClass: 'text-sm',
      authorClass: 'text-xs'
    },
    xl: {
      svg: { width: 80, height: 80 },
      titleClass: 'text-4xl',
      subClass: 'text-base',
      authorClass: 'text-xs'
    }
  };

  const currentSize = sizesConfig[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Isotipo */}
      <div className="flex-shrink-0 drop-shadow-sm hover:scale-105 transition-transform duration-200">
        {renderIsotipo(currentSize.svg)}
      </div>

      {/* Identidad de marca y tipografía oficial */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <div className="flex items-baseline">
            <span className={`${currentSize.titleClass} font-black text-[#0C2340] tracking-tight leading-none`}>
              YOREM
            </span>
            <span className={`${currentSize.titleClass} font-black bg-gradient-to-r from-[#0284C7] via-[#00A896] to-[#00C49F] bg-clip-text text-transparent leading-none`}>
              IA
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-wider uppercase">
            CNEB MINEDU
          </span>
        </div>

        <p className={`${currentSize.subClass} font-semibold text-slate-700 tracking-normal mt-1 leading-tight`}>
          Inteligencia educativa para docentes
        </p>

        {showAuthor && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="hidden sm:block w-3 h-px bg-slate-300" />
            <p className={`${currentSize.authorClass} text-slate-500 font-medium`}>
              Por <span className="font-semibold text-slate-700">Yovana María Remuzgo Velazco</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
