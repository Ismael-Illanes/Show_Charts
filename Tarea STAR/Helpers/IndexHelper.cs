//using Microsoft.EntityFrameworkCore;
//using System.Globalization;
//using System.Collections.Generic;
//using Tarea_STAR.Model;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.ModelBinding;

//namespace Tarea_STAR.Helpers
//{
//    class IndexHelper : ControllerBase
//    {
//        public Dictionary<IEnumerable<Ventas>, string> GetVentas(DbSet<Ventas> ventas, string diaInicialFromInput, string diaFinalFromInput, string horaInicioFromInput, string horaFinalFromInput)
//        {
//            DateTime diaInicio, diaFinal, fechaInicial, fechaFinal;
//            TimeSpan horaInicio, horaFinal;
//            string ErrorMessage = String.Empty;
//            Dictionary<IEnumerable<Ventas>, string> result = new Dictionary<IEnumerable<Ventas>, string>();

//            if (!DateTime.TryParseExact(diaInicialFromInput, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaInicial)
//                || !DateTime.TryParseExact(diaFinalFromInput, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaFinal))
//            {

//                ModelState.AddModelError(ErrorMessage, "Fecha formato incorrecto");
//                return result;
//            }

//            diaFinal = fechaFinal.Date;
//            diaInicio = fechaInicial.Date;

//            if (!TimeSpan.TryParseExact(horaFinalFromInput, "hh\\:mm", CultureInfo.InvariantCulture, out horaInicio)
//                || !TimeSpan.TryParseExact(horaInicioFromInput, "hh\\:mm", CultureInfo.InvariantCulture, out horaFinal))
//            {
//                ModelState.AddModelError(ErrorMessage, "Formato de hora incorrecto.");
//                return result;
//            }
//            ventas
//                .Where(v => v.Fecha >= diaInicio && v.Fecha <= diaFinal && v.Hora >= horaInicio && v.Hora <= horaFinal)
//                .OrderBy(v => v.Fecha)
//                .ThenBy(v => v.Hora);

//            result.Add(ventas, ErrorMessage);
//            return result;
//        }
//    }

//}
