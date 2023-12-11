import React, { useContext } from 'react';

import { AiFillHeart } from "react-icons/ai"
import FavorisContext from "@/context/favorisCountryContext"
import { AiOutlineClose } from "react-icons/ai";
import styles from "./index.module.scss"

const Index = (props: { isVisible: any, setIsVisible: any }) => {
    const { favoris } = useContext(FavorisContext)


    return (
        <div className={styles.div}>
            <h1 className={styles.h1}>liste de favoris</h1>

            {favoris ? favoris.map((el: any) => (
                <div className={styles.divElement} key={el}>
                    <p className={styles.p}>{decodeURIComponent(el)}</p>
                    <AiOutlineClose className={styles.croix} color={"black"} onClick={() => props.setIsVisible(false)} />
                </div>
            )) : "Pas de favoris trouvé"}
        </div>
    );
};

export default Index;