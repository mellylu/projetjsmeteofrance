import React, { useContext, useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import FavorisContext from "@/context/favorisCountryContext"

import Button from "@/components//button"

import styles from "./favoris.module.scss"
import { elements } from "chart.js"




const Favoris = (props: { ville: any, lat: any, lng: any, isFavoris: any, setIsFavoris: any, setIsError: any }) => {
    const { addFavoris, favoris, setIsExist, isExist, count } = useContext(FavorisContext)


    useEffect(() => {
        let test = false
        favoris.forEach((element: any) => {
            if (element.ville == props.ville) {
                test = true
            }
            if (test) {
                setIsExist(true)
            }
        });

    }, [])

    const ajouterFavoris = () => {
        if (isExist) {
            addFavoris(props.ville, props.lat, props.lng)
        }
        else {
            if (count < 15) {
                props.setIsError(false)
                addFavoris(props.ville, props.lat, props.lng)
            }
            else {
                props.setIsError(true)
            }
        }

    }




    return (
        <div className={styles.divmain}>
            <Button
                onClick={() => {
                    ajouterFavoris()

                }}
            >
                {isExist ? (
                    <div>
                        <AiFillHeart color={"red"} size={25} />
                    </div>
                ) : (
                    <div>
                        <AiOutlineHeart color={"red"} size={25} />
                    </div>
                )}
            </Button>

        </div>
    )
}

export default Favoris
