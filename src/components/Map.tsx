import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
    MapContainer,
    Marker,
    ZoomControl,
    useMap,
    useMapEvents
} from 'react-leaflet';
import { LatLngLiteral, Map as LeafletMap, Marker as LeafletMarker, Popup } from 'leaflet';
import { Location } from '../../types/Location';
import SelectedLocation from './render/SelectedLocation';
import LayerControl from './render/LayerControl';
import { createIcon } from './render/CustomIcon';
import { CoordinatesSearch } from './render/SearchControl';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import AddMarkerControl from './render/AddMarker';

interface MapProps {
    center: LatLngLiteral;
    locations: Location[];
    defaultZoom?: number;
    minZoom?: number;
    onLocationSelect: (location: Location | null) => void;
    activeLocationId: string | null;
    onAddLocation: (location: Location) => void;
}

const MapController: React.FC<{ onMapReady: (map: LeafletMap) => void }> = ({ onMapReady }) => {
    const map = useMap();
    React.useEffect(() => {
        onMapReady(map);
    }, [map, onMapReady]);
    return null;
};

export const Map: React.FC<MapProps> = ({
    center,
    locations,
    defaultZoom = 5,
    minZoom = 2,
    onLocationSelect,
    activeLocationId,
    onAddLocation
}) => {
    const mapRef = useRef<LeafletMap | null>(null);
    const [searchMarker, setSearchMarker] = useState<LeafletMarker | null>(null);
    const [isAddingMarker, setIsAddingMarker] = useState(false);

    const pendingMarkIcon = useMemo(() => createIcon("pending-marker.png", [40, 40]), []);
    const rescuedMarkActiveIcon = useMemo(() => createIcon("rescued-marker.png", [40, 40]), []);
    const searchMarkIcon = useMemo(() => createIcon("map-marker.png", [47, 55]), []);

    const handleMarkerClick = (location: Location) => {
        if (location.id === activeLocationId) {
            onLocationSelect(null);
        } else {
            onLocationSelect(location);
        }
    };

    const handleSearch = useCallback((lat: number, lng: number) => {
        if (mapRef.current) {
            const map = mapRef.current;
            const newLatLng = { lat, lng };

            map.setView(newLatLng, 10);

            if (searchMarker) {
                map.removeLayer(searchMarker);
            }

            const newSearchMarker = new LeafletMarker(newLatLng, { icon: searchMarkIcon }).addTo(map);

            const createPopupContent = () => {
                const popupContent = document.createElement('div');
                popupContent.innerHTML = `
                    <p>Searched Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
                    <button class="add-marker font-semibold">Add as new marker</button>
                    <button class="remove-marker text-red-500 font-semibold">Remove search marker</button>
                `;

                const addButton = popupContent.querySelector('.add-marker');
                const removeButton = popupContent.querySelector('.remove-marker');

                if (addButton) {
                    addButton.addEventListener('click', () => {
                        const newLocation: Location = {
                            id: `new-${Date.now()}`,
                            lat,
                            lng,
                            status: 'pending'
                        };
                        onAddLocation(newLocation);
                        map.removeLayer(newSearchMarker);
                        setSearchMarker(null);
                    });
                }

                if (removeButton) {
                    removeButton.addEventListener('click', () => {
                        map.removeLayer(newSearchMarker);
                        setSearchMarker(null);
                    });
                }

                return popupContent;
            };

            const popup = new Popup({
                closeButton: false,
                offset: [0, -30],
            }).setContent(createPopupContent);

            newSearchMarker.bindPopup(popup);

            newSearchMarker.on('click', () => {
                newSearchMarker.openPopup();
            });

            setSearchMarker(newSearchMarker);
        }
    }, [searchMarker, searchMarkIcon, onAddLocation]);


    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (isAddingMarker) {
                    const newLocation: Location = {
                        id: `new-${Date.now()}`,
                        lat: e.latlng.lat,
                        lng: e.latlng.lng,
                        status: 'pending'
                    };
                    onAddLocation(newLocation);
                    setIsAddingMarker(false);
                }
            }
        });
        return null;
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            <MapContainer
                center={center}
                zoom={defaultZoom}
                minZoom={minZoom}
                zoomControl={false}
                className="w-full h-full"
            >
                <MapController onMapReady={(map) => { mapRef.current = map; }} />
                <MapEvents />

                <LayerControl defaultLayer="roadmap" />
                {activeLocationId && <SelectedLocation center={locations.find(loc => loc.id === activeLocationId) || center} />}

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        icon={location.status === "rescued" ? rescuedMarkActiveIcon : pendingMarkIcon}
                        position={location}
                        eventHandlers={{
                            click: () => handleMarkerClick(location),
                        }}
                    />
                ))}

                <ZoomControl position="topleft" />
                <AddMarkerControl
                    isActive={isAddingMarker}
                    onClick={() => setIsAddingMarker(!isAddingMarker)}
                />
            </MapContainer>
            <CoordinatesSearch onSearch={handleSearch} />
        </div>
    );
};