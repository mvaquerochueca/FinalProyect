import Aside from './Aside'
import NavBar from './NavBar'
import { useMemo, useState, useEffect } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

export default function MapComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const [userLocation, setUserLocation] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [activeMarker, setActiveMarker] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setUserLocation({ lat: latitude, lng: longitude })
            })
        }
    }, [])

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    // Manejar la pulsación de la tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            generateRandomLocations()
        }
    }

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds()
        markers.forEach(({ position }) => bounds.extend(position))
        map.fitBounds(bounds)
    }

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    const markers = [
        {
            id: 1,
            name: 'Restaurante Tres Puesrtas',
            position: { lat: 41.532464 + 0.001, lng: 1.841194 + 0.031 },
        },
        {
            id: 2,
            name: 'Hotel Hesperia  3*',
            position: { lat: 41.532464 - 0.002, lng: 1.841194 - 0.002 },
        },
        {
            id: 3,
            name: 'Camping Baix Llobregat',
            position: { lat: 41.532464 + 0.003, lng: 1.841194 - 0.023 },
        },
        {
            id: 4,
            name: 'Marker 4',
            position: { lat: 41.532464 - 0.044, lng: 1.841194 + 0.024 },
        },
        {
            id: 5,
            name: 'Cafeteria 365',
            position: { lat: 41.532464 + 0.025, lng: 1.841194 - 0.015 },
        },
        {
            id: 6,
            name: 'PetShop',
            position: { lat: 41.532464 - 0.016, lng: 1.841194 + 0.016 },
        },
        {
            id: 7,
            name: 'Clinica Veterinaria',

            position: { lat: 41.532464 + 0.107, lng: 1.841194 - 0.037 },
        },
    ]

    if (!isLoaded) return <div>"Loading Maps"</div>

    return (
        <div className="container">
            <NavBar />
            <Aside />
            <input
                name="location"
                id="location"
                className="input mt-20 border-2 border-gray-500 z-10 rounded-md m-2 placeholder-gray-600 focus:placeholder-gray-500 sm:w-full h-8 md:w-full lg:w-full xl:w-full "
                placeholder="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />{' '}
            <GoogleMap
                mapContainerClassName="map-container"
                center={userLocation}
                zoom={12}
            >
                {markers.map(({ id, name, position }) => (
                    <Marker
                        key={id}
                        position={position}
                        onClick={() => handleActiveMarker(id)}
                    >
                        {activeMarker === id ? (
                            <InfoWindow
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div>{name}</div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    )
}
