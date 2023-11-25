import Head from "next/head"
import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, OverlayView, Marker } from "@react-google-maps/api"
import axios from "axios"

import Navbar from "@/components/navbar"
import BarButtons from "@/components/barButtons"
import Button from "@/components/button"

import OPTIONS from "@/utils/optionsMap"
import MAPCONTAINERSTYLES from "@/utils/styleMap"
import { chooseDate } from "@/utils/chooseDate"
import { fetchDataFiveday } from "@/utils/fetchDataFiveDay"
import { dayChoice } from "@/utils/dayChoice"
import { fetchData } from "@/utils/fetchData"

import styles from "./index.module.scss"
import { Flex } from "@chakra-ui/react"
import { weatherDescription } from "@/utils/weatherDescription"

export default function Index() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}

function Map() {
    const [temps, setTemps] = useState<any>([])
    const [actualTemp, setActualTemp] = useState<any>([])
    const [tempsFiveDay, setTempsFiveDay] = useState<any>([])
    const [previsionsDate, setPrevisionsDate] = useState<any>({})
    const [boutons, setBoutons] = useState<any>({})

    useEffect(() => {
        setPrevisionsDate(chooseDate())
        setBoutons({
            bouton1: true,
            bouton2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
        })
        fetchDataFiveday(setTempsFiveDay)
        fetchData(setActualTemp)
    }, [])

    useEffect(() => {
        if (boutons.bouton1) setTemps(actualTemp)
        else if (boutons.bouton2) setTemps(dayChoice(tempsFiveDay, 1))
        if (boutons.bouton3) setTemps(dayChoice(tempsFiveDay, 2))
        if (boutons.bouton4) setTemps(dayChoice(tempsFiveDay, 3))
        if (boutons.bouton5) setTemps(dayChoice(tempsFiveDay, 4))
        if (boutons.bouton6) setTemps(dayChoice(tempsFiveDay, 5))
    }, [actualTemp, boutons])

    const test = async () => {
        console.log(tempsFiveDay)
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=49.6339308&lon=-1.622137&date=2023-11-21&exclude=current,minutely,hourly&units=metric&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                // `https://api.openweathermap.org/data/2.5/onecall?lat=49.6339308&lon=-1.622137&units=metric&exclude=current,minutely,hourly&appid=95ac755812151c92c3f2191d0124d8d2`,
            )
            .then((data: any) => {
                console.log(data)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    const options = {
        styles: [
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "black",
                    },
                ],
            },
            // Enlever les noms des villes et pays
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "on",
                    },
                ],
            },
            // Masquer les routes et les lignes
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {
                        visibility: "on",
                    },
                ],
            },
        ],
        draggable: true,
        zoomControl: true,
        disableDefaultUI: true,
    }

    const [hoverInfo, setHoverInfo] = useState({ show: false, x: 0, y: 0, ville: '', temperature: '', icon: '' });

    const handleMouseOver = (e: any, ville: string, temperature: any, icon: string) => {
        // Positionnement de la boîte d'informations par rapport au marqueur
        const x = e.domEvent.x;
        const y = e.domEvent.y;
        // const x = e.pageX;
        // const y = e.pageY;
        setHoverInfo({
            show: true,
            x,
            y,
            ville,
            temperature,
            icon,
        });
    };

    const handleMouseLeave = () => {
        setHoverInfo({ ...hoverInfo, show: false });
    };

    return (
        <>
            <Head>
                <title>Météo Pas France</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <Button
                title="TEST"
                onClick={() => {
                    test()
                }}
            />
            <main className={styles.main}>
                <div className={styles.map}>
                    <h1 className={styles.h1}>METEO FRANCE</h1>
                    <BarButtons
                        boutons={boutons}
                        setBoutons={setBoutons}
                        dateAujourdhui={previsionsDate.datePlus0}
                        dateDemain={previsionsDate.datePlus1}
                        datePlus2={previsionsDate.datePlus2}
                        datePlus3={previsionsDate.datePlus3}
                        datePlus4={previsionsDate.datePlus4}
                        datePlus5={previsionsDate.datePlus5}
                        setTemps={setTemps}
                    />
                    <GoogleMap
                        zoom={6}
                        center={{ lat: 46.6167, lng: 1.85 }}
                        mapContainerStyle={MAPCONTAINERSTYLES}
                        options={OPTIONS}
                    >
                        {/* <OverlayView
                            position={{ lat: 49.6337308, lng: -1.622137 }}
                            mapPaneName={OverlayView.OVERLAY_LAYER}
                        >
                            <div style={{ width: 100 }}>
                                <p>Matin</p>
                                <p>Après midi</p>
                                <p>Soirée</p>
                            </div>
                        </OverlayView> */}

                        {temps && temps.map((v: any, k: any) => (
                            <Marker
                                key={k}
                                position={{ lat: v.lat, lng: v.lng }}
                                icon={{
                                    url: `https://openweathermap.org/img/wn/${v.temps}@2x.png`,
                                    scaledSize: new window.google.maps.Size(60, 60), // Taille de l'image
                                    anchor: new window.google.maps.Point(30, 30) // Le point d'ancrage au bas de l'image
                                }}
                                label={{
                                    text: `${v.degres}°`, // Texte à afficher sur le marqueur
                                    fontWeight: '500',
                                    className: styles.marker__label
                                }}
                                onMouseOver={(e) => handleMouseOver(e, v.ville, v.degres, v.temps)}
                                onMouseOut={handleMouseLeave}
                            />
                        ))}
                        {hoverInfo.show && (
                            <div
                                style={{
                                    left: hoverInfo.x,
                                    top: hoverInfo.y,
                                }}
                                className={styles.overlay}
                            >
                                <div>{hoverInfo.ville}</div>
                                <div className={styles.overlay__container}>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${hoverInfo.icon}@4x.png`}
                                        alt="Green double couch with wooden legs"
                                        width={60}
                                        height={60}
                                    />
                                    <div className={styles.ovelay__temp}>{hoverInfo.temperature}°</div>
                                </div>
                                <div>{weatherDescription(hoverInfo.icon)}</div>
                            </div>
                        )}
                    </GoogleMap>
                </div>
            </main>
        </>
    )
}
