import React, { useState } from "react"
import Button from "../button"
import styles from "./index.module.scss"
import COORDONNEES_REGION from "@/utils/coordonnees_region"
import axios from "axios"

const Index = (props: {
    boutons: any
    setBoutons: any
    dateAujourdhui: string
    dateDemain: string
    datePlus2: string
    datePlus3: string
    datePlus4: string
    datePlus5: string
    datePlus6: string
    setTemps: any
}) => {
    const previsions = (date: string) => {
        const fetchData = async () => {
            try {
                const requests = COORDONNEES_REGION.map(async element => {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lng}&date=${date}&units=metric&appid=95ac755812151c92c3f2191d0124d8d2`,
                    )
                    return {
                        lat: element.lat,
                        lng: element.lng,
                        temps: response.data.weather[0].icon,
                        degres: Math.floor(response.data.main.temp),
                    }
                })

                const results = await Promise.all(requests)
                props.setTemps(results)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }
    return (
        <div className={styles.button}>
            <Button
                className={props.boutons.bouton1 ? styles.buttonClic : styles.buttonNonClic}
                title="AUJOURD'HUI"
                onClick={() => {
                    props.setBoutons({
                        bouton1: true,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: false,
                        bouton6: false,
                        bouton7: false,
                    })
                    previsions(props.dateAujourdhui)
                }}
            />

            <Button
                className={props.boutons.bouton2 ? styles.buttonClic : styles.buttonNonClic}
                title="DEMAIN"
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: true,
                        bouton3: false,
                        bouton4: false,
                        bouton5: false,
                        bouton6: false,
                        bouton7: false,
                    })
                    previsions(props.dateDemain)
                }}
            />
            <Button
                className={props.boutons.bouton3 ? styles.buttonClic : styles.buttonNonClic}
                title={`${props.datePlus2}`}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: true,
                        bouton4: false,
                        bouton5: false,
                        bouton6: false,
                        bouton7: false,
                    })
                    previsions(props.datePlus2)
                }}
            />
            <Button
                className={props.boutons.bouton4 ? styles.buttonClic : styles.buttonNonClic}
                title={`${props.datePlus3}`}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: true,
                        bouton5: false,
                        bouton6: false,
                        bouton7: false,
                    })
                    previsions(props.datePlus3)
                }}
            />
            <Button
                className={props.boutons.bouton5 ? styles.buttonClic : styles.buttonNonClic}
                title={`${props.datePlus4}`}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: true,
                        bouton6: false,
                        bouton7: false,
                    })
                    previsions(props.datePlus4)
                }}
            />
            <Button
                className={props.boutons.bouton6 ? styles.buttonClic : styles.buttonNonClic}
                title={`${props.datePlus5}`}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: false,
                        bouton6: true,
                        bouton7: false,
                    })
                    previsions(props.datePlus5)
                }}
            />
            <Button
                className={props.boutons.bouton7 ? styles.buttonClic : styles.buttonNonClic}
                title={`${props.datePlus6}`}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: false,
                        bouton6: false,
                        bouton7: true,
                    })
                    previsions(props.datePlus6)
                }}
            />
        </div>
    )
}

export default Index