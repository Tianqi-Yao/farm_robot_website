import React, {useState, useEffect, use} from 'react';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';

import {UndoRedoControl} from './undo-redo-control';
import {useDrawingManager} from './use-drawing-manager';
import ControlPanel from './control-panel';

const DrawingExample = () => {
  const drawingManager = useDrawingManager();
  const [nodes, setNodes] = useState<{lat: number; lng: number}[]>([]);

  useEffect(() => {
    if (!drawingManager) return;

    google.maps.event.addListener(drawingManager, "overlaycomplete", (event:any) => {
      let newNodes = [];

      if (event.type === "polygon") {
        // Extract polygon vertices
        newNodes = event.overlay
          .getPath()
          .getArray()
          .map((latLng: google.maps.LatLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
          }));
      } else if (event.type === "polyline") {
        // Extract polyline points
        newNodes = event.overlay
          .getPath()
          .getArray()
          .map((latLng: google.maps.LatLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
          }));
      } else if (event.type === "marker") {
        // Extract marker position
        const position = event.overlay.getPosition();
        if (position) {
          newNodes = [{ lat: position.lat(), lng: position.lng() }];
        }
      }

      console.log("📍 Drawn Nodes:", newNodes);
      setNodes(newNodes);
    });
  }, [drawingManager]);

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

      {/* Display Drawn Nodes */}
      <div className="p-4 bg-gray-100 mt-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Drawn Nodes (Lat/Lng):</h2>
        <ul>
          {nodes.map((node, index) => (
            <li key={index}>{`(${node.lat.toFixed(6)}, ${node.lng.toFixed(6)})`}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DrawingExample;
