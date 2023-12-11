import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Favoris from '@/components/favoris';

const Index = () => {
    const router = useRouter();
    const [ville, setVille] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);

    useEffect(() => {
        // Obtenez la dernière partie de l'URL en tant que ville
        const villeFromURL = window.location.pathname.split('/').pop();

        // Mettez à jour l'état de la ville
        setVille(villeFromURL || '');

        // Vous pouvez également ajouter une condition pour ne faire la requête API que si villeFromURL est défini
        if (villeFromURL) {
            // Appeler votre API avec la villeFromURL ici
            fetchWeatherData(villeFromURL);
        }
    }, []);

    const fetchWeatherData = async (city: string) => {
        const apiKey = 'dcea80cba359684c8af702c1b42982ba';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extraire la température de la première entrée de la liste des prévisions
            const temperatureData = data.list[0].main.temp;
            setTemperature(temperatureData);

            // Extraire l'icône de la première entrée de la liste des prévisions
            const iconData = data.list[0].weather[0].icon;
            setIcon(iconData);

            // Faites quelque chose avec les données de la météo
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
                </div>
            ) : (
                <p>La ville n'est pas spécifiée dans l'URL.</p>
            )}
        </div>
    );
};

export default Index;
