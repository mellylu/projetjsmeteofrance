import axios from 'axios';
import COORDONNEES_REGION from './coordonnees_region';
import { start } from 'repl';

export const fetchDataFiveday = async (setData: any, url: string) => {

  interface DailyInfo {
    [key: string]: {
      temps: number[];
      weather: string[];
    };
  }

  try {
    let responses = [];

    if (url.includes("q=")) {
      // Si l'URL contient "q=", faites une seule requête et mettez la réponse dans un tableau
      const response = await axios.get(url);
      responses = [response];
    } else {
      // Sinon, faites une requête pour chaque élément de COORDONNEES_REGION
      const requests = COORDONNEES_REGION.map(element => {
        return axios.get(url + `&q=${element.ville}`);
      });
      responses = await Promise.all(requests);
    }
    const results = responses.map(response => response.data); // Transformer les réponses en données

    const transformData = results.map((result) => {

      const dataBySpecifiedHour = (startHour: string = "00:00", endHour: string = "24:00") => {
        const specifiedHourDataFiveDays = result.list.filter((res: any) => {
          const timePart = res.dt_txt.split(' ')[1]; // Sépare la date et l'heure, et prend la partie heure
          const hoursAndMinutes = timePart.substring(0, 5);// Extrait les heures et les minutes
          return hoursAndMinutes >= startHour && hoursAndMinutes <= endHour;
        })

        let dailyInfoSpecifiedHour: DailyInfo = {};

        specifiedHourDataFiveDays.forEach((item: { dt: number; main: { temp: any }; weather: { icon: string }[] }) => {
          const date = new Date(item.dt * 1000);
          const day = date.toISOString().split('T')[0]; // Récupère la date au format YYYY-MM-DD
          if (!dailyInfoSpecifiedHour[day]) {
            dailyInfoSpecifiedHour[day] = {
              temps: [],
              weather: []
            };
          }
          dailyInfoSpecifiedHour[day].temps.push(item.main.temp);
          dailyInfoSpecifiedHour[day].weather.push(item.weather[0].icon);
        });

        // Calcule la moyenne des températures et icônes pour chaque jour
        const dailyAverages = Object.keys(dailyInfoSpecifiedHour).map(day => {
          // Température
          const temps = dailyInfoSpecifiedHour[day].temps;
          const sum = temps.reduce((a, b) => a + b, 0);
          const average = Math.floor(sum / temps.length);

          // Icône
          const icons = dailyInfoSpecifiedHour[day].weather
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
          return {
            day,
            average,
            icon,
          };
        });

        return dailyAverages
      }

      if (result.city.name === 'Brest') return {
        ville: result.city.name,
        lat: 48.400002,
        lng: -4.48333,
        forecast: dataBySpecifiedHour(),
        forecastMatin: dataBySpecifiedHour("06:00", "12:00"),
        forecastApresMidi: dataBySpecifiedHour("12:00", "18:00"),
        forecastSoiree: dataBySpecifiedHour("18:00", "24:00"),
        forecastNuit: dataBySpecifiedHour("00:00", "06:00"),
        brutListDataFiveDay: result.list,
        population: result.city.population,
        sunrise: result.city.sunrise,
        sunset: result.city.sunset
      }
      else return {
        ville: result.city.name,
        lat: result.city.coord.lat,
        lng: result.city.coord.lon,
        forecast: dataBySpecifiedHour(),
        forecastMatin: dataBySpecifiedHour("06:00", "12:00"),
        forecastApresMidi: dataBySpecifiedHour("12:00", "18:00"),
        forecastSoiree: dataBySpecifiedHour("18:00", "24:00"),
        forecastNuit: dataBySpecifiedHour("00:00", "06:00"),
        brutListDataFiveDay: result.list,
        population: result.city.population,
        sunrise: result.city.sunrise,
        sunset: result.city.sunset
      }
    })
    setData(transformData)
  } catch (error) {
    console.error("ERRRREURRR", error)
  }
}