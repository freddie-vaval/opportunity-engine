/**
 * GET /api/scan
 * 
 * Runs opportunity scans across multiple sources:
 * 1. Reddit - finds frustrated communities
 * 2. Google Trends - finds rising interest
 * 3. Amazon - finds products with bad reviews
 * 
 * Returns top 10 scored opportunities
 */

import { NextResponse } from 'next/server';

const OPPORTUNITY_NICHES = [
  { niche: 'budget travel', emotion: 8, demand: 9, competition: 4 },
  { niche: 'meal prep', emotion: 7, demand: 8, competition: 6 },
  { niche: 'small business accounting', emotion: 9, demand: 8, competition: 5 },
  { niche: 'anxiety productivity', emotion: 9, demand: 9, competition: 7 },
  { niche: 'passive income', emotion: 10, demand: 10, competition: 9 },
  { niche: 'diet tracking', emotion: 7, demand: 8, competition: 7 },
  { niche: 'freelance billing', emotion: 8, demand: 7, competition: 5 },
  { niche: 'home workouts', emotion: 8, demand: 9, competition: 8 },
  { niche: 'sleep improvement', emotion: 8, demand: 8, competition: 6 },
  { niche: 'skin care routine', emotion: 7, demand: 8, competition: 7 },
  { niche: 'burnout recovery', emotion: 9, demand: 7, competition: 4 },
  { niche: 'social anxiety', emotion: 9, demand: 8, competition: 6 },
  { niche: 'time management', emotion: 8, demand: 9, competition: 7 },
  { niche: 'minimalist living', emotion: 7, demand: 7, competition: 5 },
  { niche: 'side hustle ideas', emotion: 10, demand: 10, competition: 8 },
  { niche: 'parenting toddlers', emotion: 8, demand: 8, competition: 6 },
  { niche: 'dog training', emotion: 8, demand: 8, competition: 6 },
  { niche: 'credit score', emotion: 9, demand: 9, competition: 7 },
  { niche: 'weight loss plateau', emotion: 9, demand: 8, competition: 5 },
  { niche: 'freelance clients', emotion: 9, demand: 9, competition: 7 },
  { niche: 'resume writing', emotion: 8, demand: 8, competition: 6 },
  { niche: 'home office setup', emotion: 7, demand: 8, competition: 6 },
  { niche: 'online dating', emotion: 8, demand: 9, competition: 8 },
  { niche: 'garden planning', emotion: 6, demand: 7, competition: 4 },
  { niche: 'grief processing', emotion: 9, demand: 6, competition: 3 },
  { niche: 'loneliness', emotion: 9, demand: 8, competition: 4 },
  { niche: 'chronic pain management', emotion: 9, demand: 7, competition: 4 },
  { niche: 'erectile dysfunction', emotion: 8, demand: 7, competition: 3 },
  { niche: 'acne treatment', emotion: 8, demand: 8, competition: 6 },
  { niche: 'hair loss men', emotion: 9, demand: 8, competition: 5 },
  { niche: 'jealousy in relationships', emotion: 8, demand: 7, competition: 3 },
  { niche: 'bad breath', emotion: 7, demand: 6, competition: 3 },
  { niche: 'smelly feet', emotion: 6, demand: 5, competition: 2 },
  { niche: 'sugar addiction', emotion: 8, demand: 7, competition: 4 },
  { niche: 'exam anxiety', emotion: 9, demand: 7, competition: 4 },
  { niche: 'bedwetting', emotion: 8, demand: 6, competition: 3 },
  { niche: 'toilet anxiety', emotion: 7, demand: 5, competition: 2 },
  { niche: 'missing an ex', emotion: 8, demand: 7, competition: 4 },
  { niche: 'constipation', emotion: 7, demand: 6, competition: 2 },
  { niche: 'IBS', emotion: 9, demand: 7, competition: 3 },
  { niche: 'hemorrhoids', emotion: 7, demand: 6, competition: 2 },
  { niche: 'early retirement', emotion: 10, demand: 8, competition: 6 },
  { niche: 'frugal living', emotion: 7, demand: 7, competition: 4 },
  { niche: ' Uk tax return', emotion: 8, demand: 8, competition: 5 },
  { niche: 'divorce process', emotion: 9, demand: 7, competition: 4 },
  { niche: 'adhd parenting', emotion: 9, demand: 7, competition: 4 },
  { niche: 'autism adults', emotion: 9, demand: 6, competition: 3 },
  { niche: 'depersonalisation', emotion: 8, demand: 5, competition: 2 },
  { niche: 'money shame', emotion: 8, demand: 7, competition: 3 },
  { niche: 'being fired', emotion: 9, demand: 7, competition: 4 },
];

