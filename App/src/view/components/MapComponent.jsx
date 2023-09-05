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
    const [randomLocations, setRandomLocations] = useState([])
    const [showRandomMarkers, setShowRandomMarkers] = useState(false)
    const [infoWindowContent, setInfoWindowContent] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setUserLocation({ lat: latitude, lng: longitude })
            })
        }
    }, [])

    const generateRandomLocations = () => {
        const randomLocations = []
        for (let i = 0; i < 5; i++) {
            const lat = userLocation.lat + (Math.random() - 0.5) * 0.05 // Pequeño desplazamiento aleatorio
            const lng = userLocation.lng + (Math.random() - 0.5) * 0.05 // Pequeño desplazamiento aleatorio
            randomLocations.push({ lat, lng })
        }
        setRandomLocations(randomLocations)
        setShowRandomMarkers(true) // Mostrar marcadores
    }
    const handleMarkerClick = (index) => {
        // Aquí puedes generar información aleatoria de restaurantes, hoteles o lugares pet-friendly
        const randomInfo = `Nombre del lugar: Lugar ${
            index + 1
        }\nTipo: Restaurante\nDescripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
        setInfoWindowContent(randomInfo)
    }
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    // Manejar la pulsación de la tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            generateRandomLocations()
        }
    }

    if (!isLoaded) return <div>"Loading Maps"</div>

    return (
        <div className="container">
            <NavBar />
            <Aside />
            <input
                name="location"
                id="location"
                className="input mt-20 border-2 border-gray-500 rounded-md m-2 placeholder-gray-600 focus:placeholder-gray-500 sm:w-full md:w-full lg:w-full xl:w-full "
                placeholder="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />{' '}
            {isLoaded && showRandomMarkers && (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={userLocation}
                    zoom={12}
                >
                    {randomLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={location}
                            onClick={() => handleMarkerClick(index)}
                        >
                            {infoWindowContent && (
                                <InfoWindow
                                    onCloseClick={() =>
                                        setInfoWindowContent(null)
                                    }
                                >
                                    <div>{infoWindowContent}</div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            )}
        </div>
    )
}
