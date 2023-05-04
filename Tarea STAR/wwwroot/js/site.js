
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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



// CREACIÓN DE AIR-DATEPICKERS***********************************************************************************************************************************************************

let buttonHoy = {
    content: 'Hoy',
    className: 'custom-button-classname',
    onClick: (dp) => {
        let date = new Date();
        dp.selectDate(date);
        dp.setViewDate(date);
    }
}

let buttonOK = {
    content: 'Aceptar',
    className: 'custom-button-classname',
    onClick: (dp) => {
        dp.hide()
    }
}
var minValue;

let dp1 = new AirDatepicker('#datepicker1', {
    locale: {
        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1
    },
    buttons: [buttonHoy, buttonOK],
    timepicker: true,
    dateTimeSeparator: " - ",
    isMobile: true,
    onHide: () => {
        fecha = datepicker1.value
        const cadenaOriginal = fecha;
        const partes = cadenaOriginal.split("/");
        const nuevoOrden = [partes[1], partes[0], partes[2]];
        const nuevaCadena = nuevoOrden.join("/");
        minValue = nuevaCadena.split('-')[0]
        dp2.update({
            minDate: minValue
        });
        const dp2Input = document.querySelector('#datepicker2');
        dp2Input.value = '';

    }


})


let dp2 = new AirDatepicker('#datepicker2', {
    locale: {
        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        clear: 'Limpiar',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1
    },
    buttons: [buttonOK],
    timepicker: true,
    dateTimeSeparator: " - ",
    isMobile: true,
    onHide: () => {
        const dp1Input = document.querySelector('#datepicker1');
        const dp2Input = document.querySelector('#datepicker2');

        const fechaInicio = dp1Input.value;
        const fechaFinal = dp2Input.value;

        const diaFinal = fechaFinal.split('-')[0];
        const diaInicio = fechaInicio.split('-')[0];

        const horaInicio = fechaInicio.split('-')[1];
        const horaFinal = fechaFinal.split('-')[1];

        if (diaInicio === diaFinal && horaFinal <= horaInicio) {
            alert('La hora y minutos deben ser mayor que las del inicio');
            dp2Input.value = ''
        }
   } 
})


const btnSubmit = document.querySelector('#btnSubmit');
const fechaInicioInput = document.querySelector('#datepicker1');
const fechaFinalInput = document.querySelector('#datepicker2');

btnSubmit.addEventListener('click', () => {
    fechaInicioInput.value = '';
    fechaFinalInput.value = '';
});
