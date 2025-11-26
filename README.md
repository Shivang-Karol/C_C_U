## AICC — AI-Driven Convoy & Mobility Command System

This repository contains a hackathon-ready frontend that demonstrates a complete command-and-control experience for convoy planners and field leaders. It includes a Mapbox-driven operational picture, mock analytics, simulation controls, and a responsive convoy leader UI.

### Tech Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v3 (JIT) with a military inspired UI kit (Deep slate `#0f1724`, panel `#111827`, amber `#b58900`, olive `#6b8e23`, danger `#ef4444`, text `#e5e7eb`)
- Mapbox GL JS for the interactive map (polyline overlays, convoy markers, popups)
- Mock APIs via Next.js route handlers (convoys, optimizer, events, checkpoint logging)
- SWR + custom polling bridge for real-time-like updates

### Quick Start

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_MAPBOX_TOKEN
npm run dev
```

Visit `http://localhost:3000/dashboard` for the Command Center or `http://localhost:3000/mobile` for the convoy leader UI. The root route redirects to the dashboard automatically.

### Environment Variables

Create `.env.local` and supply your Mapbox credential:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-public-token
```

Without this token the map component renders a step-by-step setup notice instead of failing silently.

### Project Structure

```
src/
	app/
		dashboard/        # Command dashboard layout, map, analytics
		mobile/           # Convoy leader responsive view
		convoys/[id]/     # Mission-focused drill-down page
		api/              # Mock REST-like endpoints used by the UI
	components/         # Map, sidebar, analytics, toasts, etc.
	lib/                # API helper, Mapbox helpers, simulation utilities
	data/mock/          # JSON fixtures for convoys + roads
	styles/             # Tailwind global styles
	types/              # Shared TS models
```

### Available Scripts

- `npm run dev` – Start Next.js in development mode with hot reload.
- `npm run build` – Create an optimized production build.
- `npm start` – Run the production build locally.
- `npm run lint` – Lint the project via the Next.js ESLint preset.

### Feature Notes & TODOs

- **Mapbox integration**: Live convoy positions are simulated via `src/lib/simulate.ts`. Replace the interval engine with telemetry when available.
- **Optimizer modal**: `POST /api/optimizer/route` returns mocked OR-Tools output. Wire it to the real optimizer backend and persist its response.
- **Event simulator**: Buttons publish to `/api/events` which currently echoes payloads. Connect to your realtime broker, or plug in SSE/Socket.IO streams via `createRealtimeBridge` in `src/lib/api.ts`.
- **Checkpoint logging**: The mobile checkpoint button posts to `/api/checkpoint`. Replace the TODO GPS stub once mobile hardware integration is available.

### Testing & Accessibility

- All actionable controls have `aria-label`s or descriptive text and visible focus indicators (`focus-outline` utility).
- High-contrast mode toggles brighter map overlays for low-light ops.
- Skeletons, empty states, and spinner overlays guide the operator during loading/failure modes.

### Assumptions

1. Convoy + road data comes from a planning service; we seed it via `src/data/mock` for now.
2. Optimizer, event bus, and checkpoint APIs are not yet available, so the route handlers act as placeholders with clear TODO comments.
3. Realtime telemetry is approximated with polling to keep hackathon setup frictionless; swap the `createRealtimeBridge` helper for websockets when ready.
