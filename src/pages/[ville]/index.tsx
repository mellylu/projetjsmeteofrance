import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Favoris from '@/components/favoris';
import Graphique from "@/components/graphiques"


const Index = () => {
    const router = useRouter();
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [donneesGraphique, setDonneesGraphique] = useState<any>([])

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop();
        console.log(window.location.pathname.split('/').pop(), "HHHHHHHHHHH")
        setVille(villeFromURL || '');

        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
    }, []);

    useEffect(() => {
        // console.log(ville, "ville")
    }, [ville])

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop()
        setVille(villeFromURL || '')
        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
        console.log("FFFFFFFFFFF")
    }, [window.location.pathname.split('/').pop()])

    const fetchWeatherData = async (city: string) => {
        const apiKey = 'dcea80cba359684c8af702c1b42982ba';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setDonneesGraphique(data.list)
            const temperatureData = data.list[0].main.temp;
            setTemperature(temperatureData);

            const iconData = data.list[0].weather[0].icon;
            setIcon(iconData);

            // console.log('Données de la météo :', data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météo :', error);
        }
    };

    return (
        <div>
            {ville ? (
                <div>
                    <h1>AFFICHER METEO VILLE {ville}</h1>
                    <Favoris ville={ville} />

                    {temperature !== null && icon !== null ? (
                        <div>
                            <p>Température actuelle : {temperature} °C</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
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

export default Index;
