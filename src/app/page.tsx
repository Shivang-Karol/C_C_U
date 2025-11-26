'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';

const heroStats = [
  {
    label: 'Convoy Conflicts Avoided',
    value: '72%',
    detail: 'Choke-point deconfliction through live route timing & saturation forecasting.',
  },
  {
    label: 'Operational Time Saved',
    value: '3.4h',
    detail: 'Per long-haul supply push on high-risk corridors across J&K and Arunachal.',
  },
  {
    label: 'Active Corridors',
    value: '58',
    detail: 'Simultaneous road segments monitored with terrain, weather & BRO advisories.',
  },
];

const problemStatements = [
  {
    title: 'Uncoordinated Corridor Usage',
    detail:
      'Independent planning by units causes two or more convoys to hit the same tunnel section or bridge within minutes, creating hours of immobilization.',
  },
  {
    title: 'Terrain & Weather Volatility',
    detail:
      'Landslides, avalanches, fog, and washouts overturn static plans instantly, without live feeds reaching upstream formations.',
  },
  {
    title: 'Slow Checkpoint Visibility',
    detail:
      'Paper-based checkpoint updates take hours to propagate, causing stale situational awareness for commanders and logistics staff.',
  },
  {
    title: 'Fragmented Information Systems',
    detail:
      'Army, BRO, CAPF, and civil authorities operate disjointed systems, preventing a unified operational picture or synchronized movement control.',
  },
];

const techStack = [
  {
    label: 'Terrain Intelligence Engine',
    abbr: 'TI',
    description: 'Combines elevation, slope, weather cells, and civilian flow to assign suitability scores to each road segment in real time.',
  },
  {
    label: 'Telemetry & Checkpoint Mesh',
    abbr: 'TM',
    description: 'Processes convoy GPS, checkpoint logs, and event triggers through FastAPI + SSE for low-bandwidth, high-reliability operations.',
  },
  {
    label: 'Optimization Kernel',
    abbr: 'OK',
    description: 'OR-Tools powered scoring engine that generates route options, deconflicts timings, and proposes merges or staggered movement windows.',
  },
];

const keyCapabilities = [
  'Predictive choke-point deconfliction across Zoji La, Sela, Sevoke and other critical passes.',
  'Scenario lab for simulating obstruction events, weather shifts, and convoy merging logic.',
  'Offline-capable checkpoint and incident logging synced automatically on connectivity return.',
  'Unified tri-service and inter-agency view for BRO, Army, CAPF with audit-ready timelines.',
];

const featureCards = [
  {
    title: 'Operational Picture',
    copy: 'Map-based command panel integrating convoys, road conditions, chokepoints, advisories, and real-time alerts into one unified view.',
    demo: '/dashboard',
    docs: '#picture',
    detail: 'Gives headquarters a synchronized picture of every convoy, enabling faster coordination with BRO and CAPF desk officers.',
  },
  {
    title: 'Simulation & Events',
    copy: 'Test reroute logic, landslides, blockages, civilian surges, and weather overlays before applying decisions to live movements.',
    demo: '/events',
    docs: '#events',
    detail: 'Let operations cells rehearse contingencies and share approvals without affecting the live mission timeline.',
  },
  {
    title: 'Fleet Analytics',
    copy: 'Analyze historical delays, idle time, missed windows, fuel inefficiencies, and identify repeat bottlenecks.',
    demo: '/analytics',
    docs: '#analytics',
    detail: 'Surfaces chronic choke points and readiness gaps so commanders can reprioritize engineer support or revise SOPs.',
  },
  {
    title: 'Mobile Checkpoints',
    copy: 'Convoy leaders log departures, arrivals, and incidents with offline-first sync to HQ feeds and instant publishing upstream.',
    demo: '/mobile',
    docs: '#mobile',
    detail: 'Gives every checkpoint a lightweight logger that syncs to HQ even after degraded comms, keeping allocations fresh.',
  },
  {
    title: 'Risk Desk',
    copy: 'Automated detection of route conflicts, saturation alerts, risk scoring, and recommended holds or merge windows.',
    demo: '/conflicts',
    docs: '#conflicts',
    detail: 'Prioritizes interventions for commanders by scoring threats and providing suggested holds or merges.',
  },
  {
    title: 'Optimization Mesh',
    copy: 'AI-assisted rerouting engine offering alternate corridors, ETAs, and convoy merges with commander approval workflow.',
    demo: '#optimizer',
    docs: '#optimizer-docs',
    detail: 'Generated routes are explainable, auditable, and respect the commander-on-loop workflow for approvals.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Sense',
    copy: 'Ingest telemetry, checkpoints, BRO advisories, weather layers, and terrain difficulty for a continuously updated operational picture.',
  },
  {
    step: '02',
    title: 'Decide',
    copy: 'Optimization Kernel evaluates corridors using terrain scores, saturation limits, unit priority, and time windows.',
  },
  {
    step: '03',
    title: 'Act',
    copy: 'Commanders approve reroutes, merges, staggered timings, or holds, and updates propagate instantly across formations.',
  },
  {
    step: '04',
    title: 'Learn',
    copy: 'Analytics identifies recurring delays, inefficiencies, and corridor stress, improving future mobility cycles.',
  },
];

