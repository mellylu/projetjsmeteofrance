import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend);

// const labels = ['13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h'];




const LineChart = (props: { donneesGraphique: any }) => {
    const [data3, setData3] = useState<any>(props.donneesGraphique)
    // console.log(props.donneesGraphique)
    let tabTemperature: any = []
    let tabHoraire: any = []
    let tabImage: any = []
    props.donneesGraphique.forEach((element: any) => {
        tabTemperature.push(Math.round(element.main.temp))
        tabHoraire.push(element.dt_txt)
        tabImage.push(element.weather[0].icon)
    })
    // const [bgImage, setBgImage] =
    let data: any = {}

    const donneesGraphique = props.donneesGraphique


    // let bgImage: any = {}
    const labels = tabHoraire


    data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: tabTemperature,
                pointRadius: 0,
            },
        ],
    }

    // console.log(tabHoraire)

    // bgImage = {
    //     id: 'bgImage',
    //     // let objDate: { [key: string]: string } = {}

    //     //     objDate[`datePlus${i}`] = dateString
    //     beforeDatasetsDraw(chart: any, args: any, plugin: any) {
    //         console.log(props.donneesGraphique)
    //         const { ctx } = chart;
    //         let cpt: any = 0
    //         const chartImage = new Image();
    //         chartImage.onload = function () {
    //             const imageWidth = 50;
    //             const imageHeight = 50;
    //             const xCoordinate = chart.scales.x.getPixelForValue("2023-12-22 18:00:00");
    //             const yCoordinate = chart.scales.y.getPixelForValue(8);

    //             ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //         };
    //         chartImage.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';


    //         // const chartImages = tabImage.map((element: any) => {
    //         //     const chartImage = new Image();
    //         //     chartImage.src = `https://openweathermap.org/img/wn/${element}@4x.png`
    //         //     return chartImage;
    //         // })
    //         // console.log(tabHoraire)

    //         // console.log("111111111111111")
    //         // const { ctx } = chart;
    //         // console.log(props.donneesGraphique)
    //         // props.donneesGraphique.forEach((element: any, index: number) => {
    //         // console.log("ELEMENT")
    //         //     const chartImage = chartImages[index]
    //         //     chartImage.onload = function () {
    //         //         console.log(element, "ELEMENT")
    //         //         const imageWidth = 50;
    //         //         const imageHeight = 50;
    //         //         const xCoordinate = chart.scales.x.getPixelForValue(element.dt_txt);
    //         //         const yCoordinate = chart.scales.y.getPixelForValue(element.main.temp);

    //         //         ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //         //     };
    //         //    chartImage.src = "https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg"//`https://openweathermap.org/img/wn/${tabImage[cpt]}@4x.png`
    //         //     cpt += 1
    //         // })

    //         // const chartImage = new Image();
    //         // chartImage.onload = function () {
    //         //     const imageWidth = 50;
    //         //     const imageHeight = 50;
    //         //     const xCoordinate = chart.scales.x.getPixelForValue("2023-12-22 18:00:00");
    //         //     const yCoordinate = chart.scales.y.getPixelForValue(6);

    //         //     ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //         // };
    //         // chartImage.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';


    //         // const { ctx } = chart;
    //         // const chartImage = new Image();
    //         // chartImage.onload = function () {
    //         //     const imageWidth = 50;
    //         //     const imageHeight = 50;
    //         //     const xCoordinate = chart.scales.x.getPixelForValue("2023-12-22 18:00:00");
    //         //     const yCoordinate = chart.scales.y.getPixelForValue(6);

    //         //     ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //         // };
    //         // chartImage.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';

    //         // const chartImage2 = new Image();
    //         // chartImage2.onload = function () {
    //         //     const imageWidth = 50;
    //         //     const imageHeight = 50;
    //         //     const xCoordinate = chart.scales.x.getPixelForValue("2023-12-22 21:00:00");
    //         //     const yCoordinate = chart.scales.y.getPixelForValue(6);

    //         //     ctx.drawImage(chartImage2, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //         // };
    //         // chartImage2.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';
    //     }

    //     //src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
    // }


    const bgImage = {
        id: 'bgImage',
        beforeDatasetsDraw(chart: any, args: any, plugin: any) {
            const { ctx } = chart;
            const chartImage = new Image();
            const x = tabImage.map((element: any) => {
                console.log("ELEMENT", element)
            })
            chartImage.onload = function () {
                const imageWidth = 50;
                const imageHeight = 50;

                const xCoordinate = chart.scales.x.getPixelForValue('2023-12-22 21:00:00');
                const yCoordinate = chart.scales.y.getPixelForValue(8);

                ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
            };
            chartImage.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';



            const chartImage2 = new Image();
            chartImage2.onload = function () {
                const imageWidth = 50;
                const imageHeight = 50;
                console.log(tabImage)
                ctx.drawImage(chartImage2, chart.scales.x.getPixelForValue('2023-12-23 00:00:00') - imageWidth / 2, chart.scales.y.getPixelForValue(8) - imageHeight / 2, imageWidth, imageHeight);
            };
            chartImage2.src = 'https://st.depositphotos.com/1007168/1249/i/450/depositphotos_12492703-stock-photo-summer-hot-sun.jpg';
        }
    };







    //12 11 10 8 8 8 10 10
    return (
        <div>
            <Line data={data} plugins={[bgImage]} />
        </div>
    );
};

export default LineChart;