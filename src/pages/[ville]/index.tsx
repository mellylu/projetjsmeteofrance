import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import FavorisContext from '@/context/favorisCountryContext';
const Index = () => {
    const router = useRouter();
    const { setFavorisCountryContext, favorisCountryContext } = useContext(FavorisContext)
    const [url, setUrl] = useState<any>("")

    useEffect(() => {
        // console.log(router.query)
        setUrl(router.query.ville)
        console.log(favorisCountryContext, "bbbbbbbbbbb")

    }, [])

    const ajouterFavoris = () => {
        // setFavorisCountryContext({ ...favorisCountryContext, x: url })
        setFavorisCountryContext([...favorisCountryContext, url])
    }

    useEffect(() => {
        console.log(favorisCountryContext)
    }, [favorisCountryContext])

    return (
        <div>
            <h1>AFFICHER METEO VILLE {router.query.ville}</h1>
            <AiOutlineHeart color={"red"} onClick={() => { ajouterFavoris() }} />
        </div>
    );
};

export default Index;