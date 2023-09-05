import Aside from './Aside'
import NavBar from './NavBar'
import { useState } from 'react'

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import './MapComponent.css'

export default function MapComponent() {
    const [position, setPosition] = useState(null)

    function LocationMarker() {
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }
    return (
        <div className="container">
            <NavBar />
            <Aside />
            <div className="map">
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100vh', width: '100vw' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    )
}
