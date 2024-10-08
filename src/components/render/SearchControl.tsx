import React, { useEffect, useCallback } from 'react';
import { Control, DomUtil, DomEvent, LatLng } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

const SearchControl: React.FC = () => {
    const map = useMapEvents({});

    const handleSearch = useCallback(() => {
        const lat = (document.getElementById('lat-input') as HTMLInputElement).value;
        const lng = (document.getElementById('lng-input') as HTMLInputElement).value;

        if (lat && lng) {
            const latNum = parseFloat(lat);
            const lngNum = parseFloat(lng);
            if (!isNaN(latNum) && !isNaN(lngNum)) {
                map.flyTo(new LatLng(latNum, lngNum), 18);
            } else {
                alert('Invalid latitude or longitude');
            }
        } else {
            alert('Please enter both latitude and longitude');
        }
    }, [map]);

    useEffect(() => {
        const searchControl = new Control({ position: 'bottomright' });
        searchControl.onAdd = () => {
            const container = DomUtil.create('div', 'leaflet-control leaflet-bar');
            container.style.backgroundColor = 'white';
            container.style.padding = '5px';
            container.style.borderRadius = '4px';
            container.innerHTML = `
                <input id="lat-input" type="text" placeholder="Latitude" style="width: 100px; margin-right: 5px;">
                <input id="lng-input" type="text" placeholder="Longitude" style="width: 100px; margin-right: 5px;">
                <button id="search-button">Search</button>
            `;

            DomEvent.disableClickPropagation(container);

            const button = container.querySelector('#search-button') as HTMLElement;
            if (button) {
                DomEvent.on(button, 'click', handleSearch);
            }

            return container;
        };

        searchControl.addTo(map);

        return () => {
            map.removeControl(searchControl);
        };
    }, [map, handleSearch]);

    return null;
};

export default SearchControl;
