import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import BarButtons from "@/components/barButtons"
import { fetchDataFiveday } from "@/utils/fetchDataFiveDay"
import { dayChoice } from "@/utils/dayChoice";
import { chooseDate } from '@/utils/chooseDate';
import Graphique from "@/components/graphiques"
import Favoris from '@/components/favoris';
import styles from "../index.module.scss"
import EmplacementVille from "@/components/emplacementVille"
import { enqueueSnackbar } from 'notistack';


export default function CityPage(props: { isLoaded: any }) {
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [donneesGraphique, setDonneesGraphique] = useState<Array<object>>([])
    const [isFavoris, setIsFavoris] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [temps, setTemps] = useState<any>([])
    const [tempsFiveDay, setTempsFiveDay] = useState<any>([])
    const [previsionsDate, setPrevisionsDate] = useState<any>({})
    const [boutons, setBoutons] = useState<any>({})
    const router = useRouter()
    const [coordonnees, setCoordonnees] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    const [daySelected, setDaySelected] = useState<string>("AUJOURD'HUI")

    useEffect(() => {
        setIsError(false)
        setPrevisionsDate(chooseDate())
        setBoutons({
            bouton1: true,
            bouton2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
        })
        if (ville.length > 0) fetchDataFiveday(setTempsFiveDay, `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5&q=${ville}`)
    }, [ville])

    useEffect(() => {
        console.log(previsionsDate, "boutons")
    }, [previsionsDate])

    useEffect(() => {
        if (boutons.bouton1) { setTemps(dayChoice(tempsFiveDay, 0, tempsFiveDay[0]?.forecast[0]?.day)) }
        else if (boutons.bouton2) { setTemps(dayChoice(tempsFiveDay, 1, tempsFiveDay[0]?.forecast[1]?.day)) }
        else if (boutons.bouton3) { setTemps(dayChoice(tempsFiveDay, 2, tempsFiveDay[0]?.forecast[2]?.day)) }
        else if (boutons.bouton4) { setTemps(dayChoice(tempsFiveDay, 3, tempsFiveDay[0]?.forecast[3]?.day)) }
        else if (boutons.bouton5) { setTemps(dayChoice(tempsFiveDay, 4, tempsFiveDay[0]?.forecast[4]?.day)) }
        else if (boutons.bouton6) { setTemps(dayChoice(tempsFiveDay, 5, tempsFiveDay[0]?.forecast[5]?.day)) }
    }, [tempsFiveDay, boutons])

    useEffect(() => {
        setCoordonnees({ lat: Number(router.query.lat), lng: Number(router.query.lng) })
        const villeFromURL = window.location.pathname.split('/').pop();
        setVille(villeFromURL || '');

        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
    }, []);


    useEffect(() => {
        setCoordonnees({ lat: Number(router.query.lat), lng: Number(router.query.lng) })
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
            enqueueSnackbar("La requete météo a échoué : " + error, { variant: "error" })
        }
    };

    const memoizedGraphique = useMemo(() => <Graphique donneesGraphique={donneesGraphique} />, [donneesGraphique]);

    return (
        <main className={styles.main}>

            <div className={styles.map2}>
                {ville ? (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "2%" }}>

                            <h1 className={styles.h1} style={{ marginRight: "2%" }} >METEO {decodeURIComponent(ville)}</h1>

                            <Favoris ville={ville} isFavoris={isFavoris} setIsFavoris={setIsFavoris} setIsError={setIsError} lat={coordonnees.lat} lng={coordonnees.lng} />
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
                            setDaySelected={setDaySelected}
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
                        ) : <div style={{ marginLeft: "5%", marginTop: "3%" }}><p>Chargement de la température...</p></div>}

                        <div style={{ marginTop: "2%" }}>
                            {donneesGraphique ? memoizedGraphique
                                : ""}
                        </div>
                        <EmplacementVille isLoaded={props.isLoaded} coordonnees={coordonnees} />


                    </div>
                ) : <div><p>La ville n'est pas spécifiée dans l'URL.</p></div>}
            </div>

        </main >
    );
};