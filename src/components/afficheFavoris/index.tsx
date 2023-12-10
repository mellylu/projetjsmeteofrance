import React, { useContext } from 'react';

import { AiFillHeart } from "react-icons/ai"
import FavorisContext from "@/context/favorisCountryContext"

const Index = () => {
    const { favoris } = useContext(FavorisContext)


    return (
        <div>
            <AiFillHeart color={"black"} size={25} />
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