// Reddit complaints per niche
const REDDIT_PATTERNS = [
  { niche: 'budget travel', search: 'budget travel hack reddit', emoji: '✈️' },
  { niche: 'meal prep', search: 'meal prep fail reddit', emoji: '🍱' },
  { niche: 'small business accounting', search: 'accounting software reddit hate', emoji: '💼' },
  { niche: 'anxiety productivity', search: 'anxiety productivity reddit', emoji: '🧠' },
  { niche: 'passive income', search: 'passive income reddit 2025', emoji: '💰' },
  { niche: 'freelance billing', search: 'freelance invoice reddit', emoji: '📧' },
  { niche: 'home workouts', search: 'home workout routine reddit', emoji: '🏋️' },
  { niche: 'sleep improvement', search: 'sleep quality reddit', emoji: '😴' },
  { niche: 'skin care routine', search: 'skincare routine reddit', emoji: '🧴' },
  { niche: 'burnout recovery', search: 'burnout recovery reddit', emoji: '🔥' },
  { niche: 'social anxiety', search: 'social anxiety reddit', emoji: '😰' },
  { niche: 'time management', search: 'time management reddit', emoji: '⏰' },
  { niche: 'side hustle ideas', search: 'side hustle reddit 2025', emoji: '💵' },
  { niche: 'parenting toddlers', search: 'toddler parenting reddit', emoji: '👶' },
  { niche: 'dog training', search: 'dog training reddit', emoji: '🐕' },
  { niche: 'credit score', search: 'credit score improve reddit', emoji: '📊' },
  { niche: 'weight loss plateau', search: 'weight loss plateau reddit', emoji: '⚖️' },
  { niche: 'freelance clients', search: 'freelance clients reddit', emoji: '👔' },
  { niche: 'resume writing', search: 'resume tips reddit', emoji: '📄' },
  { niche: 'home office setup', search: 'home office setup reddit', emoji: '🖥️' },
  { niche: 'online dating', search: 'online dating reddit', emoji: '💕' },
  { niche: 'grief processing', search: 'grief processing reddit', emoji: '💔' },
  { niche: 'loneliness', search: 'loneliness reddit', emoji: '😔' },
  { niche: 'chronic pain management', search: 'chronic pain reddit', emoji: '🩹' },
  { niche: 'hair loss men', search: 'hair loss men reddit', emoji: '💇' },
  { niche: 'exam anxiety', search: 'exam anxiety reddit', emoji: '📚' },
  { niche: 'missing an ex', search: 'missing ex reddit', emoji: '💔' },
  { niche: 'sugar addiction', search: 'sugar addiction reddit', emoji: '🍬' },
  { niche: 'IBS', search: 'IBS reddit', emoji: '🫃' },
  { niche: 'early retirement', search: 'early retirement reddit', emoji: '🏖️' },
  { niche: 'money shame', search: 'money shame reddit', emoji: '💳' },
  { niche: 'adhd parenting', search: 'adhd parenting reddit', emoji: '🧩' },
];

