import React, { useState, useEffect } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

import BarButtons from "@/components/barButtons"
import TimeDayButton from "@/components/timeDayButton"

import OPTIONS from "@/utils/optionsMap"
import MAPCONTAINERSTYLES from "@/utils/styleMap"
import { chooseDate } from "@/utils/chooseDate"
import { fetchDataFiveday } from "@/utils/fetchDataFiveDay"
import { dayChoice } from "@/utils/dayChoice"
import { weatherDescription } from "@/utils/weatherDescription"
import { timeDayChoice } from "@/utils/timeDayChoice"

import styles from "./index.module.scss"

export default function Index(props: { isLoaded: any }) {
    const [hoverInfo, setHoverInfo] = useState({ show: false, x: 0, y: 0, ville: '', temperature: '', icon: '' });
    const [temps, setTemps] = useState<any>([])
    const [tempsFiveDay, setTempsFiveDay] = useState<any>([])
    const [previsionsDate, setPrevisionsDate] = useState<any>({})
    const [boutons, setBoutons] = useState<any>({})
    const [daySelected, setDaySelected] = useState<any>("AUJOURD'HUI")
    const [buttonSelected, setButtonSelected] = useState<number>(0)
    const [timeDaySelected, setTimeDaySelected] = useState<any>({
        selected: 'matin',
        nuit: false,
        matin: false,
        apresMidi: false,
        soiree: false,
    })

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
        fetchDataFiveday(setTempsFiveDay, "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5")
    }, [])

    useEffect(() => {
        if (boutons.bouton1) { setTemps(dayChoice(tempsFiveDay, 0, tempsFiveDay[0]?.forecast[0]?.day)), setButtonSelected(0) }
        else if (boutons.bouton2) { setTemps(dayChoice(tempsFiveDay, 1, tempsFiveDay[0]?.forecast[1]?.day)), setButtonSelected(1) }
        else if (boutons.bouton3) { setTemps(dayChoice(tempsFiveDay, 2, tempsFiveDay[0]?.forecast[2]?.day)), setButtonSelected(2) }
        else if (boutons.bouton4) { setTemps(dayChoice(tempsFiveDay, 3, tempsFiveDay[0]?.forecast[3]?.day)), setButtonSelected(3) }
        else if (boutons.bouton5) { setTemps(dayChoice(tempsFiveDay, 4, tempsFiveDay[0]?.forecast[4]?.day)), setButtonSelected(4) }
        else if (boutons.bouton6) { setTemps(dayChoice(tempsFiveDay, 5, tempsFiveDay[0]?.forecast[5]?.day)), setButtonSelected(5) }
        const isNuit = tempsFiveDay[0]?.forecastNuit?.some((m: any) => m.day === tempsFiveDay[0]?.forecast[buttonSelected]?.day);
        const isMatin = tempsFiveDay[0]?.forecastMatin?.some((m: any) => m.day === tempsFiveDay[0]?.forecast[buttonSelected]?.day);
        const isApresMidi = tempsFiveDay[0]?.forecastApresMidi?.some((m: any) => m.day === tempsFiveDay[0]?.forecast[buttonSelected]?.day);
        const isSoiree = tempsFiveDay[0]?.forecastSoiree?.some((m: any) => m.day === tempsFiveDay[0]?.forecast[buttonSelected]?.day);

        let selected = 'soiree';
        if (isApresMidi) selected = 'apresMidi';
        if (isMatin) selected = 'matin';
        if (isNuit) selected = 'nuit';

        setTimeDaySelected({
            ...timeDaySelected,
            selected,
            nuit: isNuit,
            matin: isMatin,
            apresMidi: isApresMidi,
            soiree: isSoiree
        });
    }, [tempsFiveDay, boutons, buttonSelected])

    useEffect(() => {
        setTemps(timeDayChoice(timeDaySelected, temps))
    }, [timeDaySelected])

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
                    <h1 className={styles.h11}>METEO FRANCE</h1>
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
                    <div style={{ width: "100%", height: "120vh", marginTop: "1%" }}>
                        <GoogleMap
                            zoom={window.innerWidth > 780 ? 6 : 5}
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
                                        scaledSize: window.innerWidth > 780 ? new window.google.maps.Size(60, 60) : new window.google.maps.Size(40, 40),
                                        anchor: window.innerWidth > 780 ? new window.google.maps.Point(30, 30) : new window.google.maps.Point(20, 20),
                                    }}
                                    label={{
                                        text: `${v.degres}°`,
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
                            <TimeDayButton daySelected={daySelected} temps={temps} timeDaySelected={timeDaySelected} setTimeDaySelected={setTimeDaySelected} />
                        </GoogleMap>
                    </div>
                </div>
            </main>
        </>
    )
}
