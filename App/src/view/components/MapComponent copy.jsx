import Aside from './Aside'
import NavBar from './NavBar'

import { useState } from 'react'

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvent,
    useMapEvents,
} from 'react-leaflet'
// import { Icon, divIcon } from 'leaflet'
// import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'
import './MapComponent.css'

export default function MapComponent() {
    function LocationMarker() {
        const [position, setPosition] = useState(null)
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
        <section>
            <NavBar />
            <Aside />
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
                // style={{ height: '100vh', width: '100vw' }}
                className="map"
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
        </section>
    )
}
//     const markers = [
//         {
//             geocode: [51.508, -0.09],
//             Popup: 'Hello<br/> Whats up?  ',
//         },
//         {
//             geocode: [51.51, -0.09],
//             Popup: 'Easily customizable.',
//         },
//         {
//             geocode: [51.51, -0.08],
//             Popup: 'Mario',
//         },
//     ]

//     const customIcon = new Icon({
//         iconUrl: '../src/assets/pin.png',
//         iconSize: [38, 38],
//     })

//     function LocationMarker() {
//         const [position, setPosition] = useState(null)
//         const map = useMapEvents({
//             click() {
//                 map.locate()
//             },
//             locationfound(e) {
//                 setPosition(e.latlng)
//                 map.flyTo(e.latlng, map.getZoom())
//             },
//         })

//         return position === null ? null : (
//             <Marker position={position}>
//                 <Popup>You are here</Popup>
//             </Marker>
//         )
//     }

//     const createCustomClusterIcon = (cluster) => {
//         return new divIcon({
//             html: `<div className= "cluster-icon">${cluster.getChildCount()}</div>`,
//             className: 'custom-marker-cluster',
//             iconSize: [33, 33],
//         })
//     }

//     return (
//         // <section>
//         //     <MapContainer
//         //         center={{ lat: 51.505, lng: -0.09 }}
//         //         zoom={13}
//         //         scrollWheelZoom={false}
//         //     >
//         //         <TileLayer
//         //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         //         />
//         //         <LocationMarker />
//         //     </MapContainer>
//         // </section>
//         <section className="flex">
//             <NavBar />
//             <div className="flex flex-col w-full">
//                 <div className="flex-grow">
//                     <Aside />
//                     <div className="h-full">
//                         <MapContainer
//                             center={{ lat: 51.505, lng: -0.09 }}
//                             zoom={13}
//                             scrollWheelZoom={false}
//                         >
//                             <TileLayer
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             />

//                             <MarkerClusterGroup
//                                 chunkedLoading
//                                 iconCreateFunction={createCustomClusterIcon}
//                             >
//                                 {markers.map((marker, index) => (
//                                     <Marker
//                                         key={index}
//                                         position={marker.geocode}
//                                         icon={customIcon}
//                                     >
//                                         <Popup>{marker.Popup}</Popup>
//                                     </Marker>
//                                 ))}
//                             </MarkerClusterGroup>
//                             <LocationMarker />
//                         </MapContainer>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }
