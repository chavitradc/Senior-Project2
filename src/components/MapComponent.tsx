import React from 'react';
import dynamic from "next/dynamic";
import { LoadingSpinner } from "./LoadingSpinner";

// Define types
type LatLngLiteral = {
    lat: number;
    lng: number;
};

type Location = {
    id: string;
    lat: number;
    lng: number;

};

// Define props interface for MapComponent
interface MapComponentProps {
    center: LatLngLiteral;
    locations: Location[];
    onLocationSelect: (location: Location) => void;
}

// Dynamic import of Map component
const Map = dynamic(
    () => import("@/components/Map").then((mod) => mod.Map),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner />
            </div>
        ),
    }
);

export const MapComponent: React.FC<MapComponentProps> = ({ center, locations, onLocationSelect }) => (
    <Map
        center={center}
        locations={locations}
        onLocationSelect={onLocationSelect}
    />
);