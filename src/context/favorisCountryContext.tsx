import React, { createContext, useState, useEffect, ReactNode } from "react"
import Cookies from "js-cookie"

const FavorisContext = createContext({
    favoris: [],
    addFavoris: (ville: string, lat: number, lng: number) => { },
    isExist: false,
    setIsExist: (x: boolean) => { },
    count: 0,
    isVisibleIcon: true,
    setIsVisibleIcon: (x: boolean) => { },
})

export const FavorisCountryContextProvider = (props: { children: ReactNode }) => {

    const getFavorisCookieValue = (): any[] => {
        const cookieValue = Cookies.get('favoris');
        return cookieValue !== undefined ? JSON.parse(cookieValue) : [];
    };

    const [favoris, setFavoris] = useState<any>(typeof window !== "undefined" ? getFavorisCookieValue() : [])
    const [isExist, setIsExist] = useState<boolean>(false)
    const [isVisibleIcon, setIsVisibleIcon] = React.useState<boolean>(true)
    const count = favoris && favoris.length || 0;

    const addFavoris = (ville: string, lat: number, lng: number) => {
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
