import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";

import Favoris from '@/components/favoris';

const Index = () => {
    const router = useRouter();
    const [url, setUrl] = useState<any>("")

    useEffect(() => {
        setUrl(window.location.pathname.split("/")[1])

    }, [])

    return (
        <div>

            {/* <AiOutlineHeart color={"red"} onClick={() => { ajouterFavoris() }} /> */}
            {url ? <div>
                <h1>AFFICHER METEO VILLE {router.query.ville}</h1>
                <Favoris ville={url} />
            </div> : ""}
        </div>

    );
};

export default Index;