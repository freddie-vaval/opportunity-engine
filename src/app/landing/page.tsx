'use client';

import { useState } from 'react';
import Link from 'next/link';

const UNICORNS = [
  {
    rank: 1,
    name: 'TradieHQ',
    category: 'SaaS',
    emoji: '🔥🔥🔥',
    label: 'UNSTOPPABLE',
    market: '£800M',
    price: 49,
    revenue: '£9.8k/mo',
    angle: 'Freddie literally runs a bike workshop. He IS the target market. Cheaper than Jobber (£599/mo).',
    color: '#ff6b35',
  },
  {
    rank: 2,
    name: 'NoShow',
    category: 'SaaS',
    emoji: '🔥🔥🔥',
    label: 'UNSTOPPABLE',
    market: '£800M lost',
    price: 19,
    revenue: '£3.8k/mo + 2%',
    angle: 'Every service business misses calls. A missed call = £50-200 lost. Universal problem, £0 CAC.',
    color: '#ef4444',
  },
  {
    rank: 3,
    name: 'AIReceptionist',
    category: 'SaaS',
    emoji: '⚡⚡',
    label: 'STRONG',
    market: '£3.2B',
    price: 79,
    revenue: '£15.8k/mo',
    angle: 'Freddie is already building this for BikeClinique. Package it. Voice clone = unfair advantage.',
    color: '#eab308',
  },
  {
    rank: 4,
    name: 'NoMoreSpreadsheets',
    category: 'SaaS',
    emoji: '🔥🔥🔥',
    label: 'UNSTOPPABLE',
    market: '£2.4B',
    price: 19,
    revenue: '£9.5k/mo',
    angle: 'CRM for people who hate CRMs. Dead simple, mobile-first.',
    color: '#a855f7',
  },
  {
    rank: 5,
    name: 'Receipt2',
    category: 'SaaS',
    emoji: '🔥🔥🔥',
    label: 'UNSTOPPABLE',
    market: '£1.6B',
    price: 17,
    revenue: '£17k/mo',
    angle: 'Accounting for non-accountants. Every freelancer needs this.',
    color: '#22c55e',
  },
  {
    rank: 6,
    name: 'BetterThanGym',
    category: 'Subscription',
    emoji: '🔥🔥🔥',
    label: 'UNSTOPPABLE',
    market: '£5.2B',
    price: 12,
    revenue: '£12k/mo',
    angle: 'Netflix for home fitness — women 30+. Huge retention, recurring revenue.',
    color: '#ec4899',
  },
  {
    rank: 7,
    name: 'WaitlistIQ',
    category: 'SaaS',
    emoji: '⚡⚡',
    label: 'STRONG',
    market: 'All launches',
    price: 29,
    revenue: '£14.5k/mo',
    angle: '500 product launches/mo. Turn waitlists into preorders.',
    color: '#3b82f6',
  },
  {
    rank: 8,
    name: 'MicroSwap',
    category: 'Marketplace',
    emoji: '💡',
    label: 'INTERESTING',
    market: '£4.8B',
    price: 0,
    revenue: '£2.5k/mo',
    angle: 'Freelance marketplace with escrow. 10% commission.',
    color: '#06b6d4',
  },
  {
    rank: 9,
    name: 'BlindDate',
    category: 'App',
    emoji: '💡',
    label: 'INTERESTING',
    market: '£250M',
    price: 49,
    revenue: '£9.8k/mo',
    angle: 'Matchmaking for over-35s. Niche but premium £49/mo.',
    color: '#f43f5e',
  },
  {
    rank: 10,
    name: 'RentMyKit',
    category: 'Marketplace',
    emoji: '💡',
    label: 'INTERESTING',
    market: '£2.1B',
    price: 0,
    revenue: '£1.5k/mo',
    angle: 'Airbnb for outdoor gear. 15% commission.',
    color: '#14b8a6',
  },
];

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Store lead - for now just show success
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        header { padding: 20px 0; position: fixed; width: 100%; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); z-index: 100; border-bottom: 1px solid rgba(255,255,255,0.06); }
        header .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 20px; font-weight: 800; color: '#ff6b35'; letter-spacing: '-0.02em'; }
        .logo span { color: 'rgba(255,255,255,0.6)'; }
        .hero { padding: 160px 0 100px; text-align: center; position: relative; }
        .hero::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%); pointer-events: none; }
        .badge { display: inline-block; background: 'rgba(255,107,53,0.15)'; border: '1px solid rgba(255,107,53,0.3)'; color: '#ff6b35'; font-size: 11px; font-weight: 700; letter-spacing: '0.15em'; text-transform: 'uppercase'; padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; }
        .hero h1 { font-size: clamp(48px, 8vw, 80px); font-weight: 800; line-height: 1.05; margin-bottom: 24px; letter-spacing: '-0.03em'; }
        .hero h1 .accent { color: '#ff6b35'; }
        .hero p { font-size: 20px; color: rgba(255,255,255,0.5); max-width: 560px; margin: 0 auto 40px; line-height: 1.6; }
        .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: '#ff6b35'; color: white; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { background: '#e55a2b'; transform: translateY(-1px); }
        .btn-secondary { background: rgba(255,255,255,0.08); color: white; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; text-decoration: none; border: '1px solid rgba(255,255,255,0.15)'; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.12); }
        .divider { text-align: center; margin: 80px 0 60px; }
        .divider h2 { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.3); letter-spacing: '0.2em'; text-transform: uppercase; }
        .divider-line { display: flex; align-items: center; gap: 16px; margin-top: 16px; }
        .divider-line::before, .divider-line::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .unicorns-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 60px; }
        .unicorn-card { background: rgba(255,255,255,0.03); border: '1px solid rgba(255,255,255,0.08)'; border-radius: 16px; padding: 24px; transition: all 0.2s; position: relative; overflow: hidden; }
        .unicorn-card:hover { border-color: 'rgba(255,255,255,0.15)'; transform: translateY(-2px); }
        .unicorn-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--card-color); opacity: 0.8; }
        .card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
        .card-rank { font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 600; }
        .card-label { font-size: 10px; font-weight: 700; letter-spacing: '0.1em'; padding: 3px 8px; border-radius: 4px; }
        .card-emoji { font-size: 28px; margin: 12px 0 8px; }
        .card-name { font-size: 22px; font-weight: 800; margin-bottom: 4px; letter-spacing: '-0.02em'; }
        .card-category { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 12px; text-transform: 'uppercase'; letter-spacing: '0.1em'; }
        .card-revenue { font-size: 24px; font-weight: 800; color: '#ff6b35'; margin-bottom: 4px; }
        .card-revenue-label { font-size: 11px; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
        .card-angle { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; font-style: 'italic'; }
        .card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
        .card-stat { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; text-align: center; }
        .card-stat-val { font-size: 18px; font-weight: 700; color: 'white'; }
        .card-stat-label { font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: '0.05em'; }
        .signup-section { background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border: '1px solid rgba(255,107,53,0.2)'; border-radius: 24px; padding: 60px; text-align: center; margin: 80px 0; }
        .signup-section h2 { font-size: 36px; font-weight: 800; margin-bottom: 12px; letter-spacing: '-0.02em'; }
        .signup-section p { color: rgba(255,255,255,0.5); font-size: 16px; margin-bottom: 32px; }
        .email-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
        .email-input { flex: 1; min-width: 240px; padding: 14px 18px; background: rgba(255,255,255,0.08); border: '1px solid rgba(255,255,255,0.15)'; border-radius: 10px; color: white; font-size: 16px; outline: none; }
        .email-input:focus { border-color: '#ff6b35'; }
        .footer { text-align: center; padding: 40px 0; border-top: '1px solid rgba(255,255,255,0.05)'; color: rgba(255,255,255,0.3); font-size: 13px; }
        .success-state { text-align: center; padding: 60px; }
        .success-state h2 { font-size: 36px; font-weight: 800; margin-bottom: 12px; color: '#39FF14'; }
        .success-state p { color: rgba(255,255,255,0.5); font-size: 16px; }
        @media (max-width: 640px) {
          .hero h1 { font-size: 42px; }
          .signup-section { padding: 32px 20px; }
          .unicorns-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="container">
          <div className="logo">🦄 <span>Unicorn</span></div>
          <Link href="/#opportunities" className="btn-secondary" style={{ fontSize: '14px', padding: '10px 20px' }}>
            See the 10 →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="badge">🧠 Powered by AI · Scanned Weekly</div>
          <h1>
            10 Businesses<br />
            <span className="accent">Worth Building</span>
          </h1>
          <p>
            Not ebooks. Not side hustles. Real businesses that can hit £10k–£100k/month. 
            Found by scanning thousands of frustrated communities with AI.
          </p>
          <div className="cta-row">
            <a href="#opportunities" className="btn-primary">See the 10 →</a>
            <a href="#signup" className="btn-secondary">Get New Opportunities Weekly</a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider container">
        <div className="divider-line" />
        <h2 style={{ marginTop: 0 }}>Current Opportunities</h2>
      </div>

      {/* Unicorns Grid */}
      <section id="opportunities" style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="unicorns-grid">
            {UNICORNS.map(u => (
              <div key={u.rank} className="unicorn-card" style={{ '--card-color': u.color } as React.CSSProperties}>
                <div className="card-top">
                  <span className="card-rank">#{u.rank}</span>
                  <span className="card-label" style={{ background: `${u.color}22`, color: u.color }}>
                    {u.label}
                  </span>
                </div>
                <div className="card-emoji">{u.emoji}</div>
                <div className="card-name">{u.name}</div>
                <div className="card-category">{u.category} · {u.market} market</div>
                <div className="card-stats">
                  <div className="card-stat">
                    <div className="card-stat-val">£{u.price}</div>
                    <div className="card-stat-label">per mo</div>
                  </div>
                  <div className="card-stat">
                    <div className="card-stat-val" style={{ color: '#39FF14', fontSize: '14px' }}>{u.revenue.split(' ')[0]}</div>
                    <div className="card-stat-label">target/mo</div>
                  </div>
                </div>
                <div className="card-angle">"{u.angle}"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup */}
      <section id="signup">
        <div className="container">
          <div className="signup-section">
            {submitted ? (
              <div className="success-state">
                <h2>✓ You're on the list</h2>
                <p>We'll send you new opportunities every week. Tell a friend who needs this.</p>
              </div>
            ) : (
              <>
                <h2>Get Opportunities<br />Before Everyone Else</h2>
                <p>New unicorns, fresh market scans, and what's actually working — weekly.</p>
                <form className="email-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="email-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? '...' : 'Join the list'}
                  </button>
                </form>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '16px' }}>
                  No spam. Unsubscribe anytime. Weekly scan results only.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <p>🦄 Unicorn · AI-Powered Business Opportunity Scanner · Updated weekly</p>
      </footer>
    </div>
  );
}
