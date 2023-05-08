// OBTENCIÓN DE ELEMENTOS BODY

const checkBoxes = document.querySelectorAll('.checker');
const initDay = document.querySelector('#initDay');
const finalDay = document.querySelector('#finalDay');
const initHour = document.querySelector('#initHour');
const finalHour = document.querySelector('#finalHour');

function checkAllCheckBoxes() {
    if (checkBoxes[0].checked) {
        for (let i = 1; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true
        }
    } else {
        for (let i = 1; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false
        }
    }
};

initDay.addEventListener('click', function () {
    finalDay.value = '';
})


initDay.addEventListener('input', function () {
    if (initDay.value.length === 0) {
        finalDay.disabled = true;
    } else {
        finalDay.disabled = false;
    }
})

initHour.addEventListener('input', function () {
    finalHour.min = initHour.value;
})

finalDay.addEventListener('click', function () {
    finalDay.min = initDay.value;
});


checkBoxes[0].addEventListener('click', checkAllCheckBoxes)





// CREACION DE CHART***********************************************************************************************************************************************************

//var ctx = document.querySelector(".Chart").getContext("2d");
//var myChart = new Chart(ctx, {
//    type: "bar",
//    data: {
//        labels: ['@item.Fecha'],
//        datasets: [{
//            label: ['Datos'],
//            data: [10, 9, 15],
//            backgroundColor: [
//                'rgb(66, 134, 244,0.5)',
//                'rgb(74, 135, 72,0.5)',
//                'rgb(229, 89, 50,0.5)'
//            ]
//        }]
//    },
//    options: {
//        responsive: false,
//        scales: {
//            yAxes: [{
//                ticks: {
//                    beginAtZero: true
//                }
//            }]
//        }
//    }
//});


