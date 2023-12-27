import React, { useState, useEffect } from 'react';
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




export default function CityPage(props: { isLoaded: any }) {
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [donneesGraphique, setDonneesGraphique] = useState<any>([])

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
        fetchDataFiveday(setTempsFiveDay, `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5&q=${ville}`)
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
        if (isNuit) selected = 'nuit';
        if (isApresMidi) selected = 'apresMidi';
        if (isMatin) selected = 'matin';

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
        // Votre logique pour mettre à jour les prévisions en fonction des boutons et des jours sélectionnés
    }, [tempsFiveDay, boutons, buttonSelected]);

    useEffect(() => {
        setTemps(timeDayChoice(timeDaySelected, temps));
    }, [timeDaySelected]);

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
        console.log(window.location.pathname.split('/').pop(), "HHHHHHHHHHH")
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

    console.log(tempsFiveDay)
    console.log(daySelected)
    return (

        <div>
            {ville ? (
                <div>
                    <h1>AFFICHER METEO VILLE {ville}</h1>
                    <Favoris ville={ville} />
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
                    {temperature !== null && icon !== null ? (
                        <div>
                            <p>Température : {temps[0]?.degres} °C </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${temps[0]?.temps}@4x.png`}
                                alt="Weather Icon"
                            />
                        </div>
                    ) : (
                        <p>Chargement de la température...</p>
                    )}
                </div>
            ) : (
                <p>La ville n'est pas spécifiée dans l'URL.</p>
            )}
            {donneesGraphique ? <Graphique donneesGraphique={donneesGraphique} />
                : ""}
        </div>

    );
};