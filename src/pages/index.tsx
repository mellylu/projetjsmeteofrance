import React, { useState, useEffect } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

import BarButtons from "@/components/barButtons"

import OPTIONS from "@/utils/optionsMap"
import MAPCONTAINERSTYLES from "@/utils/styleMap"
import { chooseDate } from "@/utils/chooseDate"
import { fetchDataFiveday } from "@/utils/fetchDataFiveDay"
import { dayChoice } from "@/utils/dayChoice"
import { fetchData } from "@/utils/fetchData"

import styles from "./index.module.scss"
import { weatherDescription } from "@/utils/weatherDescription"
import TimeDayButton from "@/components/timeDayButton"

export default function Index(props: { isLoaded: any }) {
    const [temps, setTemps] = useState<any>([])
    const [actualTemp, setActualTemp] = useState<any>([])
    const [tempsFiveDay, setTempsFiveDay] = useState<any>([])
    const [previsionsDate, setPrevisionsDate] = useState<any>({})
    const [boutons, setBoutons] = useState<any>({})
    const [daySelected, setDaySelected] = useState<any>("AUJOURD'HUI")

    useEffect(() => {
        console.log("loaded", props.isLoaded)
        setPrevisionsDate(chooseDate())
        setBoutons({
            bouton1: true,
            bouton2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
        })
        fetchDataFiveday(setTempsFiveDay, "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5")
        fetchData(setActualTemp)
    }, [])

    useEffect(() => {
        if (boutons.bouton1) setTemps(dayChoice(tempsFiveDay, 0))
        else if (boutons.bouton2) setTemps(dayChoice(tempsFiveDay, 1))
        if (boutons.bouton3) setTemps(dayChoice(tempsFiveDay, 2))
        if (boutons.bouton4) setTemps(dayChoice(tempsFiveDay, 3))
        if (boutons.bouton5) setTemps(dayChoice(tempsFiveDay, 4))
        if (boutons.bouton6) setTemps(dayChoice(tempsFiveDay, 5))
    }, [actualTemp, boutons])

    const [hoverInfo, setHoverInfo] = useState({ show: false, x: 0, y: 0, ville: '', temperature: '', icon: '' });

    const handleMouseOver = (e: any, ville: string, temperature: any, icon: string) => {
        const x = e.domEvent.x;
        const y = e.domEvent.y;
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
                        setDaySelected={setDaySelected}
                    />
                    <GoogleMap
                        zoom={6}
                        center={{ lat: 46.6167, lng: 1.85 }}
                        mapContainerStyle={MAPCONTAINERSTYLES}
                        options={OPTIONS}
                    >
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
                        <TimeDayButton daySelected={daySelected} />
                    </GoogleMap>
                </div>
            </main>
        </>
    )
}
