import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Favoris from '@/components/favoris';

const Index = () => {
    const router = useRouter();
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [forecast, setForecast] = useState<any[]>([]);

    useEffect(() => {
        const villeFromURL = window.location.pathname.split('/').pop();
        setVille(villeFromURL || '');

        if (villeFromURL) {
            fetchWeatherData(villeFromURL);
        }
    }, []);

    useEffect(() => {
        console.log(ville, "ville");
    }, [ville]);

    const fetchWeatherData = async (city: string) => {
        const apiKey = 'dcea80cba359684c8af702c1b42982ba';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const temperatureData = data.list[0].main.temp;
            setTemperature(temperatureData);

            const iconData = data.list[0].weather[0].icon;
            setIcon(iconData);

            // Extrayez ici les données de prévisions météorologiques pour les 7 prochains jours
            const forecastData = data.list.slice(1, 8).map((item: { main: { temp: any; }; weather: { icon: any; }[]; dt: any; }) => ({
                temperature: item.main.temp,
                icon: item.weather[0].icon,
                timestamp: item.dt,
            }));
            setForecast(forecastData);

            console.log('Données de la météo :', data);
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

                    {forecast.length > 0 && (
                        <div>
                            <h2>Prévisions des 7 prochains jours :</h2>
                            {forecast.map((forecastDay, index) => (
                                <div key={index}>
                                    <p>Jour {index + 1}: {forecastDay.temperature} °C</p>
                                    <img src={`https://openweathermap.org/img/wn/${forecastDay.icon}@4x.png`} alt="Weather Icon" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p>La ville n'est pas spécifiée dans l'URL.</p>
            )}
        </div>
    );
};

export default Index;
