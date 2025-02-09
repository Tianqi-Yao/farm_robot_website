"use client";

import { ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps";
import { UndoRedoControl } from "./undo-redo-control";
import { useDrawingManager } from "./use-drawing-manager";
import ControlPanel from "./control-panel";
import { getAllCoordinates } from "./getCoordinates";
import { useState } from "react";
import { log } from "console";

const DrawingExample = () => {
    const drawingManager = useDrawingManager();
    const [nodes, setNodes] = useState<{ lat: number; lng: number }[]>([]);
    const [drawingState, setDrawingState] = useState<any>({ now: [] }); // Stores shapes

    const getCoordinates = () => {
        if (!drawingState.now.length) {
            console.log("⚠️ No shapes drawn yet!");
            setNodes([]);
            return;
        }

        const allNodes = getAllCoordinates(drawingState.now);
        console.log("📍 All Drawn Nodes:", allNodes);
        setNodes(allNodes);
    };

    return (
        <>
            <Map
                defaultZoom={18}
                defaultCenter={{
                    lat: 38.94171479639421,
                    lng: -92.31970464069614,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapTypeId="satellite"
                style={{ height: "60vh", width: "60vw" }}
            />

            <ControlPanel />

            {/* Drawing Controls */}
            <MapControl position={ControlPosition.TOP_CENTER}>
                <UndoRedoControl drawingManager={drawingManager} onStateChange={setDrawingState} />
            </MapControl>

            {/* 按钮：获取所有形状的坐标 */}
            <button
                onClick={getCoordinates}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
                Get All Coordinates
            </button>

            {/* 显示所有绘制的坐标点 */}
            <div className="p-4 bg-gray-100 mt-4 rounded">
                <h2 className="text-lg font-semibold mb-2">
                    Drawn Nodes (Lat/Lng):
                </h2>
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
