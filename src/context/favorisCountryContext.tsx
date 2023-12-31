import React, { createContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

const FavorisContext = createContext({
    favoris: [],
    addFavoris: (ville: any, lat: any, lng: any) => { },
    isExist: false,
    setIsExist: (x: any) => { },
    count: 0,
    isVisibleIcon: true,
    setIsVisibleIcon: (x: any) => { },
    //fonction pour remove un favoris
    //fonction pour remove tous les favoris
})

export const FavorisCountryContextProvider = (props: { children: any }) => {

    const getFavorisCookieValue = (): any[] => {
        const cookieValue = Cookies.get('favoris');
        return cookieValue !== undefined ? JSON.parse(cookieValue) : [];
    };

    const [favoris, setFavoris] = useState<any>(typeof window !== "undefined" ? getFavorisCookieValue() : [])
    const [isExist, setIsExist] = useState<any>(false)
    const [isVisibleIcon, setIsVisibleIcon] = React.useState<any>(true)
    const count = favoris && favoris.length || 0;

    const addFavoris = (ville: any, lat: any, lng: any) => {
        if (count > 0) {
            let isExist = false
            favoris.forEach((element: any) => {
                if (element.ville == ville) {
                    isExist = true
                }
            });
            if (isExist) {
                setFavoris(favoris.filter((element: any) => element.ville !== ville))
                setIsExist(false)
            }

            else {
                setFavoris([...favoris, { ville: ville, lat: lat, lng: lng }])
                setIsExist(true)
            }

        }
        else {
            setFavoris([{ ville: ville, lat: lat, lng: lng }])
            setIsExist(true)
        }
    }


    const context = { addFavoris, favoris, isExist, setIsExist, count, isVisibleIcon, setIsVisibleIcon }

    useEffect(() => {
        Cookies.set('favoris', JSON.stringify(favoris), { expires: 7 }) //si il y a rien dans mon cookie storage
        return () => {
            Cookies.set('favoris', JSON.stringify(favoris), { expires: 7 })
        };
    }, [favoris])

    return <FavorisContext.Provider value={context}>{props.children}</FavorisContext.Provider>
}

export default FavorisContext
