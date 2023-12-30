import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, Marker } from "@react-google-maps/api"

import BarButtons from "@/components/barButtons"
import TimeDayButton from "@/components/timeDayButton"
import MAPCONTAINERSTYLES from "@/utils/styleMap"
import { fetchDataFiveday } from "@/utils/fetchDataFiveDay"
import { dayChoice } from "@/utils/dayChoice";
import { timeDayChoice } from "@/utils/timeDayChoice";
import { weatherDescription } from "@/utils/weatherDescription";

import { chooseDate } from '@/utils/chooseDate';
import Graphique from "@/components/graphiques"

import OPTIONS from "@/utils/optionsMap"
import Favoris from '@/components/favoris';

import styles from "../index.module.scss"


export default function CityPage(props: { isLoaded: any }) {
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [donneesGraphique, setDonneesGraphique] = useState<any>([])
    const [isFavoris, setIsFavoris] = useState<any>(false)
    const [isError, setIsError] = useState<any>(false)

    const [hoverInfo, setHoverInfo] = useState({ show: false, x: 0, y: 0, ville: '', temperature: '', icon: '' });
    const [temps, setTemps] = useState<any>([])
    const [tempsFiveDay, setTempsFiveDay] = useState<any>([])
    const [previsionsDate, setPrevisionsDate] = useState<any>({})
    const [boutons, setBoutons] = useState<any>({})
    const router = useRouter()
    const [coordonnees, setCoordonnees] = useState<any>({})

    useEffect(() => {
        console.log(ville, "VILLLLLLLE")
        setIsError(false)
        setCoordonnees({ lat: Number(router.query.lat), lng: Number(router.query.lng) })
        setPrevisionsDate(chooseDate())
        setBoutons({
            bouton1: true,
            bouton2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
        })
        fetchDataFiveday(setTempsFiveDay, `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5&q=${ville}`)
    }, [ville])

    useEffect(() => {
        if (boutons.bouton1) { setTemps(dayChoice(tempsFiveDay, 0, tempsFiveDay[0]?.forecast[0]?.day)) }
        else if (boutons.bouton2) { setTemps(dayChoice(tempsFiveDay, 1, tempsFiveDay[0]?.forecast[1]?.day)) }
        else if (boutons.bouton3) { setTemps(dayChoice(tempsFiveDay, 2, tempsFiveDay[0]?.forecast[2]?.day)) }
        else if (boutons.bouton4) { setTemps(dayChoice(tempsFiveDay, 3, tempsFiveDay[0]?.forecast[3]?.day)) }
        else if (boutons.bouton5) { setTemps(dayChoice(tempsFiveDay, 4, tempsFiveDay[0]?.forecast[4]?.day)) }
        else if (boutons.bouton6) { setTemps(dayChoice(tempsFiveDay, 5, tempsFiveDay[0]?.forecast[5]?.day)) }
    }, [tempsFiveDay, boutons])

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

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop();
        console.log(villeFromURL, "VILLE FROM URL")
        // console.log(window.location.pathname.split('/').pop(), "HHHHHHHHHHH")
        setVille(villeFromURL || '');

        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
    }, []);

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop()
        setVille(villeFromURL || '')
        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
    }, [window.location.pathname.split('/').pop()])

    const fetchWeatherData = async (city: string) => {
        const apiKey = '6a55af2ae0d334e15b12191b3c7c86b5';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setDonneesGraphique(data.list)
            const temperatureData = data.list[0].main.temp;
            setTemperature(temperatureData);

            const iconData = data.list[0].weather[0].icon;
            setIcon(iconData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météo :', error);
        }
    };

    // console.log(tempsFiveDay)
    // console.log(daySelected)
    return (
        <main className={styles.main}>
            <div className={styles.map}>
                {ville ? (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "4%" }}>

                            <h1 className={styles.h1} style={{ marginRight: "2%" }} >METEO {decodeURIComponent(ville)}</h1>

                            {/* <div className={styles.favorisContainer}> */}
                            <Favoris ville={ville} isFavoris={isFavoris} setIsFavoris={setIsFavoris} setIsError={setIsError} />
                            {isError ? <p style={{ marginLeft: "2%", color: "red" }}><i>Impossible : nombre maximum de favoris atteins</i></p> : ""}
                        </div>
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
                        {temps && temperature !== null && icon !== null ? (
                            <div className={styles.rectangle}>

                                <div className={styles.zone1}>
                                    <p className={styles.temperature}>{temps[0]?.degres}°</p>

                                </div>
                                <div className={styles.zoneligne}></div>
                                <div className={styles.zone2}>
                                    <center>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${temps[0]?.temps}@4x.png`}
                                            alt="Weather Icon"
                                            className={styles.weatherIcon}
                                        />
                                    </center>
                                </div>

                            </div>
                        ) : <div style={{ marginLeft: "5%", marginTop: "5%" }}><p>Chargement de la température...</p></div>}

                        <div>
                            {donneesGraphique ? <Graphique donneesGraphique={donneesGraphique} />
                                : ""}
                        </div>
                        {coordonnees ?
                            (
                                <GoogleMap zoom={15} center={{ lat: 49.1198819, lng: -1.1131279 }} mapContainerClassName={styles.mapcontainer}>
                                    <Marker position={{ lat: 49.1198819, lng: -1.1131279 }} />
                                </GoogleMap>
                            )
                            : ""}



                    </div>
                ) : <div><p>La ville n'est pas spécifiée dans l'URL.</p></div>}
            </div>
        </main >
    );
};