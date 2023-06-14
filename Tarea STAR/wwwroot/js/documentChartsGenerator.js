
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

    Chart.defaults.font.color = 'black';

    new Chart(x, {
        type: 'bar',
        plugins: [plugin, ChartDataLabels],
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
                            size: 30,
                            color: 'black',
                            font: {
                                weight: 'bold'
                            }
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
        plugins: [plugin, ChartDataLabels],
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
                            size: 24,
                            color: 'black'
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
        plugins: [plugin, ChartDataLabels],
        data: {
            labels: semanas,
            datasets: [{
                label: month[0]  + " del año " + year[0] + " - Total documentos: " + importeTotal,
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
                            size: 21.5,
                            color: 'black'
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
        plugins: [plugin, ChartDataLabels],
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
                            size: 29.5,
                            color: 'black'
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



function demoPDF(x, FI, FF, HI, HF, G, F) {
    var doc = new jsPDF({
        orientation: 'landscape',
    });
    var pageWidth = 297;
    var pageHeight = 210;

    var imageWidth = 280;
    var imageHeight = 90.50;
    const canvasElements = $('#Charts canvas');

    var totalElements = 0;

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
        var imageY = pageHeight - imageHeight;

        const imageData = canvas.toDataURL('image/jpeg', 1.0);
        doc.addImage(imageData, 'JPEG', imageX, imageY, imageWidth, imageHeight);

        var formattedStartDate = formatDate(FI);
        var formattedEndDate = formatDate(FF);
        doc.setFontSize(10);
        var textDate = "Desde " + formattedStartDate + " ( " + HI + " )" + " hasta " + formattedEndDate + " ( " + HF + " )";
        doc.text(textDate, pageWidth - 90, 20, { align: "center" });

        doc.setFontSize(10);
        var textFilters = "Agrupado por " + G + " - " + "Fitrado por " + F;
        doc.text(textFilters, pageWidth - 90, 15, { align: "center" });


        doc.setFontSize(12);
        var currentPageData = x[index];

        var tableX = imageX;
        var tableY = (pageHeight - (pageHeight - 60)) / 2;
        var cellWidth = 25;
        var cellHeight = 10;
        var lineHeight = 5;
        var maxRows = 15;
        var currentRow = 0;

        doc.text("Nº", tableX + (cellWidth / 2), tableY);
        doc.text("Fecha", tableX + cellWidth, tableY);
        if (x[0][0][1].includes(",")) {
            doc.text("Importe", tableX + cellWidth * 2, tableY);
        } else {
            doc.text("Docs", tableX + cellWidth * 2, tableY);
        }

        tableY += lineHeight;

        for (var i = 0; i < currentPageData.length; i++) {
            var item = currentPageData[i];
            var number = i + 1;
            var date = item[0];
            var amount = item[1];

            doc.text(number.toString(), tableX + (cellWidth / 2), tableY);
            doc.text(date, tableX + cellWidth, tableY);
            doc.text(amount, tableX + cellWidth * 2, tableY);

            tableY += lineHeight;
            currentRow++;
            totalElements++;

            if (currentRow === maxRows) {
                tableX += cellWidth * 2.2;
                tableY = (pageHeight - (pageHeight - 60)) / 2;
                currentRow = 0;
                doc.text("Nº", tableX + (cellWidth / 2), tableY);
                doc.text("Fecha", tableX + cellWidth, tableY);
                if (x[0][0][1].includes(",")) {
                    doc.text("Importe", tableX + cellWidth * 2, tableY);
                } else {
                    doc.text("Docs", tableX + cellWidth * 2, tableY);
                }

                tableY += lineHeight;
            }

            if (tableY + lineHeight > pageHeight - 10 || tableX + cellWidth * 3 > imageX + imageWidth) {
                doc.addPage();
                tableX = imageX;
                tableY = (pageHeight - (pageHeight - 60)) / 2;
                currentRow = 0;
                doc.text("Nº", tableX + (cellWidth / 2), tableY);
                doc.text("Fecha", tableX + cellWidth, tableY);
                if (x[0][0][1].includes(",")) {
                    doc.text("Importe", tableX + cellWidth * 2, tableY);
                } else {
                    doc.text("Docs", tableX + cellWidth * 2, tableY);
                }

                tableY += lineHeight;
            }
        }
    });
    doc.save("Charts.pdf");
}


function formatDate(date) {
    var parts = date.split('-');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}