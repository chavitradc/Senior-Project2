import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';

type LatLngLiteral = {
    lat: number;
    lng: number;
};

type Location = {
    id: string;
    lat: number;
    lng: number;
    status: "pending" | "rescued"
};

interface MapComponentProps {
    center: LatLngLiteral;
    locations: Location[];
    activeLocationId: string | null;
    onLocationSelect: (location: Location | null) => void;
    onAddLocation: (location: LatLngLiteral) => void;
}

// Dynamic import of Map component with ssr disabled
const DynamicMap = dynamic(
    () => import('@/components/Map').then((mod) => mod.Map),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner />
            </div>
        ),
    }
);

export const MapComponent: React.FC<MapComponentProps> = ({
    center,
    locations,
    activeLocationId,
    onLocationSelect,
    onAddLocation,
}) => (
    <DynamicMap
        center={center}
        locations={locations}
        activeLocationId={activeLocationId}
        onLocationSelect={onLocationSelect}
        onAddLocation={onAddLocation}
    />
);


