import React from 'react';
import { Card, PriceData } from '../types';

interface GeminiModalProps {
  card: Card | null;
  data: PriceData | null;
  loading: boolean;
  onClose: () => void;
}

export const GeminiModal: React.FC<GeminiModalProps> = ({ card, data, loading, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Market Value: {card.name}
          </h3>
          <button onClick={onClose} className="hover:bg-emerald-700 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm animate-pulse">Checking latest prices...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                   src={card.imageUrl} 
                   alt={card.name} 
                   className="w-20 h-28 object-cover rounded-lg border border-slate-200 shadow-sm"
                />
                <div className="flex-1">
                   <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {data?.text}
                   </p>
                </div>
              </div>

              {/* Sources */}
              {data?.sources && data.sources.length > 0 && (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Sources</h4>
                  <ul className="space-y-1">
                    {data.sources.map((source, idx) => (
                      <li key={idx}>
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:text-emerald-800 hover:underline truncate block"
                        >
                          {source.title || source.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};