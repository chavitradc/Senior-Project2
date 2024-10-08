import { Icon } from 'leaflet';

export const createIcon = (url: string, size: [number, number]) =>
    new Icon({
        iconUrl: url,
        iconSize: size,
    });
