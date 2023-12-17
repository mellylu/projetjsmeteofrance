import React from "react"

import Button from "@/components//button"

import styles from "./index.module.scss"

const Index = (props: {
    boutons: any
    setBoutons: any
    dateAujourdhui: string
    dateDemain: string
    datePlus2: string
    datePlus3: string
    datePlus4: string
    datePlus5: string
    setTemps: any
}) => {

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short', // 'short' = lun.
            day: 'numeric', // 'numeric' = 10
            month: 'short', // 'short' = nov.
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    };

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
                    })
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
                    })
                }}
            />
            <Button
                className={props.boutons.bouton3 ? styles.buttonClic : styles.buttonNonClic}
                title={formatDate(props.datePlus2)}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: true,
                        bouton4: false,
                        bouton5: false,
                        bouton6: false,
                    })
                }}
            />
            <Button
                className={props.boutons.bouton4 ? styles.buttonClic : styles.buttonNonClic}
                title={formatDate(props.datePlus3)}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: true,
                        bouton5: false,
                        bouton6: false,
                    })
                }}
            />
            <Button
                className={props.boutons.bouton5 ? styles.buttonClic : styles.buttonNonClic}
                title={formatDate(props.datePlus4)}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: true,
                        bouton6: false,
                    })
                }}
            />
            <Button
                className={props.boutons.bouton6 ? styles.buttonClic : styles.buttonNonClic}
                title={formatDate(props.datePlus5)}
                onClick={() => {
                    props.setBoutons({
                        bouton1: false,
                        bouton2: false,
                        bouton3: false,
                        bouton4: false,
                        bouton5: false,
                        bouton6: true,
                    })
                }}
            />
        </div>
    )
}

export default Index
