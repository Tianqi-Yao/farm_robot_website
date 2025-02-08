import React, { useState } from 'react';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

import ControlPanel from './control-panel';

import brightColorsStyles from './map-styles/bright-colors';
import vitaminCStyles from './map-styles/vitamin-c';

const MapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain'
};
export type MapConfig = {
  id: string;
  label: string;
  mapId?: string;
  mapTypeId?: string;
  styles?: google.maps.MapTypeStyle[];
};

const MAP_CONFIGS: MapConfig[] = [
  {
    id: 'light',
    label: 'Light',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.ROADMAP
  },
  {
    id: 'dark',
    label: 'Dark',
    mapId: '739af084373f96fe',
    mapTypeId: MapTypeId.ROADMAP
  },
  {
    id: 'satellite',
    label: 'Satellite (no mapId)',
    mapTypeId: MapTypeId.SATELLITE
  },
  {
    id: 'hybrid',
    label: 'Hybrid (no mapId)',
    mapTypeId: MapTypeId.HYBRID
  },
  {
    id: 'terrain',
    label: 'Terrain (no mapId)',
    mapTypeId: MapTypeId.TERRAIN
  },
  {
    id: 'styled1',
    label: 'Raster / "Bright Colors" (no mapId)',
    mapTypeId: MapTypeId.ROADMAP,
    styles: brightColorsStyles
  },
  {
    id: 'styled2',
    label: 'Raster / "Vitamin C" (no mapId)',
    mapTypeId: MapTypeId.ROADMAP,
    styles: vitaminCStyles
  },
  {
    id: 'satellite2',
    label: 'Satellite ("light" mapId)',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.SATELLITE
  },
  {
    id: 'hybrid2',
    label: 'Hybrid ("light" mapId)',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.HYBRID
  },
  {
    id: 'terrain2',
    label: 'Terrain ("light" mapId)',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.TERRAIN
  }
];

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function GoogleMapComponent() {
  const [mapConfig, setMapConfig] = useState<MapConfig>(MAP_CONFIGS[3]);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={{ lat: 38.94171479639421, lng: -92.31970464069614 }}
        defaultZoom={18}
        mapId={mapConfig.mapId || null}
        mapTypeId={mapConfig.mapTypeId}
        styles={mapConfig.styles}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        style={{ width: "80%", height: "500px" }}
      />
      <ControlPanel
        mapConfigs={MAP_CONFIGS}
        mapConfigId={mapConfig.id}
        onMapConfigIdChange={id =>
          setMapConfig(MAP_CONFIGS.find(s => s.id === id)!)
        }
      />
    </APIProvider>
  );
};