type FeatureCard = (typeof featureCards)[number];

const SECTION_TRANSITION = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };
const SECTION_VIEWPORT = { once: true, amount: 0.3 };

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  }),
};

const LIST_ITEM_VARIANTS = {
  hidden: { opacity: 0, x: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.55, ease: [0.33, 1, 0.68, 1] as const },
  }),
};

const useSectionParallax = (
  ref: RefObject<HTMLElement | null>,
  backgroundRange = 60,
  foregroundRange = 20,
) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-backgroundRange, backgroundRange]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [foregroundRange, -foregroundRange]);

  return { backgroundY, foregroundY };
};

export default function Home() {
  const [problemHover, setProblemHover] = useState<string | null>(null);
  const [techHover, setTechHover] = useState<string | null>(null);
  const [featureHover, setFeatureHover] = useState<string | null>(null);
  const [workflowHover, setWorkflowHover] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<FeatureCard | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const problemRef = useRef<HTMLElement | null>(null);
  const solutionRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLElement | null>(null);
  const workflowRef = useRef<HTMLElement | null>(null);

  const { backgroundY: heroBackgroundY, foregroundY: heroForegroundY } = useSectionParallax(heroRef, 80, 28);
  const heroGlowY = useTransform(heroBackgroundY, (value) => value * 0.6);
  const { backgroundY: problemBackgroundY, foregroundY: problemForegroundY } = useSectionParallax(problemRef, 55, 18);
  const { backgroundY: solutionBackgroundY, foregroundY: solutionForegroundY } = useSectionParallax(solutionRef, 60, 20);
  const { backgroundY: featuresBackgroundY, foregroundY: featuresForegroundY } = useSectionParallax(featuresRef, 50, 18);
  const { backgroundY: workflowBackgroundY, foregroundY: workflowForegroundY } = useSectionParallax(workflowRef, 45, 18);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!activeFeature) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveFeature(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeFeature]);

  return (
    <div className="bg-slateDepth text-textNeutral min-h-screen">
      <main className="relative overflow-hidden">
        <motion.section 
          ref={heroRef}
          className="relative flex min-h-screen flex-col justify-center overflow-hidden px-3 py-20"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={SECTION_TRANSITION}
          viewport={SECTION_VIEWPORT}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-panelNight/40 via-panelNight/20 to-slateDepth"
            style={{ y: heroBackgroundY }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_60%)]"
            style={{ y: heroGlowY }}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-2 lg:items-center"
            style={{ y: heroForegroundY }}
          >
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amberCommand/30 bg-amberCommand/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amberCommand">
                AI-Driven · Convoy Orchestration · Mobility Command System
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-textNeutral lg:text-6xl">
                HawkRoute — Adaptive Convoy Intelligence
              </h1>
              <p className="text-base text-textNeutral/80">
                HawkRoute is an AI-assisted mobility layer that enhances how formations plan, monitor, and adapt convoy movement across complex and high-risk terrain. 
                It blends terrain intelligence, weather volatility, real-time telemetry, and corridor conditions to support safer, faster, and more synchronized operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-amberCommand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-command transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amberCommand/50 active:scale-95"
                >
       Enter Dashboard
                </Link>
                <a
                  href="#solution"
                  onClick={(e) => { e.preventDefault(); scrollToSection('solution'); }}
                  className="rounded-full border border-textNeutral/30 px-6 py-3 text-sm font-semibold text-textNeutral transition-all duration-200 hover:border-amberCommand/40 hover:scale-105"
                >
                  View Solution Stack
                </a>
              </div>
              <div className="grid gap-6 border-t border-panelNight/40 pt-8 sm:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="transition-all duration-500 ease-out hover:scale-105"
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.35 + index * 0.08}
                  >
                    <p className="text-3xl font-semibold text-amberCommand transition-colors duration-200">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-textNeutral/60">{stat.label}</p>
                    <p className="text-sm text-textNeutral/70">{stat.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative hidden space-y-6 lg:block"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <div className="relative rounded-3xl border border-panelNight/50 bg-panelNight/60 p-2 shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-amberCommand/10 blur-3xl" aria-hidden="true" />
                <Image
                  src="/opticonvoy.jpg"
                  alt="OptiConvoy operational visualization"
                  width={960}
                  height={720}
                  priority
                  className="relative rounded-[22px] border border-panelNight/60 object-cover"
                />
              </div>
              <div className="relative rounded-3xl border border-panelNight/50 bg-panelNight/60 p-8 transition-all duration-300 hover:scale-105">
                <div className="space-y-4 text-sm">
                  <p className="text-xs uppercase text-textNeutral/50">Live inject feed</p>
                  <div className="space-y-3">
                    {[ 'Landslide advisory issued for Zoji La', 'Convoy BRAVO-21 cleared Merge Window 4', 'Optimizer suggestion: hold CAPF North until BRO clears debris' ].map((item, index) => (
                      <div 
                        key={item} 
                        className="rounded-2xl border border-panelNight/40 bg-slateDepth/70 p-4 transition-all duration-300 hover:border-oliveAux/40 hover:bg-slateDepth"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-textNeutral/50">Mirrors the Event Lab layout without exposing live ops.</p>
                </div>
                <div className="mt-6">
                  <div className="w-full rounded-2xl border border-oliveAux/40 bg-oliveAux/10 p-4 text-xs text-oliveAux/80 transition-all duration-300 hover:border-oliveAux/60 hover:bg-oliveAux/15">
                    <p className="text-[10px] uppercase">Road-space quota</p>
                    <p className="text-lg font-semibold text-oliveAux">82% scheduled</p>
                    <p>Remaining: 5 columns</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={problemRef}
          id="problem"
          data-animate="problem"
          className="relative overflow-hidden px-3 py-24"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={SECTION_TRANSITION}
          viewport={SECTION_VIEWPORT}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-panelNight/30 to-slateDepth"
            style={{ y: problemBackgroundY }}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 mx-auto max-w-[90rem]"
            style={{ y: problemForegroundY }}
          >
            <motion.div
              className="mx-auto mb-16 max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-rose-200">
                The Problem
              </div>
              <h2 className="mt-6 text-4xl font-semibold">Mobility planning struggles in fast-changing, high-risk corridors</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                Terrain, weather, and traffic conditions shift faster than legacy movement tools can respond, leading to uncertainty during critical movement windows.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {problemStatements.map((problem, index) => {
                const isActive = problemHover === problem.title;
                const isDimmed = !!problemHover && !isActive;
                return (
                  <motion.div
                    key={problem.title}
                    tabIndex={0}
                    onMouseEnter={() => setProblemHover(problem.title)}
                    onMouseLeave={() => setProblemHover(null)}
                    onFocus={() => setProblemHover(problem.title)}
                    onBlur={() => setProblemHover(null)}
                    className={clsx(
                      'rounded-3xl border border-panelNight/40 bg-panelNight/60 p-6 text-sm text-textNeutral/80 transition-all duration-300',
                      'hover:border-oliveAux/40 hover:bg-panelNight hover:scale-105 hover:shadow-2xl hover:shadow-amberCommand/20 hover:-translate-y-1',
                      'focus-visible:ring-2 focus-visible:ring-amberCommand/70 focus-visible:scale-105',
                      'active:scale-95 active:transition-transform active:duration-75',
                      isActive && 'scale-105 shadow-command ring-1 ring-amberCommand/40',
                      isDimmed && 'opacity-50'
                    )}
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.25 + index * 0.1}
                  >
                    <p className="text-lg font-semibold text-textNeutral transition-colors duration-200">{problem.title}</p>
                    <p className="mt-3 text-textNeutral/70 transition-colors duration-200">{problem.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={solutionRef}
          id="solution"
          data-animate="solution"
          className="relative overflow-hidden px-3 py-24"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={SECTION_TRANSITION}
          viewport={SECTION_VIEWPORT}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.18),_transparent_70%)]"
            style={{ y: solutionBackgroundY }}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 mx-auto max-w-[90rem]"
            style={{ y: solutionForegroundY }}
          >
            <motion.div
              className="mx-auto mb-16 max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amberCommand/40 bg-amberCommand/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-amberCommand">
                Our Response
              </div>
              <h2 className="mt-6 text-4xl font-semibold">A unified mobility intelligence layer for coordinated convoy operations</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                HawkRoute integrates planning, telemetry, terrain scoring, and real-time risk evaluation into a lightweight architecture designed for both field units and command centers.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {techStack.map((tech, index) => {
                const isActive = techHover === tech.abbr;
                const isDimmed = !!techHover && !isActive;
                return (
                  <motion.div
                    key={tech.abbr}
                    tabIndex={0}
                    onMouseEnter={() => setTechHover(tech.abbr)}
                    onMouseLeave={() => setTechHover(null)}
                    onFocus={() => setTechHover(tech.abbr)}
                    onBlur={() => setTechHover(null)}
                    className={clsx(
                      'rounded-3xl border border-panelNight/50 bg-slateDepth/70 p-6 transition-all duration-300',
                      'hover:border-oliveAux/40 hover:bg-panelNight hover:scale-105 hover:shadow-2xl hover:shadow-amberCommand/20 hover:-translate-y-1',
                      'focus-visible:ring-2 focus-visible:ring-amberCommand/70 focus-visible:scale-105',
                      'active:scale-95 active:transition-transform active:duration-75',
                      isActive && 'scale-105 shadow-command ring-1 ring-oliveAux/40',
                      isDimmed && 'opacity-50'
                    )}
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.2 + index * 0.1}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-semibold text-amberCommand transition-colors duration-200">{tech.abbr}</p>
                      <p className="text-sm text-textNeutral/60 transition-colors duration-200">{tech.label}</p>
                    </div>
                    <p className="mt-4 text-sm text-textNeutral/70 transition-colors duration-200">{tech.description}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              className="mt-10 rounded-3xl border border-panelNight/40 bg-panelNight/60 p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <h3 className="text-2xl font-semibold text-textNeutral">Key capabilities</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {keyCapabilities.map((capability, index) => (
                  <motion.div 
                    key={capability}
                    className="flex items-start gap-3 text-sm text-textNeutral/80"
                    variants={LIST_ITEM_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.35 + index * 0.08}
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-amberCommand" />
                    <p>{capability}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={featuresRef}
          id="features"
          data-animate="features"
          className="relative overflow-hidden px-3 py-24"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={SECTION_TRANSITION}
          viewport={SECTION_VIEWPORT}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-panelNight/20 to-panelNight/50"
            style={{ y: featuresBackgroundY }}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 mx-auto max-w-[90rem]"
            style={{ y: featuresForegroundY }}
          >
            <motion.div
              className="mx-auto mb-16 max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <h2 className="text-4xl font-semibold">Feature Playbook</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                Same layout as the reference page, updated for convoy orchestration. Click through to each dedicated route.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature, index) => {
                const isActive = featureHover === feature.title;
                const isDimmed = !!featureHover && !isActive;
                return (
                  <motion.div
                    key={feature.title}
                    tabIndex={0}
                    onMouseEnter={() => setFeatureHover(feature.title)}
                    onMouseLeave={() => setFeatureHover(null)}
                    onFocus={() => setFeatureHover(feature.title)}
                    onBlur={() => setFeatureHover(null)}
                    className={clsx(
                      'flex flex-col rounded-3xl border border-panelNight/40 bg-panelNight/70 p-6 text-sm text-textNeutral/80 transition-all duration-300',
                      'hover:border-oliveAux/40 hover:bg-panelNight hover:scale-105 hover:shadow-2xl hover:shadow-amberCommand/20 hover:-translate-y-1',
                      'focus-visible:ring-2 focus-visible:ring-amberCommand/70 focus-visible:scale-105',
                      'active:scale-95 active:transition-transform active:duration-75',
                      isActive && 'scale-105 shadow-command ring-1 ring-amberCommand/40',
                      isDimmed && 'opacity-50'
                    )}
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.2 + index * 0.08}
                  >
                    <p className="text-xl font-semibold text-textNeutral transition-colors duration-200">{feature.title}</p>
                    <p className="mt-3 flex-1 transition-colors duration-200">{feature.copy}</p>
                    <div className="mt-4 flex gap-2">
                      <Link
                        href={feature.demo}
                        className="flex-1 rounded-full bg-amberCommand px-3 py-2 text-center text-xs font-semibold text-black transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amberCommand/50 active:scale-95"
                      >
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => setActiveFeature(feature)}
                        className="flex-1 rounded-full border border-panelNight/40 px-3 py-2 text-center text-xs font-semibold text-textNeutral transition-all duration-200 hover:border-amberCommand/40 hover:scale-105"
                      >
                        Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={workflowRef}
          id="workflow"
          data-animate="workflow"
          className="relative overflow-hidden px-3 py-24"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={SECTION_TRANSITION}
          viewport={SECTION_VIEWPORT}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_65%)]"
            style={{ y: workflowBackgroundY }}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 mx-auto max-w-[90rem]"
            style={{ y: workflowForegroundY }}
          >
            <motion.div
              className="mx-auto mb-16 max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={SECTION_VIEWPORT}
            >
              <h2 className="text-4xl font-semibold">How it works</h2>
              <p className="mt-4 text-base text-textNeutral/80">A four-step loop keeping homepage layout independent from the dashboard.</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2">
              {workflowSteps.map((step, index) => {
                const isActive = workflowHover === step.step;
                const isDimmed = !!workflowHover && !isActive;
                return (
                  <motion.div
                    key={step.step}
                    tabIndex={0}
                    onMouseEnter={() => setWorkflowHover(step.step)}
                    onMouseLeave={() => setWorkflowHover(null)}
                    onFocus={() => setWorkflowHover(step.step)}
                    onBlur={() => setWorkflowHover(null)}
                    className={clsx(
                      'relative rounded-3xl border border-panelNight/40 bg-panelNight/70 p-8 transition-all duration-300',
                      'hover:border-oliveAux/40 hover:bg-panelNight hover:scale-105 hover:shadow-2xl hover:shadow-amberCommand/20 hover:-translate-y-1',
                      'focus-visible:ring-2 focus-visible:ring-amberCommand/70 focus-visible:scale-105',
                      'active:scale-95 active:transition-transform active:duration-75',
                      isActive && 'scale-105 shadow-command ring-1 ring-amberCommand/30',
                      isDimmed && 'opacity-50'
                    )}
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={SECTION_VIEWPORT}
                    custom={0.25 + index * 0.12}
                  >
                    <p className="text-5xl font-semibold text-amberCommand/40 transition-colors duration-200">{step.step}</p>
                    <p className="mt-4 text-xl font-semibold text-textNeutral transition-colors duration-200">{step.title}</p>
                    <p className="mt-2 text-sm text-textNeutral/80 transition-colors duration-200">{step.copy}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        {activeFeature && (
          <div
            className={clsx(
              "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm transition-all duration-300 ease-out",
              activeFeature ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={() => setActiveFeature(null)}
          >
            <div
              className={clsx(
                "w-full max-w-md rounded-3xl border border-panelNight/40 bg-panelNight/80 p-6 text-sm text-textNeutral shadow-command transition-all duration-300 ease-out",
                activeFeature ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              )}
              onClick={(event: React.MouseEvent) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-textNeutral/50">Feature</p>
                  <h3 className="mt-1 text-2xl font-semibold text-textNeutral">{activeFeature.title}</h3>
                </div>
                <button
                  type="button"
                  aria-label="Close details"
                  className="rounded-full border border-panelNight/50 px-3 py-1 text-xs text-textNeutral/70 transition-all duration-200 hover:border-amberCommand/40 hover:scale-110 hover:rotate-90"
                  onClick={() => setActiveFeature(null)}
                >
                  ✕
                </button>
              </div>
              <p className="mt-4 text-textNeutral/80">{activeFeature.detail}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <Link
                  href={activeFeature.demo}
                  className="rounded-full bg-amberCommand px-4 py-2 font-semibold text-black transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amberCommand/50 active:scale-95"
                  onClick={() => setActiveFeature(null)}
                >
                  Open Demo
                </Link>
                <a
                  href={activeFeature.docs}
                  className="rounded-full border border-panelNight/40 px-4 py-2 font-semibold text-textNeutral transition-all duration-200 hover:border-amberCommand/40 hover:scale-105"
                  onClick={() => setActiveFeature(null)}
                >
                  Reference
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
