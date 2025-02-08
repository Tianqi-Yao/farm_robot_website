import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

import {APIProvider, Map} from '@vis.gl/react-google-maps';

import ControlPanel from './components/control-panel';
import {CustomAdvancedMarker} from './components/custom-advanced-marker/custom-advanced-marker';
import {loadRealEstateListing} from '../libs/load-real-estate-listing';

import {RealEstateListing} from './types/types';

import './style.css';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;


const App = () => {
  const [realEstateListing, setRealEstateListing] =
    useState<RealEstateListing | null>(null);

  useEffect(() => {
    void loadRealEstateListing().then(data => {
      setRealEstateListing(data);
    });
  }, []);

  return (
    <div className="advanced-marker-example">
      <APIProvider apiKey={API_KEY} libraries={['marker']}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultZoom={5}
          defaultCenter={{ lat: 38.94171479639421, lng: -92.31970464069614 }}
          gestureHandling={'greedy'}
          style={{ height: '100vh', width: '100%' }}
          disableDefaultUI>
          {/* advanced marker with html-content */}
          {realEstateListing && (
            <CustomAdvancedMarker realEstateListing={realEstateListing} />
          )}
        </Map>

        <ControlPanel />
      </APIProvider>
    </div>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
