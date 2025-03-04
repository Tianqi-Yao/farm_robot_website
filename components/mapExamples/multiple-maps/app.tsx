import React, {useCallback, useState} from 'react';
import {
  APIProvider,
  MapCameraProps,
  Map,
  MapCameraChangedEvent
} from '@vis.gl/react-google-maps';

import ControlPanel from './control-panel';

const MAP_IDS = [
  'bf51a910020fa25a',
  '49ae42fed52588c3',
  '3fec513989decfcd',
  '7a9e2ebecd32a903'
];

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;


const INITIAL_CAMERA_STATE = {
  center: { lat: 38.94171479639421, lng: -92.31970464069614 },
  zoom: 10,
  heading: 0,
  tilt: 0
};

const App = () => {
  const [cameraState, setCameraState] =
    useState<MapCameraProps>(INITIAL_CAMERA_STATE);

  // we only want to receive cameraChanged events from the map the
  // user is interacting with:
  const [activeMap, setActiveMap] = useState(1);
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraState(ev.detail);
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 50%)'
        }}>
        {[0, 1, 2, 3].map(i => {
          const isActive = activeMap === i;

          return (
            <Map
              key={i}
              id={`map-${i}`}
              mapId={MAP_IDS[i]}
              disableDefaultUI
              gestureHandling={'greedy'}
              style={{height: '50vh'}}
              onCameraChanged={isActive ? handleCameraChange : undefined}
              onMouseover={() => setActiveMap(i)}
              {...cameraState}></Map>
          );
        })}
      </div>

      <ControlPanel />
    </APIProvider>
  );
};

export default App;