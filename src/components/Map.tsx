import React, { useState, useMemo } from 'react';
import {
    MapContainer,
    Marker,
    ZoomControl,
} from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { Location } from '../../types/Location';
import SelectedLocation from './render/SelectedLocation';
import SearchControl from './render/SearchControl';
import LayerControl from './render/LayerControl';
import { createIcon } from './render/CustomIcon';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
    center: LatLngLiteral;
    locations: Location[];
    defaultZoom?: number;
    minZoom?: number;
    onLocationSelect: (location: Location) => void;
}

export const Map: React.FC<MapProps> = ({
    center,
    locations,
    defaultZoom = 5,
    minZoom = 2,
    onLocationSelect
}) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const mapMarkIcon = useMemo(() => createIcon("map-marker.png", [47, 55]), []);
    const mapMarkActiveIcon = useMemo(() => createIcon("active-map-marker.png", [57, 65]), []);

    const handleMarkerClick = (location: Location) => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
    };

    return (
        <div className="w-full h-full overflow-hidden">
            <MapContainer
                center={center}
                zoom={defaultZoom}
                minZoom={minZoom}
                zoomControl={false}
                className="w-full h-full"
            >  <SearchControl />
                <LayerControl defaultLayer="roadmap" />
                {selectedLocation && <SelectedLocation center={selectedLocation} />}

                {locations.map((location) => {
                    const isActive = location.id === selectedLocation?.id;
                    return (
                        <Marker
                            key={location.id}
                            icon={isActive ? mapMarkActiveIcon : mapMarkIcon}
                            position={location}
                            eventHandlers={{
                                click: () => handleMarkerClick(location),
                            }}
                        />
                    );
                })}

                <ZoomControl position="topleft" />

            </MapContainer>
        </div>
    );
};


