import React, { useEffect } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api"
import styles from "./index.module.scss"

const Index = (props: { isLoaded: boolean, coordonnees: object }) => {
    if (!props.isLoaded) return <div>Loading...</div>
    return <Map coordonnees={props.coordonnees} />

};

export default Index;


function Map(props: { coordonnees: any }) {
    return (
        <div className={styles.map}>
            <GoogleMap zoom={11} center={props.coordonnees} mapContainerClassName={styles.mapcontainer}>
                <Marker
                    key={props.coordonnees.lat}
                    position={props.coordonnees}
                />
            </GoogleMap>
        </div>
    );
}
