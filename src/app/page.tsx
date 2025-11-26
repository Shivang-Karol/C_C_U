import Image from 'next/image';
import Link from 'next/link';

const heroStats = [
  { label: 'Conflict Reduction', value: '65%', detail: 'Fewer choke-point clashes once AICC is deployed' },
  { label: 'Faster Convoys', value: '3h', detail: 'Average time saved per high-altitude push' },
  { label: 'Live Corridors', value: '42', detail: 'Simultaneous road segments under command' },
];

const problemStatements = [
  {
    title: 'Chokepoint Chaos',
    detail: 'Multiple corps attempt the same pass with zero coordination, creating multi-hour gridlock and exposure.',
  },
  {
    title: 'Weather Blind Spots',
    detail: 'Slides, fog, and avalanches erase the best plan in minutes with no live telemetry to adjust routing.',
  },
  {
    title: 'Manual Checkpoints',
    detail: 'Paper logs never reach HQ on time, so road-space allotments are based on guesswork.',
  },
  {
    title: 'Fragmented Systems',
    detail: 'BRO, CAPF, and Army cells operate different tools, preventing a single source of operational truth.',
  },
];

const techStack = [
  {
    label: 'Terrain Intelligence',
    abbr: 'TI',
    description: 'Fuses elevation, weather, and civilian traffic feeds to predict viable corridors every hour.',
  },
  {
    label: 'Telemetry Bridge',
    abbr: 'TB',
    description: 'Streams convoy positions, checkpoint logs, and alerts through a hardened FastAPI/SSE mesh.',
  },
  {
    label: 'Optimizer Core',
    abbr: 'OC',
    description: 'OR-Tools powered rerouting engine with commander approval and auto rollback.',
  },
];

const keyCapabilities = [
  'Real-time deconfliction of Zoji La, Sela, and Siliguri corridors',
  'Event simulation lab for landslides, advisories, and convoy merges',
  'Distributed mobile logging that syncs when SATCOM returns',
  'Audit-ready timeline for tri-service coordination',
];

const featureCards = [
  {
    title: 'Operational Picture',
    copy: 'Unified dashboard for HQ, BRO, and CAPF cells with road segments, convoy timelines, and alerts.',
    demo: '/dashboard',
    docs: '#picture',
  },
  {
    title: 'Simulation & Events',
    copy: 'Inject weather, blockages, and congestion to rehearse responses before issuing live orders.',
    demo: '/events',
    docs: '#events',
  },
  {
    title: 'Fleet Analytics',
    copy: 'Detect chronic delays, fuel waste, and preload suggestions for merge candidates.',
    demo: '/analytics',
    docs: '#analytics',
  },
  {
    title: 'Mobile Checkpoints',
    copy: 'Offline-first reporting for convoy leaders with automatic sync to HQ feeds.',
    demo: '/mobile',
    docs: '#mobile',
  },
  {
    title: 'Risk Desk',
    copy: 'Conflict triage for blocked corridors, high-risk routes, and merge advisories.',
    demo: '/conflicts',
    docs: '#conflicts',
  },
  {
    title: 'Optimizer Mesh',
    copy: 'AI-assisted reroute recommendations with commander sign-off workflow and rollback.',
    demo: '#optimizer',
    docs: '#optimizer-docs',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Sense',
    copy: 'Ingest satellite weather, BRO advisories, and convoy telemetry for a live operational picture.',
  },
  {
    step: '02',
    title: 'Decide',
    copy: 'Optimizer Core evaluates options, factoring terrain, unit priority, and choke-point saturation.',
  },
  {
    step: '03',
    title: 'Act',
    copy: 'Commanders approve reroutes, merges, or holds with a single tap and share with subordinate formations.',
  },
  {
    step: '04',
    title: 'Learn',
    copy: 'Analytics surfaces delays, conflicts, and savings to improve the next convoy cycle.',
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
          <div className="absolute inset-0 bg-gradient-to-b from-panelNight/60 via-panelNight/30 to-slateDepth" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-70" />
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
                <Link
                  href="#solution"
                  className="rounded-full border border-textNeutral/30 px-6 py-3 text-sm font-semibold text-textNeutral hover:border-amberCommand/40"
                >
                  View Solution Stack
                </Link>
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
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-amberCommand/10 blur-3xl" aria-hidden />
              <div className="relative rounded-3xl border border-panelNight/40 bg-panelNight/70 p-4">
                <Image
                  src="/hero-tracking.jpg"
                  alt="Convoy tracking visualization"
                  width={960}
                  height={720}
                  priority
                  className="h-full w-full rounded-2xl object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-48 rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4 text-sm shadow-command">
                  <p className="text-xs uppercase text-textNeutral/50">Convoys monitored</p>
                  <p className="text-2xl font-semibold text-amberCommand">1,247</p>
                  <p className="text-textNeutral/70">Active corridors synced via Event Lab feed</p>
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
