import axios from "axios"

export const fetchData = async (setActualTemp: any, url: string) => {
    try {
        const response = await axios.get(
            url,
        )
        console.log('---------------------------hi-----------------------', response)
        let finalresponse = {
            lat: response.data.coord.lat,
            lng: response.data.coord.lon,
            temps: response.data.weather[0].icon,
            degres: Math.floor(response.data.main.temp),
            ville: response.data.name,
        }
        console.log('fffffffffffff', finalresponse)
        setActualTemp(finalresponse)
    } catch (error) {
        console.error(error)
    }
}