import React from "react"
import { GoogleMap, useLoadScript, Marker, Polygon } from "@react-google-maps/api"

import styles from "./index.module.scss"

export default function Index(props: { localization?: any }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}

function Map() {
    const mapStyles = {
        height: "100vh",
        width: "100%",
        styles: [
            // Couleur de la bordure pour les autres pays
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#9f420f",
                    },
                ],
            },
            //enlever les noms des villes et pays
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            //Masquer les routes et les lignes
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
        ],
    }

    return (
        <GoogleMap
            zoom={6}
            center={{ lat: 46.6167, lng: 1.85 }}
            mapContainerStyle={mapStyles}
            options={{ styles: mapStyles.styles }}
        ></GoogleMap>
    )
}
