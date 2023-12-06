import axios from 'axios';
import COORDONNEES_REGION from './coordonnees_region';

export const fetchDataFiveday = async (setTempsFiveDay: any) => {

  interface DailyInfo {
    [key: string]: {
      temps: number[];
      weather: string[];
    };
  }

  try {
    const requests = COORDONNEES_REGION.map(async element => {
      const response = await axios.get(
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${element.lat}&lon=${element.lng}&date=2023-11-21&units=metric&appid=63ccd367e391125bbf9a581aab9e0ae5`,
        `https://api.openweathermap.org/data/2.5/forecast?q=${element.ville}&units=metric&lang=fr&appid=dcea80cba359684c8af702c1b42982ba`,
      )
      const dailyInfo: DailyInfo = {};

      // Regroupe les températures par jour
      response.data.list.forEach((item: { dt: number; main: { temp: any }; weather: { icon: string }[] }) => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0]; // Récupère la date au format YYYY-MM-DD
        if (!dailyInfo[day]) {
          dailyInfo[day] = {
            temps: [],
            weather: []
          };
        }
        dailyInfo[day].temps.push(item.main.temp);
        dailyInfo[day].weather.push(item.weather[0].icon);
      });

      // Calcule la moyenne des températures et icônes pour chaque jour
      const dailyAverages = Object.keys(dailyInfo).map(day => {
        // Température
        const temps = dailyInfo[day].temps;
        const sum = temps.reduce((a, b) => a + b, 0);
        const average = Math.floor(sum / temps.length);
        // Icône
        const icons = dailyInfo[day].weather
        let dayIcon = icons.filter((icon) => icon.includes('d'))
        if (dayIcon.length === 0) dayIcon = icons
        const getMostFrequentIcon = (dayIcon: any[]) => {
          // Compter la fréquence de chaque icône
          const counts = dayIcon.reduce((acc, icon) => {
            acc[icon] = (acc[icon] || 0) + 1;
            return acc;
          }, {});
          // Trouver l'icône le plus fréquent
          let mostFrequentIcon = dayIcon[0];
          let maxCount = 1;

          for (const icon of Object.keys(counts)) {
            if (counts[icon] > maxCount) {
              mostFrequentIcon = icon;
              maxCount = counts[icon];
            }
          }
          // Si aucun icône n'apparaît plus de deux fois, `mostFrequentIcon` restera le premier élément
          return mostFrequentIcon;
        };
        const icon = getMostFrequentIcon(dayIcon)
        return { day, average, icon };
      });
      // console.log(response.data.city.name)

      if (response.data.city.name === 'Brest') return {
        ville: response.data.city.name,
        lat: element.lat,
        lng: element.lng,
        forecast: dailyAverages
      }
      else return {
        ville: response.data.city.name,
        lat: response.data.city.coord.lat,
        lng: response.data.city.coord.lon,
        forecast: dailyAverages
      }
    })

    const results = await Promise.all(requests)

    setTempsFiveDay(results)
  } catch (error) {
    console.error(error)
  }
}