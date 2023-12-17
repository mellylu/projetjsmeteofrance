import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineCaretUp, AiFillHeart } from "react-icons/ai";

import FavorisContext from "@/context/favorisCountryContext"

import styles from "./index.module.scss"

const Index = (props: { isVisible: any, setIsVisible: any, setIsVisibleIcon: any }) => {

    const { addFavoris, favoris } = useContext(FavorisContext)

    const router = useRouter()


    return (
        <div className={styles.div}>
            <AiOutlineCaretUp onClick={() => {
                props.setIsVisibleIcon(true)
                props.setIsVisible(false)
            }} style={{ marginRight: "auto", marginLeft: "auto", marginTop: "3%" }} size={15} color={"white"} />

            <div className={styles.divTitre}>
                <AiFillHeart color={"red"} size={40} style={{ marginRight: "2%" }} />
                <h1 className={styles.h1}>Météo Ville</h1>
            </div>
            <div className={styles.ligne}></div>
            {favoris.length > 0 ? favoris.map((el: any) => (
                <div className={styles.divElement} key={el}>
                    <button onClick={() => { router.push(`/${el}`) }}>
                        <p className={styles.pElement}>{decodeURIComponent(el)}</p>
                    </button>
                    <AiOutlineClose className={styles.croix} color={"black"} onClick={() => addFavoris(el)} />
                </div>
            )) : <p className={styles.p}>Pas de favoris trouvé</p>}
        </div>
    );
};

export default Index;