import React, { useState, useEffect, useMemo } from 'react';
import { FilterType } from './types';
import { FULL_CARD_LIST } from './constants';
import { CardItem } from './components/CardItem';

const App: React.FC = () => {
  // State
  const [collectedIds, setCollectedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('sv151_collected');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  // Persistence
  useEffect(() => {
    localStorage.setItem('sv151_collected', JSON.stringify(Array.from(collectedIds)));
  }, [collectedIds]);

  // Handlers
  const toggleCollection = (id: string) => {
    setCollectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter Logic
  const filteredCards = useMemo(() => {
    return FULL_CARD_LIST.filter(card => {
      // 1. Search Filter
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            card.number.toString().includes(searchQuery);
      
      if (!matchesSearch) return false;

      // 2. Status Filter
      const isCollected = collectedIds.has(card.id);
      if (filter === FilterType.COLLECTED) return isCollected;
      if (filter === FilterType.MISSING) return !isCollected;
      
      return true;
    });
  }, [searchQuery, filter, collectedIds]);

  const stats = useMemo(() => {
    const total = FULL_CARD_LIST.length;
    const collected = collectedIds.size;
    const percentage = Math.round((collected / total) * 100);
    return { total, collected, percentage };
  }, [collectedIds]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Sticky */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-lg">
                151
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Joon's <span className="text-emerald-600">151 Collector</span>
              </h1>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 bg-slate-100 rounded-full px-6 py-2">
              <div className="text-center">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Collected</span>
                <span className="text-lg font-bold text-slate-800">{stats.collected} <span className="text-slate-400 text-sm">/ {stats.total}</span></span>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="text-center">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</span>
                <span className="text-lg font-bold text-emerald-600">{stats.percentage}%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Filters - Secondary Row */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {[
               { type: FilterType.ALL, label: 'All Cards' },
               { type: FilterType.COLLECTED, label: 'Collected' },
               { type: FilterType.MISSING, label: 'Missing' },
             ].map(f => (
               <button
                 key={f.type}
                 onClick={() => setFilter(f.type)}
                 className={`
                   px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                   ${filter === f.type 
                     ? 'bg-slate-800 text-white shadow-md' 
                     : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}
                 `}
               >
                 {f.label}
               </button>
             ))}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCards.length === 0 ? (
           <div className="text-center py-20">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
             </div>
             <h3 className="text-lg font-medium text-slate-900">No cards found</h3>
             <p className="text-slate-500">Try adjusting your search or filters.</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredCards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                isCollected={collectedIds.has(card.id)} 
                onToggle={toggleCollection}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
