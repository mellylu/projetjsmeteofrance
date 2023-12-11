import React, { useContext } from 'react';

import { AiFillHeart } from "react-icons/ai"
import FavorisContext from "@/context/favorisCountryContext"
import { AiOutlineClose } from "react-icons/ai";
import styles from "./index.module.scss"
import { useRouter } from 'next/router';
import { AiOutlineCaretUp } from "react-icons/ai";

const Index = (props: { isVisible: any, setIsVisible: any, setIsVisibleIcon: any }) => {
    const { favoris } = useContext(FavorisContext)
    const router = useRouter()


    return (
        <div className={styles.div}>
            <AiOutlineCaretUp style={{ marginRight: "auto", marginLeft: "auto", marginTop: "3%" }} size={15} color={"white"} />
            <div className={styles.divTitre}>
                <button onClick={() => { props.setIsVisibleIcon(false) }}>
                    <AiFillHeart color={"red"} size={40} style={{ marginRight: "2%" }} /></button>
                {/* <Image style={{ height: "50px", width: "50px" }} src={imageSoleil} alt="soleil icon" /> */}
                <h1 className={styles.h1}>Météo Ville</h1>
            </div>
            {favoris ? favoris.map((el: any) => (
                <div className={styles.divElement} key={el}>
                    <button onClick={() => { router.push(`/${el}`) }}>
                        <p className={styles.p}>{decodeURIComponent(el)}</p>
                    </button>
                    <AiOutlineClose className={styles.croix} color={"black"} onClick={() => props.setIsVisible(false)} />
                </div>
            )) : "Pas de favoris trouvé"}
        </div>
    );
};

export default Index;