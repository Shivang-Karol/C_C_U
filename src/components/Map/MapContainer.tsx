'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Convoy } from '@/types/convoy';
import type { OperationEvent } from '@/types/event';
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_STYLE,
  buildSegmentCollection,
  ensureBaseSources,
  updateConvoyDataOnMap,
} from '@/lib/map';
import type { Route } from '@/types/route';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
mapboxgl.accessToken = mapboxToken;

export type MapContainerProps = {
  convoys: Convoy[];
  selectedConvoy?: Convoy | null;
  livePositions?: Record<string, [number, number]>;
  activeEvents?: OperationEvent[];
  highContrast?: boolean;
  onRouteClick?: (segmentId: string) => void;
};

const MissingTokenNotice = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-amberCommand/60 bg-panelNight/70 p-6 text-center text-sm">
    <p className="font-semibold text-amberCommand">Map token not configured.</p>
    <ol className="list-decimal text-left text-xs leading-relaxed text-textNeutral/80">
      <li>Create a Mapbox account (free tier is fine).</li>
      <li>Generate a public token and copy it.</li>
      <li>
        Create <code>.env.local</code> in project root and add:
        <br />
        <code>NEXT_PUBLIC_MAPBOX_TOKEN=YOUR_TOKEN</code>
      </li>
      <li>Restart <code>npm run dev</code>.</li>
    </ol>
  </div>
);

const BusySpinner = () => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-amberCommand border-t-transparent" aria-label="Loading map tiles" />
  </div>
);

export const MapContainer = ({
  convoys,
  selectedConvoy,
  livePositions,
  activeEvents,
  highContrast,
  onRouteClick,
}: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(() =>
    mapboxToken ? null : 'Missing NEXT_PUBLIC_MAPBOX_TOKEN',
  );

  const currentRoute: Route | undefined = selectedConvoy?.assignedRoute;

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxToken) {
      return;
    }

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: MAP_DEFAULT_CENTER,
        zoom: MAP_DEFAULT_ZOOM,
        attributionControl: false,
      });

      mapRef.current = map;
      map.on('load', () => {
        setIsLoaded(true);
        ensureBaseSources(map);
        map.resize();
      });
    } catch (error) {
      console.error('Mapbox init error', error);
      requestAnimationFrame(() => setMapError('Unable to initialize Mapbox.'));
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    const route = currentRoute;
    updateConvoyDataOnMap(map, convoys, route, livePositions);

    if (route && route.polyline.length) {
      const focusCoordinate = route.polyline[Math.floor(route.polyline.length / 2)];
      map.flyTo({ center: focusCoordinate, zoom: 5.3, speed: 0.6 });
    }
  }, [convoys, currentRoute, livePositions, isLoaded]);

  useEffect(() => {
    if (!mapRef.current || !currentRoute || !onRouteClick) return;
    const map = mapRef.current;
    const layerId = 'convoy-routes-line';

    const handleClick = (event: mapboxgl.MapLayerMouseEvent) => {
      const segmentId = event.features?.[0]?.properties?.segmentId as string | undefined;
      if (!segmentId) return;
      const segment = currentRoute.segments.find((seg) => seg.id === segmentId);
      if (!segment) return;

      new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(
          `<div>
            <p class="text-sm font-semibold">${segment.terrain} terrain</p>
            <p class="text-xs">Recommended ${segment.recommendedSpeedKmph} km/h</p>
            <p class="text-xs">Difficulty: ${segment.difficulty}</p>
          </div>`,
        )
        .addTo(map);

      onRouteClick(segmentId);
    };

    map.on('click', layerId, handleClick);
    return () => {
      map.off('click', layerId, handleClick);
    };
  }, [currentRoute, onRouteClick]);

  useEffect(() => {
    if (!mapRef.current || !currentRoute || !isLoaded) return;
    const map = mapRef.current;
    const layerId = 'convoy-routes-line';
    const source = map.getSource('convoy-routes') as mapboxgl.GeoJSONSource | undefined;
    if (!source) return;

    const data = buildSegmentCollection(currentRoute);
    source.setData(data);

    if (highContrast) {
      map.setPaintProperty(layerId, 'line-color', '#fcd34d');
    } else {
      map.setPaintProperty(layerId, 'line-color', ['get', 'color']);
    }
  }, [currentRoute, highContrast, isLoaded]);

  if (mapError) {
    return <MissingTokenNotice />;
  }

  return (
    <div className="relative h-full w-full rounded-2xl border border-oliveAux/30 bg-panelNight shadow-command">
      {!isLoaded && <BusySpinner />}
      <div
        ref={containerRef}
        className="map-container h-full w-full rounded-2xl"
        aria-label="Operational map"
        role="img"
      />
      {activeEvents && activeEvents.length > 0 && (
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 text-xs">
          {activeEvents.slice(0, 3).map((event) => (
            <span
              key={event.id}
              className="rounded-full bg-dangerAlert/20 px-3 py-1 text-dangerAlert"
            >
              ⚠ {event.type} · {event.payload.severity}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapContainer;
