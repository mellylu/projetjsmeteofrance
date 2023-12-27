import React, { useContext, useEffect } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import FavorisContext from "@/context/favorisCountryContext"

import Button from "@/components//button"

import styles from "./favoris.module.scss"




const Favoris = (props: { ville: any }) => {
    const { addFavoris, favoris, setIsExist, isExist } = useContext(FavorisContext)

    useEffect(() => {
        console.log(favoris)
        favoris.forEach(element => {
            if (element == props.ville) {
                setIsExist(true)
            }
        });
    }, [])


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
