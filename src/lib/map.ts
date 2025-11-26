import type mapboxgl from 'mapbox-gl';
import type { Convoy, Priority } from '@/types/convoy';
import type { Route } from '@/types/route';

export const MAP_DEFAULT_CENTER: [number, number] = [72.8777, 19.076]; // Mumbai for demo
export const MAP_DEFAULT_ZOOM = 4.4;
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11';

const priorityColors: Record<Priority, string> = {
  ALPHA: '#f59e0b',
  BRAVO: '#34d399',
  CHARLIE: '#60a5fa',
};

export const getPriorityColor = (priority: Priority) => priorityColors[priority];

export const segmentColor = (status: Route['segments'][number]['status'], riskLevel: number) => {
  if (status === 'BLOCKED') return '#ef4444';
  if (status === 'HIGH_RISK') return '#b58900';
  if (riskLevel > 0.5) return '#f97316';
  return '#22d3ee';
};

export const buildRouteFeature = (route: Route) => ({
  type: 'Feature' as const,
  geometry: {
    type: 'LineString' as const,
    coordinates: route.polyline,
  },
  properties: {
    routeId: route.id,
    eta: route.etaHours,
    risk: route.riskScore,
  },
});

export const buildSegmentCollection = (route: Route) => ({
  type: 'FeatureCollection' as const,
  features: route.segments.map((segment) => ({
    type: 'Feature' as const,
    geometry: {
      type: 'LineString' as const,
      coordinates: segment.coordinates,
    },
    properties: {
      segmentId: segment.id,
      status: segment.status,
      recommendedSpeed: segment.recommendedSpeedKmph,
      terrain: segment.terrain,
      difficulty: segment.difficulty,
      color: segmentColor(segment.status, segment.riskLevel),
    },
  })),
});

export const buildConvoyPoints = (
  convoys: Convoy[],
  positions?: Record<string, [number, number]>,
) => ({
  type: 'FeatureCollection' as const,
  features: convoys.map((convoy) => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates:
        positions?.[convoy.id] ??
        convoy.assignedRoute?.polyline?.[0] ?? [convoy.origin.lng, convoy.origin.lat],
    },
    properties: {
      convoyId: convoy.id,
      priority: convoy.priority,
      status: convoy.status,
      color: getPriorityColor(convoy.priority),
    },
  })),
});

export const ensureBaseSources = (map: mapboxgl.Map) => {
  if (!map.getSource('convoy-routes')) {
    map.addSource('convoy-routes', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }
  if (!map.getLayer('convoy-routes-line')) {
    map.addLayer({
      id: 'convoy-routes-line',
      type: 'line',
      source: 'convoy-routes',
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 4,
        'line-opacity': 0.95,
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' },
    });
  }
  if (!map.getSource('convoy-markers')) {
    map.addSource('convoy-markers', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }
  if (!map.getLayer('convoy-markers-circle')) {
    map.addLayer({
      id: 'convoy-markers-circle',
      type: 'circle',
      source: 'convoy-markers',
      paint: {
        'circle-radius': 10,
        'circle-color': ['get', 'color'],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#0f1724',
      },
    });
  }
};

export const updateConvoyDataOnMap = (
  map: mapboxgl.Map,
  convoys: Convoy[],
  selected?: Route,
  positions?: Record<string, [number, number]>,
) => {
  ensureBaseSources(map);

  const routeCollection = {
    type: 'FeatureCollection' as const,
    features: selected ? buildSegmentCollection(selected).features : [],
  };

  (map.getSource('convoy-routes') as mapboxgl.GeoJSONSource)?.setData(routeCollection);
  (map.getSource('convoy-markers') as mapboxgl.GeoJSONSource)?.setData(
    buildConvoyPoints(convoys, positions),
  );
};
