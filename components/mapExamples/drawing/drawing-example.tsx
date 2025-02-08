import React from 'react';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';

import {UndoRedoControl} from './undo-redo-control';
import {useDrawingManager} from './use-drawing-manager';
import ControlPanel from './control-panel';

const DrawingExample = () => {
  const drawingManager = useDrawingManager();

  return (
    <>
      <Map
        defaultZoom={18}
        defaultCenter={{ lat: 38.94171479639421, lng: -92.31970464069614 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapTypeId="satellite"
        style={{height: '60vh', width: '60vw'}}
      />

      <ControlPanel />

      <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl>
    </>
  );
};

export default DrawingExample;