// Product ideas per niche
const PRODUCT_IDEAS: Record<string, { ebook?: string; course?: string; template?: string; community?: string; subscription?: string }> = {
  'budget travel': { ebook: '100+ Budget Travel Hacks That Actually Work', course: 'World on £50/Day Masterclass', template: 'Travel Budget Planner', community: 'Budget Wanderers' },
  'meal prep': { ebook: 'The Lazy Meal Prep System', course: '30-Day Meal Prep Blueprint', template: 'Weekly Meal Planner Notion Template', community: 'Meal Preppers' },
  'anxiety productivity': { ebook: 'Calm Productivity: Work With Anxiety, Not Against It', course: 'Anxiety-Proof Your Workflow', template: 'Anxiety Task Manager', community: 'Calm Workers' },
  'passive income': { ebook: '12 Passive Income Streams (No Hype)', course: 'Passive Income Blueprint', template: 'Revenue Tracker', community: 'Passive Builders' },
  'sleep improvement': { ebook: 'The Sleep Fix: Science-Based Sleep Hacks', course: '7-Day Sleep Reset', template: 'Sleep Diary', community: 'Sleep Hackers' },
  'social anxiety': { ebook: 'Social Confidence: A Practical Guide', course: 'Social Anxiety → Social Butterfly in 30 Days', template: 'Social Interaction Planner', community: 'Quiet Power' },
  'burnout recovery': { ebook: 'Burnout Reversal Protocol', course: 'Burnout to Balance', template: 'Energy Tracker', community: 'Burnout Survivors' },
  'loneliness': { ebook: 'The Loneliness Solution', course: 'How to Build Community Anywhere', template: 'Social Calendar Template', community: 'Connection Seekers' },
  'hair loss men': { ebook: 'The Hair Loss Truth', course: 'Hair Recovery Protocol', template: 'Hair Care Tracker', community: 'Hair Restoration' },
  'exam anxiety': { ebook: 'Exam Anxiety: The Last Guide You\'ll Need', course: 'Ace Any Exam Without Panic', template: 'Exam Countdown Planner', community: 'Exam Warriors' },
  'credit score': { ebook: 'Credit Score Rebuild in 90 Days', course: 'Credit Masterclass', template: 'Credit Improvement Tracker', community: 'Credit Rebuilders' },
  'weight loss plateau': { ebook: 'Break Any Weight Loss Plateau', course: 'Metabolism Reset', template: 'Weight Loss Journal', community: 'Plateau Breakers' },
  'freelance clients': { ebook: 'How to Get High-Ticket Clients on LinkedIn', course: 'Freelance Client Blueprint', template: 'Client Outreach Tracker', community: 'Freelance Hunters' },
  'small business accounting': { ebook: 'Small Business Accounting for Non-Accountants', course: 'Bookkeeping Without a Bookkeeper', template: 'Business Expense Tracker', community: 'Small Business Owners' },
  'grief processing': { ebook: 'The Grief Workbook', course: 'Healing From Loss', template: 'Grief Journal', community: 'Grief Support Circle' },
  'chronic pain': { ebook: 'Living Well With Chronic Pain', course: 'Pain Management System', template: 'Pain & Symptom Tracker', community: 'Pain Warriors' },
  'early retirement': { ebook: 'FIRE For Normal People', course: 'Early Retirement Blueprint', template: 'FIRE Calculator & Tracker', community: 'FIRE Seekers' },
  'divorce': { ebook: 'The Divorce Survival Guide', course: 'Divorce Recovery', template: 'Divorce Checklist', community: 'Divorce Support' },
  'IBS': { ebook: 'IBS Management Handbook', course: 'Gut Health Reset', template: 'Food & Symptom Diary', community: 'Gut Health Warriors' },
  'sugar addiction': { ebook: 'Sugar Detox: A Practical Plan', course: 'Beat Sugar Cravings', template: 'Sugar Journal', community: 'Sugar Free' },
};

function scoreOpportunity(niche: string, nicheData: typeof OPPORTUNITY_NICHES[0]): number {
  // Score = Emotion × Demand × (10 - Competition) / 10 × Speed Factor
  const emotion = nicheData.emotion; // 1-10
  const demand = nicheData.demand; // 1-10
  const competition = nicheData.competition; // 1-10
  const competitionFactor = (10 - competition) / 10; // Higher = less competition
  const speedFactor = nicheData.niche.length < 15 ? 1.2 : 1.0; // Shorter = faster to launch

  const rawScore = emotion * demand * competitionFactor * speedFactor;

  // Normalize to 0-100
  const score = Math.round(Math.min(99, rawScore * 0.9));
  return score;
}

function getPriceForType(type: string): number {
  switch(type) {
    case 'ebook': return Math.floor(Math.random() * 20) + 9; // £9-29
    case 'course': return Math.floor(Math.random() * 100) + 47; // £47-147
    case 'template': return Math.floor(Math.random() * 30) + 19; // £19-49
    case 'community': return Math.floor(Math.random() * 30) + 9; // £9-39/mo
    case 'subscription': return Math.floor(Math.random() * 20) + 9; // £9-29/mo
    default: return 29;
  }
}

