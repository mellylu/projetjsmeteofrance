import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend);


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

    const donneesGraphiqueRef = useRef(props.donneesGraphique); // Utilisation d'une référence React


    useEffect(() => {
        donneesGraphiqueRef.current = props.donneesGraphique;

        tabTemperature = [];
        tabHoraire = [];
        tabImage = [];
        donneesGraphiqueRef.current.forEach((element: any) => {
            tabTemperature.push(Math.round(element.main.temp));
            tabHoraire.push(element.dt_txt);
            tabImage.push(element.weather[0].icon);
        });
        setData3(donneesGraphiqueRef.current);
    }, [props.donneesGraphique]);

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

    // const bgImage = {
    //     id: 'bgImage',
    //     beforeDatasetsDraw(chart: any, args: any, plugin: any) {
    //         const { ctx } = chart;





    //         donneesGraphiqueRef.current.forEach((element: any, index: number) => {
    //             const chartImage = new Image();
    //             chartImage.onload = function () {
    //                 const imageWidth = 50;
    //                 const imageHeight = 50;

    //                 const xCoordinate = chart.scales.x.getPixelForValue(element.dt_txt);
    //                 const yCoordinate = chart.scales.y.getPixelForValue(Math.round(element.main.temps));

    //                 ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
    //             };

    //             console.log(chartImage, "CHARTIMAGE")
    //             chartImage.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@4x.png`;
    //         });
    //     }
    // };

    const bgImage = {
        id: 'bgImage',
        beforeDatasetsDraw(chart: any, args: any, plugin: any) {
            const { ctx } = chart;
            console.log(donneesGraphiqueRef)
            const loadImages = async () => {
                const images = donneesGraphiqueRef.current.map((element: any) => {
                    return new Promise((resolve) => {
                        const chartImage = new Image();
                        chartImage.onload = () => resolve(chartImage);

                        chartImage.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@4x.png`;
                    });
                });

                const loadedImages = await Promise.all(images);

                loadedImages.forEach((chartImage, index) => {
                    const imageWidth = 50;
                    const imageHeight = 50;

                    const xCoordinate = chart.scales.x.getPixelForValue(donneesGraphiqueRef.current[index].dt_txt);
                    const yCoordinate = chart.scales.y.getPixelForValue(Math.round(donneesGraphiqueRef.current[index].main.temp));

                    ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
                });
            };

            loadImages();
        }
    };





    return (
        <div>
            <Line data={data} plugins={[bgImage]} />
        </div>
    );
};

export default LineChart;


