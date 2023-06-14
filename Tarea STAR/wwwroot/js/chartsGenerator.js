

function DaysChartGenerator(x) {
    const maxValue = Math.max(...ventasPorDia);
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    new Chart(x, {
        type: 'bar',
        plugins: [plugin, ChartDataLabels],
        data: {
            labels: labels,
            datasets: [{
                fill: true,
                label: dayNames[0] + " - Total: " + importeTotal.toFixed(2) + " €",
                data: ventasPorDia,
                backgroundColor: ventasPorDia.map((value, index) => {
                    return index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue';
                }),
                borderWidth: 1
            }]
        },
        options: {
            hover: {
                mode: 'nearest',
                animationDuration: 0,
                delay: 0
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    callback: function (value, index, values) {
                        return value + " documentos";
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset:-20,
                    color: 'black', 
                    font: {
                        size: 10,
                        weight: 'bold' 
                    },
                    formatter: function (value, context) {
                        return context.dataIndex + 1;
                    }
                },
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 30,
                            color:'black'
                        }
                    },
                    display: true,
                    onClick: (e) => e.stopPropagation()
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var value = context.dataset.data[context.dataIndex];
                            return value.toFixed(2) + " €";
                        }
                    }
                }
            }
        }
    });
}


function WeekChartGenerator(x) {
    const maxValue = Math.max(...ventasPorSemana);
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    new Chart(x, {
        type: 'bar',
        plugins: [plugin, ChartDataLabels],
        data: {
            labels: labels,
            datasets: [{
                label: "Semana nº " + weekNumber[0] + " (" + year[0] + ")" + " - Total: " + importeTotal.toFixed(2) + " €",
                data: ventasPorSemana,
                backgroundColor: ventasPorSemana.map((value, index) => index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    callback: function (value, index, values) {
                        return value + " documentos";
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: -20,
                    color: 'black',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    formatter: function (value, context) {
                        return context.dataIndex + 1;
                    }
                },
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 25
                        }
                    },
                    display: true,
                    onClick: (e) => e.stopPropagation()
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var value = context.dataset.data[context.dataIndex];
                            return value.toFixed(2) + " €";
                        }
                    }
                }
            }
        }
    });
}

function MonthChartGenerator(x) {
    const maxValue = Math.max(...ventasPorMes);
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    new Chart(x, {
        type: 'bar',
        plugins: [plugin, ChartDataLabels],
        data: {
            labels: semanas,
            datasets: [{
                label: month[0] + " del año " + year[0] + " - Total: " + importeTotal.toFixed(2) + " €",
                data: ventasPorMes,
                backgroundColor: ventasPorMes.map((value, index) => index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    callback: function (value, index, values) {
                        return value + " documentos";
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: -20,
                    color: 'black',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    formatter: function (value, context) {
                        return context.dataIndex + 1;
                    }
                },
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 25
                        }
                    },
                    display: true,
                    onClick: (e) => e.stopPropagation()
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var value = context.dataset.data[context.dataIndex];
                            return value.toFixed(2) + " €";
                        }
                    }
                }
            }
        }
    });
}





function YearChartGenerator(x) {
    const maxValue = Math.max(...ventasPorAno);
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    new Chart(x, {
        type: 'bar',
        plugins: [plugin, ChartDataLabels],
        data: {
            labels: nombresMeses,
            datasets: [{
                label: "Año " + year[0] + " - Total recaudado: " + importeTotal.toFixed(2) + " €",
                data: ventasPorAno,
                backgroundColor: ventasPorAno.map((value, index) => index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    callback: function (value, index, values) {
                        return value + " documentos";
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: -20,
                    color: 'black',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    formatter: function (value, context) {
                        return context.dataIndex + 1;
                    }
                },
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 25
                        }
                    },
                    display: true,
                    onClick: (e) => e.stopPropagation()
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var value = context.dataset.data[context.dataIndex];
                            return value.toFixed(2) + " €";
                        }
                    }
                }
            }
        }
    });
}
