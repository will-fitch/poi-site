import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import './map.css';

import PointOfInterest from '../poi';
import { Text } from '@mantine/core';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [13, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;




type MapDisplayProps = {
    points: PointOfInterest[],
    onClick: (ll: LatLng) => void
}

export default function MapDisplay({ points, onClick }: MapDisplayProps) {

    const [ mouseLatlng, setMouseLatlng ] = React.useState<LatLng | null>(null)

    function ClickHandler() {
        const map = useMapEvents({
            click(e: any) {
                onClick(e.latlng);
            },
            mousemove(e: any) {
                setMouseLatlng(e.latlng);
            }
        });
    
        return <></>
    }

    return (
        <>
        <MapContainer
            className="full-height-map"
            center={[43.748008186748926, -70.03136157989503]}
            zoom={13}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler />
            {points.map((poi) => poi.getMarker())}
        </MapContainer>
        <Text>{mouseLatlng?.lat.toPrecision(10)+", "+mouseLatlng?.lng.toPrecision(10)}</Text>
        </>
    )

}