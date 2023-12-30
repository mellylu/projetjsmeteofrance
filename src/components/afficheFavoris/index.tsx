import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineCaretUp, AiFillHeart } from "react-icons/ai";

import FavorisContext from "@/context/favorisCountryContext"

import styles from "./index.module.scss"
import { fetchData } from '@/utils/fetchData';

const Index = (props: { isVisible: any, setIsVisible: any, setIsVisibleIcon: any }) => {

    const { addFavoris, favoris, setIsExist, isExist } = useContext(FavorisContext)
    const [diplayContent, setDisplayContent] = React.useState(false)

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
        let test = false
        favoris.forEach(element => {
            if (element == el) {
                console.log("element", element)
                console.log("el", el)
                test = true
            }

        })
        if (test) {
            setIsExist(true)
        }
        router.push(`/${el}`)
    }

    return (
        <div id="animateWidth" className={`${styles.div} ${props.isVisible ? styles.animateWidth : ''}`}>
            <div className={`${diplayContent ? '' : styles.dnone}`}>
                <div className={styles.divTitre}>
                    <AiFillHeart color={"red"} size={40} style={{ marginRight: "2%" }} />
                    <h1 className={styles.h1}>Météo Ville</h1>
                </div>
                <div className={styles.ligne}></div>
                {favoris.length > 0
                    ?
                    favoris.map((el: any) => {
                        const [data, setData] = useState<any>([])
                        console.log(decodeURIComponent(el))
                        if (data?.length === 0) fetchData(setData, `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&appid=948e5e0ea47173ccfc3a38ae11dc092e&q=${decodeURIComponent(el)}`);
                        console.log(data)
                        return (<div className={styles.divElement} key={el}>
                            <button onClick={() => {
                                router.push(`/${el}`)
                            }}>
                                <p className={styles.pElement}>{decodeURIComponent(el)}</p>
                            </button>
                            <div>
                                <img
                                    src={`https://openweathermap.org/img/wn/${data.temps}@4x.png`}
                                    alt="Green double couch with wooden legs"
                                    width={60}
                                    height={60}
                                />
                                <p className={styles.pDegres}>{data.degres}°</p>
                            </div>
                        </div>
                        )
                    })
                    :
                    <p className={styles.p}>Pas de favoris trouvé</p>
                }
            </div>
        </div>
    );
};

export default Index;
