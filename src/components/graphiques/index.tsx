import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

import styles from "./index.module.scss"

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend);


const LineChart = (props: { donneesGraphique: any }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;


    let tabTemperature: any = []
    let tabHoraire: any = []
    props.donneesGraphique.forEach((element: any) => {
        tabTemperature.push(Math.round(element.main.temp))
        tabHoraire.push(element.dt_txt.split(" ")[0].split("-")[2] + "/" + element.dt_txt.split(" ")[0].split("-")[1] + "/" + element.dt_txt.split(" ")[0].split("-")[0] + " " + element.dt_txt.split(" ")[1].split(":")[0] + "h");
    })
    let data: any = {}
    const labels = tabHoraire.slice(startIdx, endIdx);
    const dataSubset = tabTemperature.slice(startIdx, endIdx);
    const donneesGraphiqueRef = useRef(props.donneesGraphique);


    useEffect(() => {
        donneesGraphiqueRef.current = props.donneesGraphique;

        tabTemperature = [];
        tabHoraire = [];
        donneesGraphiqueRef.current.forEach((element: any) => {
            tabTemperature.push(Math.round(element.main.temp));
            tabHoraire.push(element.dt_txt.split(" ")[0].split("-")[2] + "/" + element.dt_txt.split(" ")[0].split("-")[1] + "/" + element.dt_txt.split(" ")[0].split("-")[0] + " " + element.dt_txt.split(" ")[1].split(":")[0] + "h");
        });
    }, [props.donneesGraphique]);


    data = {
        labels,
        datasets: [
            {
                label: 'Température',
                data: dataSubset,
                pointRadius: 0,
            },
        ],
    }

    const options = {
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
                min: Math.min(...tabTemperature) - 1,
                max: Math.max(...tabTemperature) + 1,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            padding: {
                top: 50,
                right: 20,
                bottom: 0,
                left: 0,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1,
    };

    const totalPages = Math.ceil(tabTemperature.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const bgImage = {
        id: 'bgImage',
        beforeDatasetsDraw(chart: any, args: any, plugin: any) {
            const { ctx } = chart;
            // console.log(donneesGraphiqueRef)
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

                    let horaires = donneesGraphiqueRef.current[index].dt_txt.split(" ")[0].split("-")[2] + "/" + donneesGraphiqueRef.current[index].dt_txt.split(" ")[0].split("-")[1] + "/" + donneesGraphiqueRef.current[index].dt_txt.split(" ")[0].split("-")[0] + " " + donneesGraphiqueRef.current[index].dt_txt.split(" ")[1].split(":")[0] + "h"

                    const xCoordinate = chart.scales.x.getPixelForValue(horaires);
                    const yCoordinate = chart.scales.y.getPixelForValue(Math.round(donneesGraphiqueRef.current[index].main.temp));
                    const legendText = Math.round(donneesGraphiqueRef.current[index].main.temp) + "°C";

                    ctx.fillStyle = 'black';
                    ctx.font = '12px Arial';

                    const textXCoordinate = xCoordinate - imageWidth / 2 + imageWidth / 4;
                    const textYCoordinate = yCoordinate - imageHeight / 2;

                    ctx.fillText(legendText, textXCoordinate, textYCoordinate);
                    ctx.drawImage(chartImage, xCoordinate - imageWidth / 2, yCoordinate - imageHeight / 2, imageWidth, imageHeight);
                });
            };

            loadImages();
        }
    };


    return (
        <div className={styles.divMain}>
            <div className={styles.divNext}>
                {currentPage === 1 ? "" : <AiFillCaretLeft onClick={prevPage}></AiFillCaretLeft >}
            </div>
            <div className={styles.graphiqueLine}>
                <Line className={styles.Line} data={data} options={options} plugins={[bgImage]} />
            </div>

            <div className={styles.divNext}>
                {currentPage === totalPages ? "" : <AiFillCaretRight onClick={nextPage}></AiFillCaretRight>}
            </div>
        </div>
    );
};

export default LineChart;


