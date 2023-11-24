import Head from "next/head"
import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, Polygon, OverlayView } from "@react-google-maps/api"
import axios from "axios"

import Navbar from "@/components/navbar"
import BarButtons from "@/components/barButtons"
import Button from "@/components/button"

import COORDONNEES_REGION from "@/utils/coordonnees_region"
import OPTIONS from "@/utils/optionsMap"
import MAPCONTAINERSTYLES from "@/utils/styleMap"
import { chooseDate } from "@/utils/chooseDate"

import styles from "./index.module.scss"
import { Flex } from "@chakra-ui/react"

export default function Index() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}

function Map() {
    const [temps, setTemps] = useState<any>([])
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

        const fetchData = async () => {
            try {
                const requests = COORDONNEES_REGION.map(async element => {
                    const response = await axios.get(
                        // `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lng}&date=2023-11-21&units=metric&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                        `https://api.openweathermap.org/data/2.5/weather?q=${element.ville}&units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                    )
                    if (response.data.name === 'Brest') return {
                        lat: element.lat,
                        lng: element.lng,
                        temps: response.data.weather[0].icon,
                        degres: Math.floor(response.data.main.temp),
                        ville: response.data.name,
                    }
                    else return {
                        lat: response.data.coord.lat,
                        lng: response.data.coord.lon,
                        temps: response.data.weather[0].icon,
                        degres: Math.floor(response.data.main.temp),
                        ville: response.data.name,
                    }
                })

                const results = await Promise.all(requests)

                setTemps(results)
            } catch (error) {
                console.error(error)
            }
        }

        interface DailyInfo {
            [key: string]: {
              temps: number[];
              weather: string[];
            };
          }
          

        const fetchDataFiveday = async () => {
            try {
                const requests = COORDONNEES_REGION.map(async element => {
                    const response = await axios.get(
                        // `https://api.openweathermap.org/data/2.5/forecast?lat=${element.lat}&lon=${element.lng}&date=2023-11-21&units=metric&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                        `https://api.openweathermap.org/data/2.5/forecast?q=${element.ville}&units=metric&lang=fr&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                        )
                    const dailyInfo: DailyInfo = {};
                        
                    // Regroupe les températures par jour
                    response.data.list.forEach((item: { dt: number; main: { temp: any }; weather: {icon:string}[] }) => {
                        const date = new Date(item.dt * 1000);
                        const day = date.toISOString().split('T')[0]; // Récupère la date au format YYYY-MM-DD
                        if (!dailyInfo[day]) {
                            dailyInfo[day] = {
                                temps: [],
                                weather: []
                              };
                        }
                        dailyInfo[day].temps.push(item.main.temp);
                        dailyInfo[day].weather.push(item.weather[0].icon);
                    });

                    // Calcule la moyenne des températures et icônes pour chaque jour
                    const dailyAverages = Object.keys(dailyInfo).map(day => {
                        // Température
                      const temps = dailyInfo[day].temps;
                      const sum = temps.reduce((a, b) => a + b, 0);
                      const average = Math.floor(sum / temps.length);
                        // Icône
                      const icons = dailyInfo[day].weather
                      let dayIcon = icons.filter((icon)=>icon.includes('d'))
                      if (dayIcon.length === 0) dayIcon = icons
                      const getMostFrequentIcon = (dayIcon: any[]) => {
                        // Compter la fréquence de chaque icône
                        const counts = dayIcon.reduce((acc, icon) => {
                          acc[icon] = (acc[icon] || 0) + 1;
                          return acc;
                        }, {});
                        // Trouver l'icône la plus fréquente
                        let mostFrequentIcon = dayIcon[0];
                        let maxCount = 1; // Nous commençons à 1 car une icône apparaît au moins une fois
                      
                        for (const icon of Object.keys(counts)) {
                          if (counts[icon] > maxCount) {
                            mostFrequentIcon = icon;
                            maxCount = counts[icon];
                          }
                        }
                        // Si aucune icône n'apparaît plus de deux fois, `mostFrequentIcon` restera le premier élément
                        return mostFrequentIcon;
                      };
                      const icon = getMostFrequentIcon(dayIcon)
                      return { day, average, icon };
                    });

                    if (response.data.name === 'Brest') return {
                        ville: response.data.city.name,
                        lat: element.lat,
                        lng: element.lng,
                        forecast: dailyAverages
                    }
                    else return {
                        ville: response.data.city.name,
                        lat: response.data.city.coord.lat,
                        lng: response.data.city.coord.lon,
                        forecast: dailyAverages
                    }
                })

                const results = await Promise.all(requests)

                setTempsFiveDay(results)
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataFiveday()
        fetchData()
    }, [])

    const test = async () => {
        console.log(tempsFiveDay);
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

                        {temps
                            ? temps.map((v: any, k: any) => (
                                  <div key={k}>
                                      {/* <Marker position={{ lat: v.lat, lng: v.lng }} /> */}
                                      <OverlayView
                                          position={{ lat: v.lat, lng: v.lng }}
                                          mapPaneName={OverlayView.OVERLAY_LAYER}
                                          getPixelPositionOffset={(width, height) => ({
                                              x: -30,
                                              y: -30,
                                          })}
                                      >
                                          <img
                                              src={`https://openweathermap.org/img/wn/${v.temps}@4x.png`}
                                              alt="Green double couch with wooden legs"
                                              width={60}
                                              height={60}
                                          />
                                      </OverlayView>
                                      <OverlayView
                                          key={k}
                                          position={{ lat: v.lat, lng: v.lng }}
                                          mapPaneName={OverlayView.OVERLAY_LAYER}
                                          getPixelPositionOffset={(width, height) => ({
                                              x: 10,
                                              y: -30,
                                          })}
                                      >
                                          <Flex>
                                              <p className={styles.degres}>
                                                  {v.degres.toString()}°
                                              </p>
                                          </Flex>
                                      </OverlayView>
                                  </div>
                              ))
                            : ""}
                    </GoogleMap>
                </div>
            </main>
        </>
    )
}
