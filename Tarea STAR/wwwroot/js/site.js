// OBTENCIÓN DE ELEMENTOS BODY

//const checkBoxes = document.querySelectorAll('.checker');


//function checkAllCheckBoxes() {
//    if (checkBoxes[0].checked) {
//        for (let i = 1; i < checkBoxes.length; i++) {
//            checkBoxes[i].checked = true
//        }
//    } else {
//        for (let i = 1; i < checkBoxes.length; i++) {
//            checkBoxes[i].checked = false
//        }
//    }
//}



//checkBoxes[0].addEventListener('click', checkAllCheckBoxes)






// CREACION DE CHART***********************************************************************************************************************************************************

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ['col1', 'col2', 'col3'],
        datasets: [{
            label: ['Datos'],
            data: [10, 9, 15],
            backgroundColor: [
                'rgb(66, 134, 244,0.5)',
                'rgb(74, 135, 72,0.5)',
                'rgb(229, 89, 50,0.5)'
            ]
        }]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


