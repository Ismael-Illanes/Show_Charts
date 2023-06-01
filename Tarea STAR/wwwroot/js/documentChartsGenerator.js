
function DocumentDaysChartGenerator(x) {
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
        plugins: [plugin],
        data: {
            labels: labels,
            datasets: [{
                label: dayNames[0] + " - Total documentos: " + importeTotal,
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
                            return value + " documentos";
                        }
                    }
                }
            }
        }
    });
}


function DocumentWeekChartGenerator(x) {
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
        plugins: [plugin],
        data: {
            labels: labels,
            datasets: [{
                label: "Semana nº " + weekNumber[0] + " (" + year[0] + ")" + " - Total documentos: " + importeTotal,
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
                            return value + " documentos";
                        }
                    }
                }
            }
        }
    });
}

function DocumentMonthChartGenerator(x) {
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
        plugins: [plugin],
        data: {
            labels: semanas,
            datasets: [{
                label: "Mes nº " + "(" + month[0] + ")" + " del año " + year[0] + " - Total documentos: " + importeTotal,
                data: ventasPorMes,
                backgroundColor: ventasPorMes.map((value, index) => index === maxIndex ? 'MediumSeaGreen' : index === minIndex ? 'lightcoral' : 'CornflowerBlue'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max:maxValue,
                    callback: function (value, index, values) {
                        return value + " documentos";
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
                            return value + " documentos";
                        }
                    }
                }
            }
        }
    });
}


function DocumentYearChartGenerator(x) {
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
        plugins: [plugin],
        data: {
            labels: nombresMeses,
            datasets: [{
                label: "Año " + year[0] + " - Total documentos: " + importeTotal,
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
                        return value;
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
                            return value + " documentos";
                        }
                    }
                }
            }
        }
    });
}



function demoPDF() {
    var doc = new jsPDF();
    var pageWidth = 210;
    var pageHeight = 297;

    var imageWidth = 180;
    var imageHeight = 100;
    var margin = 20;
    const canvasElements = $('#Charts canvas');

    canvasElements.each(function (index, canvas) {
        var text = "Gráfica";
        var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        var textX = (pageWidth - textWidth) / 2;
        var textY = 20;

        if (index > 0) {
            doc.addPage();
        }

        doc.setFontSize(40);

        if (index === 0) {
            textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            textX = (pageWidth - textWidth) / 2;
            doc.text(text, textX, textY, { align: "center" });
        } else {
            doc.text(text, textX, textY, { align: "center" });
        }

        var imageX = (pageWidth - imageWidth) / 2;
        var imageY = pageHeight - margin - imageHeight;

        const imageData = canvas.toDataURL('image/jpeg', 1.0);
        doc.addImage(imageData, 'JPEG', imageX, imageY, imageWidth, imageHeight);
    });

    doc.save("Charts.pdf");
}

