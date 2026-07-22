import React from 'react';

interface AlbumCoverProps {
  seed: string;
  title: string;
  artist: string;
  size?: 'sm' | 'md' | 'lg';
}

const GRADIENTS = [
  ['#4f46e5', '#7c3aed', '#db2777'],
  ['#059669', '#10b981', '#06b6d4'],
  ['#f59e0b', '#ef4444', '#ec4899'],
  ['#0284c7', '#2563eb', '#7c3aed'],
  ['#d97706', '#dc2626', '#7c3aed'],
  ['#111827', '#374151', '#4b5563'],
];

const hashSeed = (seedStr: string): number => {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const AlbumCover: React.FC<AlbumCoverProps> = ({
  seed,
  title,
  artist,
  size = 'md',
}) => {
  const numHash = hashSeed(seed);
  
  const gradient = GRADIENTS[numHash % GRADIENTS.length];
  const shapeType = numHash % 4;
  const rotation = (numHash % 360);

  const dimensions = {
    sm: 'w-12 h-12 text-[8px]',
    md: 'w-40 h-40 text-xs',
    lg: 'w-full aspect-square text-sm',
  }[size];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-700/50 shadow-lg flex flex-col justify-between p-3 select-none ${dimensions}`}
      style={{
        background: `linear-gradient(${rotation}deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
      }}
    >\
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shapeType === 0 && (
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#fff" strokeWidth="8" />
        )}
        {shapeType === 1 && (
          <rect
            x="25%"
            y="25%"
            width="50%"
            height="50%"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            transform={`rotate(${rotation} 100 100)`}
          />
        )}
        {shapeType === 2 && (
          <>
            <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#fff" strokeWidth="4" />
            <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#fff" strokeWidth="2" />
          </>
        )}
        {shapeType === 3 && (
          <path
            d="M0 0 L100 100 M100 0 L0 100"
            stroke="#fff"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {size !== 'sm' && (
        <div className="relative z-10 mt-auto bg-slate-950/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
          <p className="font-bold text-white leading-tight line-clamp-1">{title}</p>
          <p className="text-[10px] text-slate-300 line-clamp-1">{artist}</p>
        </div>
      )}
    </div>
  );
};