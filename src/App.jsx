import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Mail,
  MapPin,
  Calendar,
  Palette,
  Code2,
  Zap,
  Globe,
  Layers,
  Server,
  ExternalLink,
  Link,
  AtSign,
  CheckCircle2,
  Loader2,
  Send,
  Star,
  Briefcase,
  Terminal,
  Cloud,
  GitBranch,
} from 'lucide-react';

// ─── Portfolio data  (replace '#' links with real project URLs) ───────────────
const PORTFOLIO = {
  profile: {
    badge: 'Senior Full Stack Engineer · Austin, TX',
    name: 'Ryan Carter',
    headline: 'Turning complex problems into elegant, scalable software.',
    summary:
      'I build full-stack products that handle real-world complexity — from SaaS platforms serving thousands of users to developer tools that make teams more productive. My stack is React, Next.js, TypeScript, and Node.js with Go for performance-critical services.',
    stats: [
      { value: 6, suffix: '+', label: 'Years of Experience' },
      { value: 40, suffix: '+', label: 'Projects Shipped' },
      { value: 15, suffix: '', label: 'Happy Clients' },
    ],
  },

  socials: {
    github: 'https://github.com/ryancarterdev',
    linkedin: 'https://www.linkedin.com/in/ryan-carter-dev',
    email: 'mailto:ryan@ryanbuilds.dev',
  },

  projects: [
    {
      id: 1,
      title: 'Nexus',
      category: 'Team Collaboration',
      tag: 'SaaS',
      description:
        'Real-time workspace with channels, threads, and file sharing. Built to handle 10k+ concurrent users with WebSocket connections and Redis pub/sub for instant message delivery.',
      tech: ['React', 'Node.js', 'WebSockets', 'Redis'],
      year: '2024',
      link: '#',
      accent: '#6366f1',
      gradient:
        'radial-gradient(ellipse at top left, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 60%, transparent 100%)',
    },
    {
      id: 2,
      title: 'Budgetly',
      category: 'Fintech SaaS',
      tag: 'SaaS',
      description:
        'Personal finance app with bank sync, spending analytics, and budget goals. Integrates with 10,000+ financial institutions via the Plaid API and visualises data with D3.js.',
      tech: ['Next.js', 'PostgreSQL', 'Plaid API', 'Prisma'],
      year: '2024',
      link: '#',
      accent: '#10b981',
      gradient:
        'radial-gradient(ellipse at top left, rgba(16,185,129,0.4) 0%, rgba(6,182,212,0.2) 60%, transparent 100%)',
    },
    {
      id: 3,
      title: 'Deploykit',
      category: 'Developer Tool',
      tag: 'Tool',
      description:
        'Visual CI/CD dashboard with live pipeline status, deployment history, log streaming, and Slack/Teams notifications. Supports GitHub Actions, GitLab CI, and CircleCI.',
      tech: ['Vue.js', 'Go', 'Docker', 'WebSockets'],
      year: '2023',
      link: '#',
      accent: '#f59e0b',
      gradient:
        'radial-gradient(ellipse at top left, rgba(245,158,11,0.4) 0%, rgba(239,68,68,0.2) 60%, transparent 100%)',
    },
    {
      id: 4,
      title: 'Storely',
      category: 'E-Commerce Platform',
      tag: 'E-Commerce',
      description:
        'Multi-vendor marketplace with Stripe Connect payouts, inventory tracking, and a configurable storefront builder. Onboarded 200+ vendors within 6 months of launch.',
      tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      year: '2023',
      link: '#',
      accent: '#ec4899',
      gradient:
        'radial-gradient(ellipse at top left, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 60%, transparent 100%)',
    },
    {
      id: 5,
      title: 'MedSync',
      category: 'Healthcare App',
      tag: 'App',
      description:
        'Appointment booking and management system for clinics, with patient portals, automated SMS reminders, EHR integration, and insurance verification flows.',
      tech: ['React', 'Node.js', 'MongoDB', 'Twilio'],
      year: '2022',
      link: '#',
      accent: '#06b6d4',
      gradient:
        'radial-gradient(ellipse at top left, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.2) 60%, transparent 100%)',
    },
    {
      id: 6,
      title: 'Craftboard',
      category: 'Productivity SaaS',
      tag: 'SaaS',
      description:
        'Kanban and sprint planning tool for creative teams — with time tracking, client billing, file proofing workflows, and automated weekly progress reports.',
      tech: ['React', 'TypeScript', 'PostgreSQL', 'Redis'],
      year: '2022',
      link: '#',
      accent: '#f97316',
      gradient:
        'radial-gradient(ellipse at top left, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.2) 60%, transparent 100%)',
    },
  ],

  capabilities: [
    {
      icon: 'code',
      label: 'React & Next.js',
      desc: 'Component architecture, SSR/SSG, performance optimisation, and pixel-perfect UI implementation from Figma to production.',
    },
    {
      icon: 'zap',
      label: 'TypeScript',
      desc: 'Strict type-safe codebases across frontend and backend — fewer bugs, better DX, and confident refactors.',
    },
    {
      icon: 'server',
      label: 'Node.js & Go',
      desc: 'High-throughput APIs, background workers, WebSocket servers, and microservices built for production scale.',
    },
    {
      icon: 'cloud',
      label: 'Cloud & DevOps',
      desc: 'AWS infrastructure, Docker containers, CI/CD pipelines, Terraform IaC, and zero-downtime deployments.',
    },
    {
      icon: 'layers',
      label: 'Database Design',
      desc: 'Relational schemas in PostgreSQL, caching with Redis, document stores in MongoDB — chosen for the right job.',
    },
    {
      icon: 'globe',
      label: 'API Design',
      desc: 'RESTful APIs, GraphQL schemas, real-time WebSockets, and OpenAPI documentation that developers love.',
    },
  ],

  experience: [
    {
      role: 'Senior Full Stack Engineer',
      company: 'Horizon Cloud',
      period: 'Sep 2023 – Present',
      type: 'FULL-TIME',
      desc: 'Leading feature development on the core platform — shipping React + TypeScript frontend improvements, Node.js microservices, and driving architecture decisions across a 20-person engineering team.',
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      role: 'Full Stack Developer',
      company: 'Loopline Inc.',
      period: 'Jun 2021 – Aug 2023',
      type: 'FULL-TIME',
      desc: 'Early-stage SaaS startup — built core product from 0 to $1M ARR. Owned the entire frontend, designed and maintained REST APIs, and helped grow the engineering team from 2 to 8.',
      tech: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'Stripe'],
    },
    {
      role: 'Frontend Developer',
      company: 'Pixel Cabin',
      period: 'Feb 2020 – May 2021',
      type: 'FULL-TIME',
      desc: 'Digital agency building bespoke sites and apps for US-based clients. Delivered 15+ projects across e-commerce, marketing, and internal tooling using React and Next.js.',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Shopify'],
    },
    {
      role: 'Junior Developer',
      company: 'NexaTech',
      period: 'Jun 2019 – Jan 2020',
      type: 'FULL-TIME',
      desc: 'First professional role — built and maintained internal web tools, wrote REST API integrations, and gained hands-on experience with agile development practices.',
      tech: ['JavaScript', 'React', 'Node.js', 'MySQL'],
    },
  ],

  process: [
    {
      step: '01',
      title: 'Understand',
      text: 'Map out business goals, user needs, and technical constraints before writing a single line of code.',
    },
    {
      step: '02',
      title: 'Design',
      text: 'Plan the architecture, data models, API contracts, and component structure. Decisions on paper save days of rework.',
    },
    {
      step: '03',
      title: 'Build',
      text: 'Ship incrementally with tests, code reviews, and clear git history — readable code is part of the product.',
    },
    {
      step: '04',
      title: 'Ship & Monitor',
      text: 'Deploy with CI/CD, instrument with observability, and iterate based on real usage data — not assumptions.',
    },
  ],

  testimonials: [
    {
      quote:
        'Ryan rebuilt our entire frontend in 6 weeks without a single production incident. The new architecture is clean, fast, and our team loves working in it.',
      author: 'Alex Torres',
      role: 'CTO, Loopline Inc.',
      stars: 5,
    },
    {
      quote:
        'One of the sharpest engineers I\'ve worked with. He ships fast without cutting corners — and always thinks about the next engineer who\'ll maintain the code.',
      author: 'Jordan Lee',
      role: 'Engineering Manager, Horizon Cloud',
      stars: 5,
    },
    {
      quote:
        'Brought our MVP from idea to production in 3 months, on budget. Exactly the kind of full-stack generalist an early-stage startup needs.',
      author: 'Mila Park',
      role: 'Co-founder, Craftboard',
      stars: 5,
    },
  ],

  contact: {
    email: 'ryan@ryanbuilds.dev',
    location: 'Austin, TX · Remote-first',
    availability: 'Open to senior roles and consulting',
  },
};

