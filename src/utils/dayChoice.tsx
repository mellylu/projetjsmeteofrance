// Création des fonctions pour les boutouns de choix de jour
export const dayChoice = (tempsFiveDay: any, day: number) => {
    if (tempsFiveDay.length > 0) {
        let tempsplus: any = []
        tempsFiveDay.map((tempsDay: any) => tempsplus.push({
            ville: tempsDay.ville,
            lat: tempsDay.lat,
            lng: tempsDay.lng,
            temps: tempsDay.forecast[day].icon,
            degres: tempsDay.forecast[day].average,
        }))
        return tempsplus
    }
}