// Création des fonctions pour les boutouns de choix de jour
export const dayChoice = (tempsFiveDay: any, day: number, dayt: string) => {
    if (tempsFiveDay.length > 0) {
        console.log(tempsFiveDay)
        let tempsplus: any = []
        tempsFiveDay.forEach((tempsDay: any) => {
            const forecastDaySelected = tempsDay.forecast.filter((td: any) => td.day === dayt)
            const forecastNuitDaySelected = tempsDay.forecastNuit.filter((td: any) => td.day === dayt)
            const forecastMatinDaySelected = tempsDay.forecastMatin.filter((td: any) => td.day === dayt)
            const forecastApresMidiDaySelected = tempsDay.forecastApresMidi.filter((td: any) => td.day === dayt)
            const forecastSoireeDaySelected = tempsDay.forecastSoiree.filter((td: any) => td.day === dayt)
            tempsplus.push({
                ville: tempsDay.ville,
                lat: tempsDay.lat,
                lng: tempsDay.lng,
                temps: forecastDaySelected[0].icon,
                degres: forecastDaySelected[0].average,
                nuit: forecastNuitDaySelected[0],
                matin: forecastMatinDaySelected[0],
                apresMidi: forecastApresMidiDaySelected[0],
                soiree: forecastSoireeDaySelected[0],
            })
        })
        return tempsplus
    }
}