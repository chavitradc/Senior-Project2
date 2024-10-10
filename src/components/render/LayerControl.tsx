import React from 'react';
import { LayersControl, TileLayer } from 'react-leaflet';

const TILE_LAYERS = {
    roadmap: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        contributor: "OpenStreetMap",
    },
    satellite: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        contributor: "ArcGIS",
    },
    hybrid: {
        url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
        contributor: "Google",
    },
    terrain: {
        url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
        contributor: "Google",
    },
} as const;

interface LayerControlProps {
    defaultLayer: string;
}

const LayerControl: React.FC<LayerControlProps> = ({ defaultLayer }) => {
    return (
        <LayersControl position="bottomright">
            {Object.entries(TILE_LAYERS).map(([key, { url, contributor }]) => (
                <LayersControl.BaseLayer
                    key={key}
                    name={key.charAt(0).toUpperCase() + key.slice(1)}
                    checked={key === defaultLayer}
                >
                    <TileLayer
                        attribution={`&copy; ${new Date().getFullYear()} ${contributor} contributors`}
                        url={url}
                    />
                </LayersControl.BaseLayer>
            ))}
        </LayersControl>
    );
};

export default LayerControl;
