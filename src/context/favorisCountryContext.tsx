import React, { createContext, useState, useEffect } from "react"

const FavorisContext = createContext({
    favorisCountryContext: [],
    setFavorisCountryContext: (x: any) => [],
})

export const FavorisCountryContextProvider = (props: { children: any }) => {
    const [favorisCountryContext, setFavorisCountryContext] = useState<any>([])

    const creerCookie = () => {
        // var e = null
        // var date = new Date()
        // date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)
        // e = "; expires=" + date.toISOString()
        document.cookie = "favorisCountry" + "=" + favorisCountryContext + "; path=/"

    }

    useEffect(() => {
        creerCookie()
        let nom = "favorisCountry"
        nom = nom + "="
        var liste = document.cookie.split(";")
        let token
        for (var i = 0; i < liste.length; i++) {
            var c = liste[i]
            while (c.charAt(0) == " ") c = c.substring(1, c.length)
            if (c.indexOf(nom) == 0) {
                token = c.substring(nom.length, c.length)
            }
        }
        // console.log(token, "token")
        console.log(favorisCountryContext, "fff")
        console.log(typeof favorisCountryContext, "gggg")
        let tab = []

        let b = token?.split(",")
        for (let pas = 0; pas < b?.length; pas++) {
            b ? tab.push(b[pas]) : ""
        }
        token ?

            setFavorisCountryContext([...favorisCountryContext, tab])
            : ""
        // console.log(typeof token, "typoof token")
        // localStorage.getItem("filtre") !== "undefined"
        // ? JSON.parse(localStorage.getItem("filtre"))
        // : {}
        // setFilterContext(
        // localStorage.getItem("filtre") !== "undefined"
        //     ? JSON.parse(localStorage.getItem("filtre"))
        //     : {},
        // )

    }, [])
    // useEffect(() => {
    //     localStorage.getItem("filtre") !== "undefined"
    //         ? JSON.parse(localStorage.getItem("filtre"): "")
    //         : {}
    //     setFavorisCountryContext(
    //         localStorage.getItem("filtre") !== "undefined"
    //             ? JSON.parse(localStorage.getItem("filtre"))
    //             : {},
    //     )


    // }, [])

    // console.log(JSON.parse(localStorage.getItem("filter")), "FILTER")
    // const context = {
    //     favorisCountryContext,
    //     setFavorisCountryContext,
    // }
    useEffect(() => {
        console.log(favorisCountryContext, "favorisCountryContext")
        // localStorage.setItem("filtre", JSON.stringify(favorisCountryContext))
        // return () => {
        //     localStorage.setItem("filtre", JSON.stringify(favorisCountryContext))
        // }
    }, [favorisCountryContext])

    return <FavorisContext.Provider value={{ favorisCountryContext, setFavorisCountryContext }}>{props.children}</FavorisContext.Provider>
}

export default FavorisContext
