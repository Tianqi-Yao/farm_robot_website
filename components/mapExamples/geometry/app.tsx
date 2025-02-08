import React,{useEffect} from 'react';
import {createRoot} from 'react-dom/client';

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {Circle, Polygon, Polyline} from './components';
import ControlPanel from './control-panel';

import {POLYGONS} from './encoded-polygon-data';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const INITIAL_CENTER = { lat: 38.94171479639421, lng: -92.31970464069614 };

const App = () => {
  const [center, setCenter] = React.useState(INITIAL_CENTER);
  const [radius, setRadius] = React.useState(100);

  const polygonPaths = [
    { lat: 38.942176499074485, lng: -92.3190674340208 },
    { lat: 38.94290844490146, lng: -92.31906792460711 },
    { lat: 38.942910666096424, lng: -92.3219111059261 },
    { lat: 38.94232338006191, lng: -92.3218896019346 },
    { lat: 38.94222853540963, lng: -92.32177217763937 },
  ];

  const polylinePath = [
    { lat: 38.942219768996516, lng: -92.31950653464163 },
    { lat: 38.94254951700419, lng: -92.31952086175689 },
    { lat: 38.94256286373012, lng: -92.32128229696347 },
  ];

  // 当组件加载或数据改变时打印所有节点
  useEffect(() => {
    console.log("🗺️ 地图上的所有节点:");
    
    console.log("📍 Marker (标记) :", center);
    console.log("⭕ Circle (圆) 中心点:", center, "半径:", radius);
    console.log("🔺 Polygon (多边形) 路径:", polygonPaths);
    console.log("🔷 Polyline (折线) 路径:", polylinePath);
  }, [center, radius]);

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({lng: newCenter.lng(), lat: newCenter.lat()});
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={INITIAL_CENTER}
        defaultZoom={18}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapTypeId="satellite"
        style={{height: '60vh', width: '60vw'}}
        >
        <Marker
          position={center}
          draggable
          onDrag={e =>
            setCenter({lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0})
          }
        />
        <Polygon 
          paths={polygonPaths}
          strokeColor={'#ff22cc88'}
          strokeOpacity={0.8}
          strokeWeight={1.5}
          fillColor={'#ff22cc88'}
          fillOpacity={0.3}
          // editable
          // draggable
          encodedPaths={POLYGONS}
        />
        <Polyline
          path={polylinePath}
          strokeWeight={2}
          strokeColor={'#ff22cc88'}
          strokeOpacity={0.5}
          editable
          // draggable
          encodedPath={POLYGONS[11]}
        />
        <Circle
          radius={radius}
          center={center}
          onRadiusChanged={setRadius}
          onCenterChanged={changeCenter}
          strokeColor={'#0c4cb3'}
          strokeOpacity={1}
          strokeWeight={3}
          fillColor={'#3b82f6'}
          fillOpacity={0.3}
          // editable
          // draggable
          visible={false}
        />
      </Map>

      {/* 打印数据到页面上 */}
      <div className="p-4 bg-gray-100 mt-4 rounded">
        <h2 className="text-lg font-semibold mb-2">all nodes on the map：</h2>
        {/* <p><strong>📍 Marker:</strong> {JSON.stringify(center)}</p>
        <p><strong>⭕ Circle center point:</strong> {JSON.stringify(center)}, radius: {radius} m</p> */}
        <p><strong>🔺 Polygon path:</strong></p>
        <ul>
          {polygonPaths.map((point, index) => (
            <li key={index}>{`(lat: ${point.lat}, lng: ${point.lng})`}</li>
          ))}
        </ul>
        <p><strong>🔷 Polyline path:</strong></p>
        <ul>
          {polylinePath.map((point, index) => (
            <li key={index}>{`(lat: ${point.lat}, lng: ${point.lng})`}</li>
          ))}
        </ul>
      </div>
      

      {/* <ControlPanel
        center={center}
        radius={radius}
        onCenterChanged={setCenter}
        onRadiusChanged={setRadius}
      /> */}

      
    </APIProvider>
  );
};
export default App;