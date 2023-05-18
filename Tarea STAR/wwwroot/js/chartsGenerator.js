
function DaysChartGenerator(x) {

    new Chart(x, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: dayNames[0] + " - Total: " + importeTotal.toFixed(2) + " €",
                data: ventasPorDia,
                backgroundColor: ventasPorDia.map((value, index) => {
                    return index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue';
                }),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value.toFixed(2) + " €";
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 30
                        }
                    },
                    display: true,
                    title: {
                        text: "Legend",
                        color: 'red'
                    },
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
    new Chart(x, {
        type: 'bar',
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
                    callback: function (value, index, values) {
                        return value.toFixed(2) + " €";
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 15
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
    new Chart(x, {
        type: 'bar',
        data: {
            labels: semanas,
            datasets: [{
                label: "Mes nº " + "(" + month[0] + ")" + " del año " + year[0] + " - Total: " + importeTotal.toFixed(2) + " €",
                data: ventasPorMes,
                backgroundColor: ventasPorMes.map((value, index) => index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value.toFixed(2) + " €";
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 15
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
    new Chart(x, {
        type: 'bar',
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
                    callback: function (value, index, values) {
                        return value.toFixed(2) + " €";
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        font: {
                            size: 15
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