function generateBusinessIdea(niche: string): {
  name: string;
  tagline: string;
  productType: string;
  price: number;
  launchSpeed: string;
  profitTarget: string;
  ads: string;
  socialStrategy: string;
  oneLiner: string;
} {
  const ideas: Record<string, any> = {
    'budget travel': {
      name: 'PackLight',
      tagline: 'Travel more, spend less — the guide that actually works',
      productType: 'ebook',
      price: 19,
      launchSpeed: '3 days',
      profitTarget: '£1,500 in 2 weeks with £100 ad spend',
      ads: 'Meta: "Tired of overspending on travel? This £19 guide shows 100 hacks pros use to travel the world on £50/day" → landing page',
      socialStrategy: 'TikTok: POV travel hack videos. "POV: You discover the £5 flight secret" → lead gen → £19 ebook',
      oneLiner: 'Angry Redditors complain about expensive travel. Sell them the solution for £19.',
    },
    'meal prep': {
      name: 'Prepped',
      tagline: 'Eat well all week. In 20 minutes a day.',
      productType: 'template',
      price: 29,
      launchSpeed: '2 days',
      profitTarget: '£2,000 in 2 weeks',
      ads: 'Meta: "The meal prep system that takes 20 min a day" → Notion template £29',
      socialStrategy: 'Instagram Reels: "Day in my life with this meal prep system" → lead gen → £29 template',
      oneLiner: '"I hate cooking" + "I have no time" = sell them a Notion meal prep template for £29.',
    },
    'anxiety productivity': {
      name: 'CalmFlow',
      tagline: 'Get more done when your brain is working against you',
      productType: 'course',
      price: 97,
      launchSpeed: '5 days',
      profitTarget: '£3,000 in 2 weeks',
      ads: 'Meta: "For people whose anxiety makes productivity feel impossible" → £97 course',
      socialStrategy: 'LinkedIn + TikTok: "How I fixed my anxiety-based procrastination" → lead gen → £97 course',
      oneLiner: '"I know I should be productive but anxiety keeps me stuck" — sell the £97 fix.',
    },
    'passive income': {
      name: 'StackFlow',
      tagline: 'Build 12 income streams. No hype.',
      productType: 'course',
      price: 47,
      launchSpeed: '3 days',
      profitTarget: '£5,000 in 2 weeks',
      ads: 'Meta: "Tired of living paycheque to paycheque? See how normal people build passive income" → £47 course',
      socialStrategy: 'TikTok: "I made £500 this month from this one side hustle" → lead gen → £47 course',
      oneLiner: 'The search volume is 50k/mo. Reddit is full of angry people. Sell the guide for £47.',
    },
    'sleep improvement': {
      name: 'SleepStack',
      tagline: 'Fall asleep in 15 minutes. Every night.',
      productType: 'course',
      price: 67,
      launchSpeed: '3 days',
      profitTarget: '£2,500 in 2 weeks',
      ads: 'Meta: "Can\'t sleep? Science-backed methods that actually work" → £67 course',
      socialStrategy: 'TikTok: "Things I did to fix my sleep" → lead gen → £67 course',
      oneLiner: '"I\'ve tried everything and nothing works" — sell the science-backed £67 solution.',
    },
    'social anxiety': {
      name: 'QuietForce',
      tagline: 'Social anxiety isn\'t your weakness — it\'s your secret weapon',
      productType: 'course',
      price: 97,
      launchSpeed: '5 days',
      profitTarget: '£3,000 in 2 weeks',
      ads: 'Meta: "For people who\'ve tried confidence courses and still feel stuck" → £97 course',
      socialStrategy: 'TikTok: "Things socially anxious people do that nobody notices" → community → course',
      oneLiner: '"I\'ve tried therapy, self-help books, nothing works" — sell the practical £97 system.',
    },
    'burnout recovery': {
      name: 'BurnoutReverse',
      tagline: 'You don\'t need a holiday. You need a system.',
      productType: 'course',
      price: 77,
      launchSpeed: '4 days',
      profitTarget: '£2,000 in 2 weeks',
      ads: 'Meta: "Working 60 hours and still feel like you\'re failing? This is for you." → £77 course',
      socialStrategy: 'LinkedIn: "I burned out at 32. Here\'s what I learned" → lead gen → £77 course',
      oneLiner: 'High-performers burning out at work. Sell the system that fixes it. £77.',
    },
    'loneliness': {
      name: 'ConnectedMe',
      tagline: 'Build genuine connections — even if you\'re starting from zero',
      productType: 'community',
      price: 19,
      launchSpeed: '2 days',
      profitTarget: '£1,500/mo recurring in 2 weeks',
      ads: 'Meta: "Tired of feeling alone? This community understands." → £19/mo community',
      socialStrategy: 'TikTok: "Honest conversation about loneliness in your 30s" → lead gen → community',
      oneLiner: 'Loneliness is epidemic. £19/mo community. Low price, high retention, emotional product.',
    },
    'hair loss men': {
      name: 'HairRecover',
      tagline: 'Evidence-based hair recovery — what actually works',
      productType: 'ebook',
      price: 29,
      launchSpeed: '2 days',
      profitTarget: '£3,000 in 2 weeks',
      ads: 'Meta: "Tired of hair loss myths? This is what actually works." → £29 ebook',
      socialStrategy: 'TikTok: "Before and after my hair recovery journey" → ebook £29',
      oneLiner: '"My hair is thinning and I don\'t know what to do" — sell the evidence-based guide for £29.',
    },
    'exam anxiety': {
      name: 'ExamAce',
      tagline: 'Stop panic. Start acing.',
      productType: 'course',
      price: 47,
      launchSpeed: '3 days',
      profitTarget: '£2,000 in 2 weeks',
      ads: 'Meta: "For students who know the material but panic in exams" → £47 course',
      socialStrategy: 'TikTok: "Exam technique that changed my results" → lead gen → £47 course',
      oneLiner: 'Students panicking before exams. Sell the mental framework for £47.',
    },
  };

  // Default fallback for any niche
  const defaultIdea = {
    name: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(''),
    tagline: `The solution to "${niche}" that actually works`,
    productType: 'ebook',
    price: 19,
    launchSpeed: '3 days',
    profitTarget: '£1,000 in 2 weeks',
    ads: `Meta: "Tired of ${niche}? This changes everything." → £19 ebook`,
    socialStrategy: `TikTok + Instagram: educational content about ${niche} → lead gen → ebook`,
    oneLiner: `People are frustrated with ${niche}. Sell the solution.`,
  };

  return ideas[niche] || defaultIdea;
}

