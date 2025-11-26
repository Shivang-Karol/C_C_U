import Image from 'next/image';
import Link from 'next/link';

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
  },
  {
    title: 'Simulation & Events',
    copy: 'Test reroute logic, landslides, blockages, civilian surges, and weather overlays before applying decisions to live movements.',
    demo: '/events',
    docs: '#events',
  },
  {
    title: 'Fleet Analytics',
    copy: 'Analyze historical delays, idle time, missed windows, fuel inefficiencies, and identify repeat bottlenecks.',
    demo: '/analytics',
    docs: '#analytics',
  },
  {
    title: 'Mobile Checkpoints',
    copy: 'Convoy leaders log departures, arrivals, and incidents with offline-first sync to HQ feeds and instant publishing upstream.',
    demo: '/mobile',
    docs: '#mobile',
  },
  {
    title: 'Risk Desk',
    copy: 'Automated detection of route conflicts, saturation alerts, risk scoring, and recommended holds or merge windows.',
    demo: '/conflicts',
    docs: '#conflicts',
  },
  {
    title: 'Optimization Mesh',
    copy: 'AI-assisted rerouting engine offering alternate corridors, ETAs, and convoy merges with commander approval workflow.',
    demo: '#optimizer',
    docs: '#optimizer-docs',
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

const footerLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'How it works' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Email', href: 'mailto:aicc@hq.example' },
];

