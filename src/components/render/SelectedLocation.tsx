import React from 'react';
import { useMap } from 'react-leaflet';
import { LatLngLiteral } from "leaflet";

const SelectedLocation: React.FC<{ center: LatLngLiteral }> = ({ center }) => {
    const map = useMap();
    map.panTo(center, { animate: true });
    return null;
};

export default SelectedLocation;