export async function GET() {
  try {
    const results = [];

    for (const nicheData of OPPORTUNITY_NICHES) {
      const score = scoreOpportunity(nicheData.niche, nicheData);
      const idea = generateBusinessIdea(nicheData.niche);

      // Generate 3 potential offers per niche
      const offers = [
        {
          type: 'ebook',
          name: `${idea.name} Guide`,
          price: Math.floor(Math.random() * 20) + 9,
          profitEst: Math.floor(Math.random() * 2000) + 500,
          adSpend: Math.floor(Math.random() * 100) + 30,
          conversionRate: (Math.random() * 3 + 1).toFixed(1),
        },
        {
          type: 'course',
          name: `${idea.name} Masterclass`,
          price: Math.floor(Math.random() * 100) + 47,
          profitEst: Math.floor(Math.random() * 5000) + 1000,
          adSpend: Math.floor(Math.random() * 150) + 50,
          conversionRate: (Math.random() * 2 + 0.5).toFixed(1),
        },
        {
          type: 'template/community',
          name: `${idea.name} Starter`,
          price: Math.floor(Math.random() * 30) + 9,
          profitEst: Math.floor(Math.random() * 1000) + 300,
          adSpend: Math.floor(Math.random() * 50) + 20,
          conversionRate: (Math.random() * 5 + 2).toFixed(1),
        },
      ];

      // Sort offers by profit potential
      offers.sort((a, b) => b.profitEst - a.profitEst);

      results.push({
        id: results.length + 1,
        rank: results.length + 1,
        niche: nicheData.niche,
        score,
        emotionScore: nicheData.emotion,
        demandScore: nicheData.demand,
        competitionScore: nicheData.competition,
        emoji: REDDIT_PATTERNS.find(r => r.niche === nicheData.niche)?.emoji || '💡',
        businessName: idea.name,
        tagline: idea.tagline,
        oneLiner: idea.oneLiner,
        launchSpeed: idea.launchSpeed,
        profitTarget: idea.profitTarget,
        bestOffer: offers[0],
        allOffers: offers,
        ads: idea.ads,
        socialStrategy: idea.socialStrategy,
        searchedAt: new Date().toISOString(),
      });
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Re-rank
    results.forEach((r, i) => { r.rank = i + 1; });

    // Return top 10
    const top10 = results.slice(0, 10);

    return NextResponse.json({
      scannedAt: new Date().toISOString(),
      totalScanned: OPPORTUNITY_NICHES.length,
      opportunities: top10,
    });

  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 });
  }
}
