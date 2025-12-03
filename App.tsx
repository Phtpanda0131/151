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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-lg">
                  151
                </div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                  Joon's <span className="text-emerald-600">151 Collector</span>
                </h1>
              </div>
              
              {/* Mobile Stats (Condensed) */}
              <div className="lg:hidden text-right">
                <span className="text-sm font-bold text-emerald-600">{stats.percentage}%</span>
                <span className="text-xs text-slate-400 block">{stats.collected}/{stats.total}</span>
              </div>
            </div>

            {/* Desktop Stats Bar */}
            <div className="hidden lg:flex items-center gap-6 bg-slate-100 rounded-full px-6 py-2">
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
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* View Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto w-full sm:w-auto justify-center">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 sm:flex-none p-2 rounded-md transition-all flex justify-center ${viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Grid View"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                </button>
                <button
                    onClick={() => setViewMode('list')}
                     className={`flex-1 sm:flex-none p-2 rounded-md transition-all flex justify-center ${viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    title="List View"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
              </div>

              {/* Search */}
              <div className="relative flex-1 w-full lg:w-64">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-slate-50"
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

      {/* Main Grid/List */}
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
          viewMode === 'grid' ? (
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
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-0">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 w-16 text-center">Status</th>
                      <th className="p-4 w-20">#</th>
                      <th className="p-4">Card</th>
                      <th className="p-4 hidden sm:table-cell">Type</th>
                      <th className="p-4 hidden md:table-cell">Rarity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCards.map(card => {
                      const isCollected = collectedIds.has(card.id);
                      return (
                        <tr 
                          key={card.id} 
                          onClick={() => toggleCollection(card.id)}
                          className={`
                            group border-b border-slate-100 last:border-0 cursor-pointer transition-colors
                            ${isCollected ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-slate-50'}
                          `}
                        >
                          <td className="p-4 text-center">
                            <div className={`
                              inline-flex items-center justify-center w-6 h-6 rounded-full border transition-all
                              ${isCollected 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm scale-110' 
                                : 'bg-white border-slate-300 text-transparent group-hover:border-emerald-300'}
                            `}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-sm text-slate-400">#{card.number}</td>
                          <td className="p-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-9 h-12 bg-slate-200 rounded overflow-hidden relative flex-shrink-0 shadow-sm border border-slate-200">
                                      <img src={card.imageUrl} alt={card.name} loading="lazy" className="w-full h-full object-cover" />
                                  </div>
                                  <span className={`font-medium ${isCollected ? 'text-emerald-900' : 'text-slate-700'}`}>
                                      {card.name}
                                  </span>
                              </div>
                          </td>
                          <td className="p-4 hidden sm:table-cell text-sm text-slate-500">{card.supertype}</td>
                          <td className="p-4 hidden md:table-cell">
                              <span className={`
                                inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border
                                ${isCollected 
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                                  : 'bg-slate-100 text-slate-600 border-slate-200'}
                              `}>
                                  {card.rarity}
                              </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;