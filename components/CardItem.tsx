import React, { useState } from 'react';
import { Card } from '../types';

interface CardItemProps {
  card: Card;
  isCollected: boolean;
  onToggle: (id: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, isCollected, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`
        relative group rounded-xl overflow-hidden transition-all duration-300 ease-in-out border-2 shadow-sm hover:shadow-xl
        ${isCollected ? 'border-yellow-400 bg-yellow-50' : 'border-slate-200 bg-white opacity-80 hover:opacity-100'}
      `}
    >
      {/* Selection Overlay */}
      <div 
        onClick={() => onToggle(card.id)}
        className="cursor-pointer"
      >
        <div className="relative aspect-[0.71]"> {/* Standard Card Aspect Ratio */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
               #{card.number}
            </div>
          )}
          <img 
            src={card.imageUrl} 
            alt={card.name}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
              ${isCollected ? 'grayscale-0' : 'grayscale'}
            `}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Collected Badge */}
          <div className={`
            absolute top-2 right-2 rounded-full p-1.5 shadow-md transition-all duration-300
            ${isCollected ? 'bg-yellow-400 text-white scale-100' : 'bg-slate-300 text-slate-500 scale-90 opacity-0 group-hover:opacity-100'}
          `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Card Number Label */}
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
            #{card.number}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3">
        <div className="truncate">
          <h3 className={`font-bold text-sm truncate ${isCollected ? 'text-slate-900' : 'text-slate-500'}`}>
            {card.name}
          </h3>
          <p className="text-xs text-slate-400 flex items-center justify-between">
            <span>{card.supertype}</span>
            <span className="text-[10px] uppercase bg-slate-100 px-1 rounded border border-slate-200">{card.rarity.split(' ')[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
