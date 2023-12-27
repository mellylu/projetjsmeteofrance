import React, { useContext, useEffect } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import FavorisContext from "@/context/favorisCountryContext"

import Button from "@/components//button"

import styles from "./favoris.module.scss"




const Favoris = (props: { ville: any, isFavoris: any, setIsFavoris: any }) => {
    const { addFavoris, favoris, setIsExist, isExist } = useContext(FavorisContext)

    useEffect(() => {
        console.log(favoris, "FAVORIS")
        console.log(isExist, "isexiste")
        let test = false
        favoris.forEach(element => {
            if (element == props.ville) {
                test = true
            }
            // else {
            //     setIsExist(false)
            // }
            if (test) {
                setIsExist(true)
            }
        });

    }, [])

    // useEffect(() => {
    //     console.log("DDDDDDDDDDDDDDDDDDD")
    //     favoris.forEach(element => {
    //         if (element == props.ville) {
    //             setIsExist(true)
    //         }
    //         else {
    //             setIsExist(false)
    //         }
    //     });
    // }, [favoris])




    return (
        <div className={styles.divmain}>
            <Button
                onClick={() => {
                    addFavoris(props.ville)
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
