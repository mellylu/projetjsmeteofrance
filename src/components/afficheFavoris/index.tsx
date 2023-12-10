import React, { useContext } from 'react';

import { AiFillHeart } from "react-icons/ai"
import FavorisContext from "@/context/favorisCountryContext"

import styles from "./index.module.scss"

const Index = (props: { isVisible: any, setIsVisible: any }) => {
    const { favoris } = useContext(FavorisContext)


    return (
        <div className={styles.div}>
            <h1>Liste de favoris</h1>
            {favoris ? favoris.map((el: any) => (
                <div key={el}>
                    <p>{el}</p>
                </div>
            )) : "Pas de favoris trouvé"}
        </div>
    );
};

export default Index;