'use client';

import { useState, useEffect } from 'react';

interface Opportunity {
  id: number;
  rank: number;
  niche: string;
  score: number;
  emotionScore: number;
  demandScore: number;
  competitionScore: number;
  emoji: string;
  businessName: string;
  tagline: string;
  oneLiner: string;
  launchSpeed: string;
  profitTarget: string;
  bestOffer: {
    type: string;
    name: string;
    price: number;
    profitEst: number;
    adSpend: number;
    conversionRate: string;
  };
  allOffers: any[];
  ads: string;
  socialStrategy: string;
}

export default function OpportunityDashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [scannedAt, setScannedAt] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  async function runScan() {
    setScanning(true);
    setLoading(true);
    try {
      const res = await fetch('/api/scan');
      const data = await res.json();
      if (data.opportunities) {
        setOpportunities(data.opportunities);
        setScannedAt(data.scannedAt);
        setLastRefresh(new Date());
      }
    } catch (err) {
      console.error('Scan failed:', err);
    }
    setLoading(false);
    setScanning(false);
  }

  useEffect(() => {
    runScan();
  }, []);

  function getScoreColor(score: number) {
    if (score >= 80) return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', label: '🔥 Hot' };
    if (score >= 60) return { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400', label: '⚡ Strong' };
    return { bg: 'bg-gray-500/20', border: 'border-gray-500/50', text: 'text-gray-400', label: '💡 Decent' };
  }

  function getOfferBadge(type: string) {
    switch(type) {
      case 'ebook': return { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'eBook' };
      case 'course': return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Course' };
      case 'template/community': return { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Template' };
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: type };
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-sm">⚡</div>
            <div>
              <h1 className="font-bold text-lg">Opportunity Engine</h1>
              <p className="text-xs text-gray-500">AI-powered business idea finder</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className="text-xs text-gray-500 hidden sm:block">
                Last scan: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={runScan}
              disabled={scanning}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>🔄 Rescan</>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Opportunities Scanned', value: opportunities.length || '—', icon: '🎯' },
            { label: 'Avg Score', value: opportunities.length ? Math.round(opportunities.reduce((s, o) => s + o.score, 0) / opportunities.length) : '—', icon: '📊' },
            { label: 'Top Niche', value: opportunities[0]?.niche || '—', icon: opportunities[0]?.emoji || '💡', small: true },
            { label: 'Avg Launch Time', value: '3 days', icon: '🚀' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className={`font-bold ${stat.small ? 'text-sm' : 'text-xl'} text-white`}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Scanning 50 niches across Reddit, Trends & Markets...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top 3 highlight */}
            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-widest text-orange-400 font-medium mb-4">🔥 Top Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {opportunities.slice(0, 3).map(opp => {
                  const style = getScoreColor(opp.score);
                  return (
                    <button
                      key={opp.id}
                      onClick={() => setSelectedOpp(selectedOpp?.id === opp.id ? null : opp)}
                      className={`text-left rounded-2xl p-5 border transition-all hover:scale-[1.01] ${style.bg} ${style.border}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{opp.emoji}</div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${style.text}`}>{opp.score}</div>
                          <div className="text-xs text-gray-500">score</div>
                        </div>
                      </div>
                      <div className="font-bold text-white text-lg mb-1 capitalize">{opp.niche}</div>
                      <div className="text-sm text-gray-400 mb-3">{opp.businessName} — {opp.tagline}</div>
                      <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.text}`}>
                        {style.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full ranked list */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4">All Opportunities</h2>
              <div className="space-y-2">
                {opportunities.map(opp => {
                  const style = getScoreColor(opp.score);
                  const offerBadge = getOfferBadge(opp.bestOffer.type);
                  return (
                    <button
                      key={opp.id}
                      onClick={() => setSelectedOpp(selectedOpp?.id === opp.id ? null : opp)}
                      className={`w-full text-left rounded-xl p-4 border transition-all ${
                        selectedOpp?.id === opp.id
                          ? 'bg-orange-500/10 border-orange-500/50'
                          : 'bg-[#0f0f0f] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${style.bg} ${style.text} flex-shrink-0`}>
                          #{opp.rank}
                        </div>
                        <div className="text-2xl flex-shrink-0">{opp.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-white capitalize">{opp.niche}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${offerBadge.bg} ${offerBadge.text}`}>
                              {offerBadge.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 truncate">{opp.oneLiner}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`font-bold text-lg ${style.text}`}>{opp.score}</div>
                          <div className="text-xs text-gray-500">{opp.launchSpeed}</div>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {selectedOpp?.id === opp.id && (
                        <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">The Opportunity</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{opp.oneLiner}</p>
                            <div className="p-3 bg-black/30 rounded-xl">
                              <p className="text-xs text-gray-500 mb-1">Best offer</p>
                              <p className="text-white font-semibold">{opp.bestOffer.name} — £{opp.bestOffer.price}</p>
                              <p className="text-xs text-gray-500 mt-1">Est. profit: £{opp.bestOffer.profitEst.toLocaleString()}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Ad Strategy</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{opp.ads}</p>
                            <div className="flex gap-4">
                              <div className="flex-1 p-3 bg-black/30 rounded-xl text-center">
                                <div className="text-lg font-bold text-orange-400">£{opp.bestOffer.adSpend}</div>
                                <div className="text-xs text-gray-500">Ad Spend</div>
                              </div>
                              <div className="flex-1 p-3 bg-black/30 rounded-xl text-center">
                                <div className="text-lg font-bold text-green-400">{opp.bestOffer.conversionRate}%</div>
                                <div className="text-xs text-gray-500">Conv. Rate</div>
                              </div>
                              <div className="flex-1 p-3 bg-black/30 rounded-xl text-center">
                                <div className="text-lg font-bold text-white">{opp.launchSpeed}</div>
                                <div className="text-xs text-gray-500">Launch</div>
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Social Strategy</h4>
                            <p className="text-gray-400 text-sm">{opp.socialStrategy}</p>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