const EMPTY_FORM = { name: '', email: '', message: '' };

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ─── Per-capability color + skill level metadata ────────────────────────────
const CAP_META = [
  { color: '#6366f1', level: 'Expert' },
  { color: '#f59e0b', level: 'Expert' },
  { color: '#10b981', level: 'Advanced' },
  { color: '#06b6d4', level: 'Advanced' },
  { color: '#ec4899', level: 'Advanced' },
  { color: '#f97316', level: 'Proficient' },
];

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP = {
  palette: Palette,
  code: Code2,
  zap: Zap,
  globe: Globe,
  layers: Layers,
  server: Server,
  cloud: Cloud,
  git: GitBranch,
  terminal: Terminal,
};

// ─── Animated stat counter ───────────────────────────────────────────────────
function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const steps = 45;
    const increment = value / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setDisplay(Math.round(current));
      if (Math.round(current) >= value) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="bg-slate-900/60 p-5 text-center">
      <p className="font-display text-3xl font-bold text-amber-400 tabular-nums">
        {display}{suffix}
      </p>
      <p className="mt-1 font-body text-[11px] text-slate-400">{label}</p>
    </div>
  );
}

// ─── Tech marquee ─────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Go',
  'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GraphQL',
  'Prisma', 'Terraform', 'WebSockets', 'GitHub Actions', 'Stripe',
];

