import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineCaretUp, AiFillHeart } from "react-icons/ai";

import FavorisContext from "@/context/favorisCountryContext"

import styles from "./index.module.scss"

const Index = (props: { isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>, setIsVisibleIcon: (x: boolean) => void }) => {

    const { addFavoris, favoris, setIsExist, isExist, isVisibleIcon, setIsVisibleIcon } = useContext(FavorisContext)
    const [diplayContent, setDisplayContent] = React.useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (props.isVisible) {
            setTimeout(() => {
                setDisplayContent(true)
            }, 500)
        } else {
            setDisplayContent(false)
        }
    }, [props.isVisible])

    const clickVille = (el: any) => {
        console.log("type of el", typeof el)
        let test = false
        favoris.forEach(element => {
            if (element == el) {
                test = true
            }

        })
        if (test) {
            setIsExist(true)
        }
        router.push(`/${el.ville}?lat=${el.lat}&lng=${el.lng}`)
        props.setIsVisible(false)
        setIsVisibleIcon(true)
    }

    return (
        <div id="animateWidth" className={`${styles.div} ${props.isVisible ? styles.animateWidth : ''}`}>
            <div className={`${diplayContent ? '' : styles.dnone}`}>
                <div className={styles.divTitre}>
                    <AiFillHeart color={"red"} size={40} style={{ marginRight: "2%" }} />
                    <h1 className={styles.h1}>Météo Ville</h1>
                </div>
                <div className={styles.ligne}></div>
                {favoris.length > 0 ? favoris.map((el: any) => (
                    <div className={styles.divElement} key={el.ville}>
                        <button onClick={() => clickVille(el)}>
                            <p className={styles.pElement}>{decodeURIComponent(el.ville)}</p>
                        </button>
                        {/* <AiOutlineClose className={styles.croix} color={"black"} onClick={() => addFavoris(el)} /> */}
                    </div>
                )) : <p className={styles.p}>Pas de favoris trouvé</p>}
            </div>
        </div>
    );
};

export default Index;
