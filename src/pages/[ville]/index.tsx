import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Favoris from '@/components/favoris';
import Graphique from "@/components/graphiques"


const Index = () => {
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [donneesGraphique, setDonneesGraphique] = useState<any>([])
    const [isFavoris, setIsFavoris] = useState<any>(false)

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop();
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
        } catch (error) {
            console.error('Erreur lors de la récupération des données météo :', error);
        }
    };

    return (
        <div>
            {ville ? (
                <div>
                    <h1>AFFICHER METEO VILLE {ville}</h1>
                    <Favoris ville={ville} isFavoris={isFavoris} setIsFavoris={setIsFavoris} />

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