function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] py-3">
      <div className="flex w-max animate-marquee gap-2.5">
        {items.map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/[0.09] bg-slate-900 px-3.5 py-1.5 font-body text-xs text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Scroll progress bar ─────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Work', 'Experience', 'About', 'Process', 'Contact'];

function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-3 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'border border-white/[0.09] bg-slate-950/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="#" className="font-body text-sm font-semibold tracking-tight text-white">
            {name || 'Ryan Carter'}
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-body text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-amber-400 px-4 py-1.5 font-body text-xs font-semibold text-slate-950 transition hover:bg-amber-300 md:block"
          >
            Hire me
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-slate-950/97 p-6 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-semibold text-white">
                {name || 'Ryan Carter'}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl text-white transition hover:text-amber-400"
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-body text-sm font-semibold text-slate-950"
              >
                Hire me <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ profile, socials }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-slate-950 px-6 pb-20 pt-32 lg:px-10"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/[0.06] blur-[130px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          {/* Left */}
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/8 px-4 py-1.5 font-body text-xs font-medium text-amber-400 ring-1 ring-amber-400/10">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                {profile.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.5rem]"
            >
              {profile.headline}
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-xl font-body text-lg leading-8 text-slate-400">
              {profile.summary}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-body text-sm font-semibold text-slate-950 transition-all hover:bg-amber-300 hover:gap-3"
              >
                Hire me
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                View my work
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {[
                { Icon: ExternalLink, href: socials.github, label: 'GitHub' },
                { Icon: Link, href: socials.linkedin, label: 'LinkedIn' },
                { Icon: AtSign, href: socials.email, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-white/25 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
              <span className="ml-1 font-body text-xs text-slate-500">&middot; Available for work</span>
            </motion.div>
          </div>

          {/* Right – stats card */}
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-transparent to-indigo-500/20 blur-sm" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-slate-900/80 p-7 backdrop-blur-xl">
              {/* Animated stat counters */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.06]">
                {profile.stats.map((stat) => (
                  <StatCounter
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ))}
              </div>

              {/* Status pills */}
              <div className="mt-5 space-y-3">
                {[
                  { Icon: Code2, bg: 'bg-amber-400/15 text-amber-400', title: 'Full Stack Engineer', sub: 'React · Next.js · TypeScript · Go' },
                  { Icon: Cloud, bg: 'bg-indigo-400/15 text-indigo-400', title: 'Cloud & DevOps', sub: 'AWS · Docker · Terraform · CI/CD' },
                  { Icon: Zap, bg: 'bg-emerald-400/15 text-emerald-400', title: 'Open to Opportunities', sub: 'Remote-first · Austin, TX' },
                ].map(({ Icon, bg, title, sub }) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${bg}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white">{title}</p>
                      <p className="font-body text-xs text-slate-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* "Currently building" indicator */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4">
                <div className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <p className="font-body text-xs text-emerald-300">
                  Currently building <span className="font-semibold">Nexus v2</span> — multi-workspace support &amp; mobile app
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16 hidden items-center gap-2.5 font-body text-xs text-slate-500 md:flex"
        >
          <div className="flex h-6 w-3.5 items-start justify-center rounded-full border border-white/15 p-0.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-amber-400"
            />
          </div>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const FILTERS = ['All', 'SaaS', 'E-Commerce', 'Tool', 'App'];

function Projects({ projects }) {
  const [active, setActive] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <section id="work" ref={ref} className="bg-slate-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
                Selected work
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
                Projects
              </h2>
            </div>
            <div className="flex flex-wrap gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`rounded-lg px-3.5 py-1.5 font-body text-xs font-medium transition-all ${
                    active === f ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group/card relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.16] hover:bg-slate-900/90 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                >
                  {/* Browser-frame thumbnail */}
                  <div
                    className="group/thumb relative block h-48 w-full shrink-0 overflow-hidden cursor-pointer"
                    style={{ background: `${project.gradient}, #080f1c` }}
                  >
                    {/* Dot grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px]" />

                    {/* Ghost initial */}
                    <div
                      className="pointer-events-none absolute -bottom-3 -right-4 select-none font-display text-[110px] font-bold leading-none opacity-[0.07]"
                      style={{ color: project.accent }}
                    >
                      {project.title[0]}
                    </div>

                    {/* Browser chrome */}
                    <div className="absolute inset-x-5 top-5 overflow-hidden rounded-xl border border-white/[0.13] bg-slate-950/75 shadow-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-black/20 px-3 py-2">
                        <div className="h-2 w-2 rounded-full bg-red-400/70" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                        <div className="h-2 w-2 rounded-full bg-green-400/70" />
                        <div className="ml-2 flex h-4 flex-1 items-center overflow-hidden rounded bg-white/[0.08] px-2">
                          <span className="truncate font-body text-[8px] text-white/30">
                            {project.title.toLowerCase().replace(/\s+/g, '')}.app
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ background: project.accent + '60' }} />
                          <div className="h-2 w-28 rounded-sm bg-white/[0.13]" />
                        </div>
                        <div className="h-2 w-2/3 rounded-sm bg-white/[0.08]" />
                        <div className="mt-2.5 flex gap-1.5">
                          <div className="h-5 w-12 rounded-md" style={{ background: project.accent + '40' }} />
                          <div className="h-5 w-10 rounded-md bg-white/[0.07]" />
                        </div>
                      </div>
                    </div>

                    {/* Year pill */}
                    <span className="absolute bottom-3 left-4 z-10 rounded-full border border-white/[0.12] bg-black/50 px-2.5 py-1 font-body text-[10px] font-medium text-white/80 backdrop-blur-sm">
                      {project.year}
                    </span>

                    {/* Tag pill */}
                    <span
                      className="absolute bottom-3 right-4 z-10 rounded-full border px-2.5 py-1 font-body text-[10px] font-semibold backdrop-blur-sm"
                      style={{ borderColor: project.accent + '40', color: project.accent, background: project.accent + '15' }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: project.accent }}>
                          {project.category}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl text-white">{project.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-0.5 font-body text-[11px] text-slate-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 font-body text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 font-body text-[11px] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-1 font-body text-xs font-medium text-slate-500 transition-colors group-hover/card:text-amber-400">
                      View case study
                      <ArrowUpRight size={13} className="transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover/card:w-full"
                    style={{ background: project.accent }}
                  />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ experience }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} className="border-t border-white/[0.06] bg-[#060d1a] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">Background</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">Work Experience</h2>
          </motion.div>

          <div className="relative mt-12">
            <div className="absolute left-[1.1rem] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-amber-400/40 via-amber-400/10 to-transparent sm:block" />

            <div className="space-y-4">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative grid gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all hover:border-amber-400/20 hover:bg-white/[0.05] sm:grid-cols-[auto_1fr_auto] sm:items-start"
                >
                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400 sm:flex">
                    <Briefcase size={15} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-body text-sm font-semibold text-white">{job.role}</h3>
                      <span className={`rounded-full px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider ${
                        job.type === 'FULL-TIME' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                      }`}>
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-0.5 font-body text-sm font-medium text-amber-400">{job.company}</p>
                    <p className="mt-3 font-body text-sm leading-6 text-slate-400">{job.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 font-body text-[11px] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body text-xs text-slate-500 sm:shrink-0 sm:text-right">{job.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Capabilities ─────────────────────────────────────────────────────────────
function Capabilities({ capabilities }) {
  // Generate stable random activity grid (not on every render)
  const activityData = useMemo(
    () => Array.from({ length: 91 }, () => Math.random()),
    [],
  );

  return (
    <section id="about" className="border-t border-white/[0.06] bg-slate-950 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Capabilities
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            What I bring to every project.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start"
          >
            <div className="space-y-4">
              <p className="max-w-2xl font-body text-base leading-7 text-slate-400">
                Six years of building production systems — across early-stage startups,
                growing SaaS companies, and distributed engineering teams. I care about
                clean code, fast software, and the people who maintain it.
              </p>

              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <div className="flex items-center gap-4 p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-400/20 to-indigo-500/20 font-display text-xl font-bold text-amber-400">
                      RC
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-white">Ryan Carter</p>
                      <p className="font-body text-xs text-slate-400">Senior Full Stack Engineer</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="font-body text-[10px] font-medium text-emerald-400">
                          Open to work
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
                    {[
                      { v: '6+', l: 'Years' },
                      { v: '40+', l: 'Projects' },
                      { v: '15', l: 'Clients' },
                    ].map((s) => (
                      <div key={s.l} className="py-3 text-center">
                        <p className="font-display text-lg font-bold text-amber-400">{s.v}</p>
                        <p className="font-body text-[10px] text-slate-500">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Education
                  </p>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                      <Terminal size={15} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white">
                        B.S. Computer Science
                      </p>
                      <p className="font-body text-[11px] text-slate-400">
                        University of Texas at Austin &middot; 2019
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <TechMarquee />

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: 'Core Stack',
                    text: 'React, Next.js, TypeScript, Node.js',
                    color: '#6366f1',
                  },
                  {
                    title: 'Cloud & Scale',
                    text: 'AWS, Docker, Terraform, CI/CD',
                    color: '#10b981',
                  },
                  {
                    title: 'Data Layer',
                    text: 'PostgreSQL, Redis, MongoDB',
                    color: '#f59e0b',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
                  >
                    <p
                      className="font-body text-[10px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </p>
                    <p className="mt-2 font-body text-xs leading-5 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-body text-[11px] text-slate-500">
                  GitHub contribution activity
                </p>
                <p className="font-body text-[10px] text-slate-600">
                  Last 13 weeks
                </p>
              </div>

              <div className="mt-4 overflow-x-auto">
                <div className="inline-grid min-w-[17.5rem] grid-cols-[auto_repeat(13,minmax(0,1fr))] gap-x-[3px] gap-y-[3px]">
                  <div />
                  {['Jan', '', '', 'Feb', '', '', 'Mar', '', '', 'Apr', '', '', 'May'].map((label, index) => (
                    <div
                      key={`month-${index}`}
                      className="pb-1 text-center font-body text-[9px] uppercase tracking-[0.18em] text-slate-600"
                    >
                      {label}
                    </div>
                  ))}

                  {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((dayLabel, rowIndex) => (
                    <>
                      <div
                        key={`day-${rowIndex}`}
                        className="pr-2 text-right font-body text-[9px] uppercase tracking-[0.18em] text-slate-600"
                      >
                        {dayLabel}
                      </div>
                      {activityData.slice(rowIndex * 13, rowIndex * 13 + 13).map((v, cellIndex) => {
                        const alpha =
                          v > 0.82 ? 1
                          : v > 0.62 ? 0.55
                          : v > 0.42 ? 0.28
                          : v > 0.22 ? 0.12
                          : 0.05;
                        return (
                          <div
                            key={`cell-${rowIndex}-${cellIndex}`}
                            className="h-3.5 w-3.5 rounded-[3px] border border-white/[0.03]"
                            style={{ backgroundColor: `rgba(251,191,36,${alpha})` }}
                          />
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 font-body text-[10px] text-slate-500">
                <span>Less</span>
                <div className="flex items-center gap-[3px]">
                  {[0.05, 0.12, 0.28, 0.55, 1].map((alpha) => (
                    <div
                      key={alpha}
                      className="h-2.5 w-2.5 rounded-[2px] border border-white/[0.03]"
                      style={{ backgroundColor: `rgba(251,191,36,${alpha})` }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = ICON_MAP[cap.icon] || Code2;
              const meta = CAP_META[i] ?? { color: '#f59e0b', level: 'Proficient' };
              return (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
                >
                  <div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: meta.color + '30' }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: meta.color + '18', color: meta.color }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className="rounded-full border px-2.5 py-0.5 font-body text-[10px] font-semibold"
                        style={{
                          borderColor: meta.color + '35',
                          color: meta.color,
                          background: meta.color + '12',
                        }}
                      >
                        {meta.level}
                      </span>
                    </div>

                    <p className="mt-4 font-body text-sm font-semibold text-white">
                      {cap.label}
                    </p>
                    <p className="mt-1.5 font-body text-xs leading-5 text-slate-400">
                      {cap.desc}
                    </p>

                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width:
                            meta.level === 'Expert'
                              ? '92%'
                              : meta.level === 'Advanced'
                                ? '80%'
                                : '68%',
                          background: meta.color,
                        }}
                      />
                    </div>

                    <div
                      className="mt-4 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: meta.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process({ steps }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="process" ref={ref} className="border-t border-white/[0.06] bg-[#060d1a] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">How I work</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">Process</h2>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all hover:border-amber-400/20 hover:bg-white/[0.05]"
              >
                <p className="font-display text-4xl font-bold text-amber-400/20">{item.step}</p>
                <h3 className="mt-3 font-display text-xl text-white">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-slate-400">{item.text}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials({ testimonials }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section ref={ref} className="border-t border-white/[0.06] bg-slate-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <motion.p variants={fadeUp} className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl tracking-tight text-white">
            What colleagues say
          </motion.h2>

          <motion.div variants={fadeUp} className="relative mt-10 min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm"
              >
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: testimonials[active].stars }).map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-5 font-display text-lg italic leading-8 text-white">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-body text-sm font-semibold text-white">{testimonials[active].author}</p>
                  <p className="font-body text-xs text-slate-400">{testimonials[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ contact, socials, form, setForm, handleSubmit, status, note }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="contact" ref={ref} className="border-t border-white/[0.06] bg-[#060d1a] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <div className="grid gap-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-slate-900/50 p-8 backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
            <motion.div variants={fadeUp} className="space-y-8">
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-amber-400">Get in touch</p>
                <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
                  Let&rsquo;s build something great.
                </h2>
                <p className="mt-4 font-body text-sm leading-6 text-slate-400">
                  Open to senior engineering roles, consulting engagements, and interesting side projects. Got something worth building? Let&rsquo;s talk.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { Icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
                  { Icon: MapPin, label: contact.location, href: null },
                  { Icon: Calendar, label: contact.availability, href: null },
                ].map(({ Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-3 font-body text-sm text-slate-300">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                      <Icon size={14} />
                    </div>
                    {href ? <a href={href} className="transition hover:text-amber-400">{label}</a> : label}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { Icon: ExternalLink, href: socials.github, label: 'GitHub' },
                  { Icon: Link, href: socials.linkedin, label: 'LinkedIn' },
                  { Icon: AtSign, href: socials.email, label: 'Email' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] text-slate-400 transition hover:border-white/25 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-body text-xs font-medium text-slate-400">Name</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-3 font-body text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-body text-xs font-medium text-slate-400">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-3 font-body text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-xs font-medium text-slate-400">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or role..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-3 font-body text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-body text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending&hellip;</>
                  ) : status === 'sent' ? (
                    <><CheckCircle2 size={15} /> Sent!</>
                  ) : (
                    <><Send size={15} /> Send message</>
                  )}
                </button>
                {note && (
                  <p className={`font-body text-xs ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {note}
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ name }) {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950 px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-body text-sm font-semibold text-white">{name || 'Ryan Carter'}</p>
        <p className="font-body text-xs text-slate-500">
          &copy; {new Date().getFullYear()} &middot; Built with React, Tailwind &amp; Python
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/5 px-4 py-2 font-body text-xs text-slate-300 transition hover:text-white"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [content, setContent] = useState(PORTFOLIO);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [note, setNote] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setContent(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');
    setNote('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || 'Unable to send message.');
      setStatus('sent');
      setForm(EMPTY_FORM);
      setNote(result.message);
    } catch (err) {
      setStatus('error');
      setNote(err.message);
    }
  }, [form]);

  const profile   = content.profile   || PORTFOLIO.profile;
  const projects  = content.projects  || PORTFOLIO.projects;
  const experience = content.experience || PORTFOLIO.experience;
  const capabilities = content.capabilities || PORTFOLIO.capabilities;
  const process   = content.process   || PORTFOLIO.process;
  const testimonials = content.testimonials || PORTFOLIO.testimonials;
  const contact   = content.contact   || PORTFOLIO.contact;
  const socials   = content.socials   || PORTFOLIO.socials;

  return (
    <div className="bg-slate-950 font-body text-white antialiased">
      <ScrollProgress />
      <Navbar name={profile.name} />
      <Hero profile={profile} socials={socials} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Capabilities capabilities={capabilities} />
      <Process steps={process} />
      <Testimonials testimonials={testimonials} />
      <Contact
        contact={contact}
        socials={socials}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        status={status}
        note={note}
      />
      <Footer name={profile.name} />
    </div>
  );
}
