//using Newtonsoft.Json;

//namespace Tarea_STAR.Helpers
//{
//    public static class RandomColorsHelper
//    {
//        public static List<string> RandomColor()
//        {
//            var fecha = DateTime.Now.ToString("dd-MM-yyyy");
//            var ventas = Model.Ventas.(v => v.Fecha.HasValue && v.Fecha.Value.Date.ToString("dd-MM-yyyy") == fecha);
//            var horas = ventas.Select(v => v.Hora.ToString()).ToList();

//            var horasArray = JsonConvert.SerializeObject(horas);
//            var horasArraySorted = JsonConvert.DeserializeObject<List<string>>(horasArray);
//            horasArraySorted.Sort();

//            var colors = new List<string>();
//            var random = new Random();

//            for (int i = 0; i < horasArraySorted.Count; i++)
//            {
//                var color = $"rgba({random.Next(256)}, {random.Next(256)}, {random.Next(256)}, 0.5)";
//                colors.Add(color);
//            }

//            return colors;
//        }
//    }
//}