export default function Home() {
  return (
    <div className="bg-slateDepth text-textNeutral">
      <main className="relative overflow-hidden">
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-panelNight/40 via-panelNight/20 to-slateDepth" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_60%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amberCommand/30 bg-amberCommand/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-amberCommand">
                AICC · Convoy Orchestration
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-textNeutral lg:text-6xl">
                OptiConvoy for Northern &amp; Eastern Commands
              </h1>
              <p className="text-base text-textNeutral/80">
                AICC replaces static convoy spreadsheets with an AI-driven command layer spanning planning, live telemetry, optimization, and
                after-action analytics so field formations never fight for the same road-space twice.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-amberCommand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-command"
                >
       Enter Dashboard
                </Link>
                <a
                  href="#solution"
                  className="rounded-full border border-textNeutral/30 px-6 py-3 text-sm font-semibold text-textNeutral hover:border-amberCommand/40"
                >
                  View Solution Stack
                </a>
              </div>
              <div className="grid gap-6 border-t border-panelNight/40 pt-8 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-semibold text-amberCommand">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-textNeutral/60">{stat.label}</p>
                    <p className="text-sm text-textNeutral/70">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden space-y-6 lg:block">
              <div className="relative rounded-3xl border border-panelNight/50 bg-panelNight/60 p-2 shadow-2xl">
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
              <div className="relative rounded-3xl border border-panelNight/50 bg-panelNight/60 p-8">
                <div className="space-y-4 text-sm">
                  <p className="text-xs uppercase text-textNeutral/50">Live inject feed</p>
                  <div className="space-y-3">
                    {[ 'Landslide advisory issued for Zoji La', 'Convoy BRAVO-21 cleared Merge Window 4', 'Optimizer suggestion: hold CAPF North until BRO clears debris' ].map((item) => (
                      <div key={item} className="rounded-2xl border border-panelNight/40 bg-slateDepth/70 p-4">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-textNeutral/50">Mirrors the Event Lab layout without exposing live ops.</p>
                </div>
                <div className="mt-6">
                  <div className="w-full rounded-2xl border border-oliveAux/40 bg-oliveAux/10 p-4 text-xs text-oliveAux/80">
                    <p className="text-[10px] uppercase">Road-space quota</p>
                    <p className="text-lg font-semibold text-oliveAux">82% scheduled</p>
                    <p>Remaining: 5 columns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="relative px-6 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-panelNight/30 to-slateDepth" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-rose-200">
                The Problem
              </div>
              <h2 className="mt-6 text-4xl font-semibold">Static planning collapses in contested terrain</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                Northern supply pushes demand real-time intelligence, but legacy processes deliver stale data and conflicting orders.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {problemStatements.map((problem) => (
                <div key={problem.title} className="rounded-3xl border border-panelNight/40 bg-panelNight/60 p-6 text-sm text-textNeutral/80">
                  <p className="text-lg font-semibold text-textNeutral">{problem.title}</p>
                  <p className="mt-3 text-textNeutral/70">{problem.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="solution" className="relative px-6 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.18),_transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amberCommand/40 bg-amberCommand/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-amberCommand">
                Our Response
              </div>
              <h2 className="mt-6 text-4xl font-semibold">AI control layer without merging into the ops UI</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                Modular stack mirrors the reference layout—Hero, Problem, Solution, Features, How it works, Footer—while preserving AICC styling.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {techStack.map((tech) => (
                <div key={tech.abbr} className="rounded-3xl border border-panelNight/50 bg-slateDepth/70 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-amberCommand">{tech.abbr}</p>
                    <p className="text-sm text-textNeutral/60">{tech.label}</p>
                  </div>
                  <p className="mt-4 text-sm text-textNeutral/70">{tech.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border border-panelNight/40 bg-panelNight/60 p-8">
              <h3 className="text-2xl font-semibold text-textNeutral">Key capabilities</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {keyCapabilities.map((capability) => (
                  <div key={capability} className="flex items-start gap-3 text-sm text-textNeutral/80">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amberCommand" />
                    <p>{capability}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative px-6 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-panelNight/20 to-panelNight/50" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-4xl font-semibold">Feature Playbook</h2>
              <p className="mt-4 text-base text-textNeutral/80">
                Same layout as the reference page, updated for convoy orchestration. Click through to each dedicated route.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => (
                <div key={feature.title} className="flex flex-col rounded-3xl border border-panelNight/40 bg-panelNight/70 p-6 text-sm text-textNeutral/80">
                  <p className="text-xl font-semibold text-textNeutral">{feature.title}</p>
                  <p className="mt-3 flex-1">{feature.copy}</p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={feature.demo}
                      className="flex-1 rounded-full bg-amberCommand px-3 py-2 text-center text-xs font-semibold text-black"
                    >
                      Open
                    </Link>
                    <Link
                      href={feature.docs}
                      className="flex-1 rounded-full border border-panelNight/40 px-3 py-2 text-center text-xs font-semibold text-textNeutral"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="relative px-6 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_65%)]" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-4xl font-semibold">How it works</h2>
              <p className="mt-4 text-base text-textNeutral/80">A four-step loop keeping homepage layout independent from the dashboard.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {workflowSteps.map((step) => (
                <div key={step.step} className="relative rounded-3xl border border-panelNight/40 bg-panelNight/70 p-8">
                  <p className="text-5xl font-semibold text-amberCommand/40">{step.step}</p>
                  <p className="mt-4 text-xl font-semibold text-textNeutral">{step.title}</p>
                  <p className="mt-2 text-sm text-textNeutral/80">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-panelNight/40 bg-panelNight/80 px-6 py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xl font-semibold">AICC</p>
                <p className="mt-2 text-sm text-textNeutral/70">
                  AI-driven convoy orchestration prototype. Homepage layout mirrors the provided reference while dashboards stay focused on ops.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-textNeutral/60">Project</p>
                <ul className="mt-3 space-y-2 text-sm text-textNeutral/70">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-amberCommand">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-textNeutral/60">Technologies</p>
                <ul className="mt-3 space-y-2 text-sm text-textNeutral/70">
                  <li>Next.js 16</li>
                  <li>Tailwind · custom palette</li>
                  <li>Mapbox GL</li>
                  <li>OR-Tools (planned)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-textNeutral/60">Connect</p>
                <div className="mt-3 flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="rounded-full border border-panelNight/40 px-4 py-2 text-xs text-textNeutral hover:border-amberCommand/40"
                    >
                      {social.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-textNeutral/60">Prototype · © {new Date().getFullYear()} AICC Command Lab</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
