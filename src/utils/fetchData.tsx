import axios from "axios"
import COORDONNEES_REGION from "./coordonnees_region"

export const fetchData = async (setActualTemp: any) => {
    try {
        const requests = COORDONNEES_REGION.map(async element => {
            const response = await axios.get(
                // `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lng}&date=2023-11-21&units=metric&appid=63ccd367e391125bbf9a581aab9e0ae5`,
                `https://api.openweathermap.org/data/2.5/weather?q=${element.ville}&units=metric&lang=fr&appid=dcea80cba359684c8af702c1b42982ba`,
            )
            if (response.data.name === 'Brest') return {
                lat: element.lat,
                lng: element.lng,
                temps: response.data.weather[0].icon,
                degres: Math.floor(response.data.main.temp),
                ville: response.data.name,
            }
            else return {
                lat: response.data.coord.lat,
                lng: response.data.coord.lon,
                temps: response.data.weather[0].icon,
                degres: Math.floor(response.data.main.temp),
                ville: response.data.name,
            }
        })

        const results = await Promise.all(requests)

        setActualTemp(results)
    } catch (error) {
        // console.error(error)
    }
}