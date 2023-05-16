using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;
using Tarea_STAR.Data;
using Tarea_STAR.Model;
using System.Globalization;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Tarea_STAR.Helpers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using static IndexModel;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly AppDBContext _dbContext;
    public IEnumerable<Ventas> Ventas { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Se requiere una fecha inicial")]
    public string DiaInicio { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Se requiere una fecha final")]
    public string DiaFinal { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Se requiere una hora inicial")]
    public string HoraInicio { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Se requiere una hora final")]
    public string HoraFinal { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Se requiere una agrupación")]
    public string GroupBy { get; set; }
    public List<string> FechasUnicas { get; set; }
    [BindProperty]
    [RequiredDays(ErrorMessage = "Se requiere un día o días a analizar")]
    public List<string> SelectedDays { get; set; }
    public List<VentaPorDias> Lunes { get; set; }
    public List<VentaPorDias> Martes { get; set; }
    public List<VentaPorDias> Miercoles { get; set; }
    public List<VentaPorDias> Jueves { get; set; }
    public List<VentaPorDias> Viernes { get; set; }
    public List<VentaPorDias> Sabado { get; set; }
    public List<VentaPorDias> Domingo { get; set; }

    public List<VentaPorDias> VentasPorDias { get; set; }
    public List<VentaPorDias> VentasPorSemanas { get; set; }
    public List<VentaPorDias> VentasPorMeses { get; set; }

    public List<List<VentaPorDias>> ListaVentasPorDia { get; set; }
    public List<List<VentaPorDias>> ListaVentasPorSemana { get; set; }
    public List<List<VentaPorMes>> ListaVentasPorMes { get; set; }

    public IndexModel(ILogger<IndexModel> logger, AppDBContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }




    public void OnGet()
    {

    }

    public IActionResult OnPost()
    {
        if (string.IsNullOrEmpty(DiaInicio) || string.IsNullOrEmpty(DiaFinal) || string.IsNullOrEmpty(HoraInicio) || string.IsNullOrEmpty(HoraFinal))
        {
            ModelState.AddModelError(string.Empty, "Todos los campos deben ser completados.");
            return Page();
        }

        DateTime fechaInicial, fechaFinal;
        if (!DateTime.TryParseExact(DiaInicio, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaInicial)
            || !DateTime.TryParseExact(DiaFinal, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaFinal))
        {
            ModelState.AddModelError(string.Empty, "Formato de fecha incorrecto.");
            return Page();
        }

        DateTime diaInicio = fechaInicial.Date;
        DateTime diaFinal = fechaFinal.Date;

        TimeSpan horaInicio, horaFinal;
        if (!TimeSpan.TryParseExact(HoraInicio, "hh\\:mm", CultureInfo.InvariantCulture, out horaInicio)
            || !TimeSpan.TryParseExact(HoraFinal, "hh\\:mm", CultureInfo.InvariantCulture, out horaFinal))
        {
            ModelState.AddModelError(string.Empty, "Formato de hora incorrecto.");
            return Page();
        }



        //CONNECTION TO DATABASE

        string connectionString = "Data Source=DESKTOP-OOLUI0G;Initial Catalog=BASEMASTER;Integrated Security=True; Encrypt=False";

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();

            string query = @"
                SELECT Fecha, Hora, Importe
                FROM Ventas
                WHERE Fecha >= @diaInicio AND Fecha <= @diaFinal AND Hora >= @horaInicio AND Hora <= @horaFinal
                ORDER BY Fecha, Hora";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@diaInicio", diaInicio);
            command.Parameters.AddWithValue("@diaFinal", diaFinal);
            command.Parameters.AddWithValue("@horaInicio", horaInicio);
            command.Parameters.AddWithValue("@horaFinal", horaFinal);

            SqlDataReader reader = command.ExecuteReader();

            List<Ventas> ventasList = new List<Ventas>();

            while (reader.Read())
            {
                Ventas venta = new Ventas
                {
                    Fecha = reader.GetDateTime(0),
                    Hora = reader.GetTimeSpan(1),
                    Importe = reader.GetDouble(2)
                };

                ventasList.Add(venta);
            }

            Ventas = ventasList;
        }



        // OBTENCIÓN FECHAS ÚNICAS (POR CADA HORA ME GENERABA UNA FECHA REPETIDA)

        this.FechasUnicas = Ventas.Select(item => item.Fecha.HasValue ? item.Fecha.Value.Date.ToString("dd-MM-yyyy") : "").Distinct().ToList();

        List<VentaPorDias> ventaPorDias = new List<VentaPorDias>();



        List<VentaPorDias> ventaPorLunes = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorMartes = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorMiercoles = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorJueves = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorViernes = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorSabado = new List<VentaPorDias>();
        List<VentaPorDias> ventaPorDomingo = new List<VentaPorDias>();




        List<List<VentaPorDias>> listaVentaPorDia = new List<List<VentaPorDias>>();
        List<List<VentaPorDias>> listaVentaPorSemana = new List<List<VentaPorDias>>();
        List<List<VentaPorDias>> listaVentaPorMes = new List<List<VentaPorDias>>();


        //OBTENEMOS LOS DATOS DE FECHAS ÚNICAS
        ventaPorDias = FechasUnicas.Where(fecha => DateTime.TryParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechaDateTime))
                            .Select(fecha => new VentaPorDias
                            {
                                Fecha = fecha,
                                DayOfWeek = DateTime.ParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture).DayOfWeek,
                                Importe = Ventas.Where(venta => venta.Fecha.HasValue && venta.Fecha.Value.Date.ToString("dd-MM-yyyy") == fecha).Sum(venta => venta.Importe),
                                WeekNumber = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(DateTime.ParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture), CultureInfo.CurrentCulture.DateTimeFormat.CalendarWeekRule, CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek),
                                Month = DateTime.ParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture).Month,
                                Year = DateTime.ParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture).Year
                            })
                            .ToList();

        this.VentasPorDias = ventaPorDias;

        // OBTECIÓN MESES


        List<List<VentaPorMes>> ListaVentasPorMes = new List<List<VentaPorMes>>();

        if (SelectedDays.Contains("all"))
        {
            var VentasPorMeses = ventaPorDias
                .GroupBy(fecha => new { fecha.Year, fecha.Month,WeekOfYear = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(Convert.ToDateTime(fecha.Fecha), CalendarWeekRule.FirstDay, DayOfWeek.Monday) })
                .GroupBy(grupo => new { grupo.Key.Year, grupo.Key.Month })
                .Select(grupo => new
                {
                    Mes = grupo.Key.Month,
                    Year = grupo.Key.Year,
                    VentasPorMeses = grupo.Select(semana => new VentaPorMes
                    {
                        Mes = grupo.Key.Month,
                        Year = grupo.Key.Year,
                        Semana = semana.Key.WeekOfYear - CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(new DateTime(grupo.Key.Year, grupo.Key.Month, 1), CalendarWeekRule.FirstDay, DayOfWeek.Monday) + 1,
                        Importe = (decimal)semana.Sum(venta => venta.Importe)
                    }).ToList()
                })
                .ToList();

            foreach (var ventaPorMes in VentasPorMeses)
            {
                int mes = ventaPorMes.Mes;
                var mesExistente = ListaVentasPorMes.FirstOrDefault(v => v.Any(m => m.Mes == mes));

                if (mesExistente != null)
                {
                    mesExistente.AddRange(ventaPorMes.VentasPorMeses);
                }
                else
                {
                    ListaVentasPorMes.Add(ventaPorMes.VentasPorMeses);
                }
            }
        }
        else
        {
            // Filtrar las ventas por semana según los DayOfWeek seleccionados
            var selectedDayOfWeeks = SelectedDays.Select(day => Convert.ToInt32(day)).ToList();

            var ventasPorSemana = ventaPorDias
                .Where(fecha => selectedDayOfWeeks.Contains((int)fecha.DayOfWeek))
                .GroupBy(fecha => new { fecha.Year, fecha.Month, WeekOfYear = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(Convert.ToDateTime(fecha.Fecha), CalendarWeekRule.FirstDay, DayOfWeek.Monday) })
                .GroupBy(grupo => new { grupo.Key.Year, grupo.Key.Month })
                .Select(grupo => new
                {
                    Mes = grupo.Key.Month,
                    Year = grupo.Key.Year,
                    VentasPorSemana = grupo.Select(semana => new VentaPorMes
                    {
                        Mes = grupo.Key.Month,
                        Year = grupo.Key.Year,
                        Semana = semana.Key.WeekOfYear - CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(new DateTime(grupo.Key.Year, grupo.Key.Month, 1), CalendarWeekRule.FirstDay, DayOfWeek.Monday) + 1,
                        Importe = (decimal)semana.Sum(venta => venta.Importe)
                    }).ToList()
                })
                .ToList();

            foreach (var ventaPorMes in ventasPorSemana)
            {
                int mes = ventaPorMes.Mes;
                var mesExistente = ListaVentasPorMes.FirstOrDefault(v => v.Any(m => m.Mes == mes));

                if (mesExistente != null)
                {
                    mesExistente.AddRange(ventaPorMes.VentasPorSemana);
                }
                else
                {
                    ListaVentasPorMes.Add(ventaPorMes.VentasPorSemana);
                }
            }
        }

            this.ListaVentasPorMes = ListaVentasPorMes;
        



        // OBTECIÓN DE SEMANAS(POR CADA DÍA OBTENÍA UNA SEMANA REPETIDA)


        if (SelectedDays.Contains("all"))
        {
            listaVentaPorSemana = ventaPorDias
                .GroupBy(fecha => new { fecha.Year, fecha.WeekNumber })
                .Select(grupo => grupo.ToList())
                .ToList();
        }
        else
        {
            var selectedDayOfWeeks = SelectedDays.Select(day => Convert.ToInt32(day)).ToList();

            listaVentaPorSemana = new List<List<VentaPorDias>>();

            foreach (var weekNumber in ventaPorDias.Select(fecha => new { fecha.Year, fecha.WeekNumber }).Distinct())
            {
                var grupo = ventaPorDias
                    .Where(fecha => fecha.Year == weekNumber.Year && fecha.WeekNumber == weekNumber.WeekNumber && selectedDayOfWeeks.Contains(Convert.ToInt32(fecha.DayOfWeek)))
                    .ToList();

                if (grupo.Any())
                {
                    listaVentaPorSemana.Add(grupo);
                }
            }
        }

        this.ListaVentasPorSemana = listaVentaPorSemana;



        //ESTOS DATOS SE AGREGAN A SUS RESPECTIVAS LISTAS
        foreach (var item in ventaPorDias)
        {
            if (item.DayOfWeek == DayOfWeek.Monday)
            {
                ventaPorLunes.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Tuesday)
            {
                ventaPorMartes.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Wednesday)
            {
                ventaPorMiercoles.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Thursday)
            {
                ventaPorJueves.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Friday)
            {
                ventaPorViernes.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Saturday)
            {
                ventaPorSabado.Add(item);
            }
            else if (item.DayOfWeek == DayOfWeek.Sunday)
            {
                ventaPorDomingo.Add(item);
            }
        }

        //PROCESO DE FILTRADO
        if (SelectedDays.Contains("all"))
        {

            this.Lunes = ventaPorLunes;
            this.Martes = ventaPorMartes;
            this.Miercoles = ventaPorMiercoles;
            this.Jueves = ventaPorJueves;
            this.Viernes = ventaPorViernes;
            this.Sabado = ventaPorSabado;
            this.Domingo = ventaPorDomingo;

            listaVentaPorDia.Add(this.Lunes);
            listaVentaPorDia.Add(this.Martes);
            listaVentaPorDia.Add(this.Miercoles);
            listaVentaPorDia.Add(this.Jueves);
            listaVentaPorDia.Add(this.Viernes);
            listaVentaPorDia.Add(this.Sabado);
            listaVentaPorDia.Add(this.Domingo);
        }
        else
        {
            if (SelectedDays.Contains("1"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Monday)
                    {
                        ventaPorLunes.Add(item);
                    }
                }
                this.Lunes = ventaPorLunes.Distinct().ToList();
                listaVentaPorDia.Add(this.Lunes);
            }

            if (SelectedDays.Contains("2"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Tuesday)
                    {
                        ventaPorMartes.Add(item);
                    }
                }
                this.Martes = ventaPorMartes.Distinct().ToList();
                listaVentaPorDia.Add(this.Martes);
            }

            if (SelectedDays.Contains("3"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Wednesday)
                    {
                        ventaPorMiercoles.Add(item);
                    }
                }
                this.Miercoles = ventaPorMiercoles.Distinct().ToList();
                listaVentaPorDia.Add(this.Miercoles);
            }

            if (SelectedDays.Contains("4"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Thursday)
                    {
                        ventaPorJueves.Add(item);
                    }
                }
                this.Jueves = ventaPorJueves.Distinct().ToList();
                listaVentaPorDia.Add(this.Jueves);
            }

            if (SelectedDays.Contains("5"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Friday)
                    {
                        ventaPorViernes.Add(item);
                    }
                }
                this.Viernes = ventaPorViernes.Distinct().ToList();
                listaVentaPorDia.Add(this.Viernes);
            }

            if (SelectedDays.Contains("6"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Saturday)
                    {
                        ventaPorSabado.Add(item);
                    }
                }
                this.Sabado = ventaPorSabado.Distinct().ToList();
                listaVentaPorDia.Add(this.Sabado);
            }

            if (SelectedDays.Contains("0"))
            {
                foreach (var item in ventaPorDias)
                {
                    if (item.DayOfWeek == DayOfWeek.Sunday)
                    {
                        ventaPorDomingo.Add(item);
                    }
                }
                this.Domingo = ventaPorDomingo.Distinct().ToList();
                listaVentaPorDia.Add(this.Domingo);
            }
        }

  //SE AGREGAN TODAS LAS LISTAS DE LOS DÍAS A UNA LISTA DE LISTAS, PARA QUE PUEDAN SER LLAMADOS FÁCILMENTE EN LA VISTA
        this.ListaVentasPorDia = listaVentaPorDia;

        return Page();


    }
}

public class RequiredDaysAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        var selectedDays = value as List<string>;
        return selectedDays != null && selectedDays.Any();
    }
}

public class VentaPorDias
{
    public string Fecha { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public double? Importe { get; set; }
    public int WeekNumber { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
}


public class VentaPorSemana
{
    public int Week { get; set; }
    public decimal Importe {get; set;}
}
public class VentaPorMes
{
    public int Mes { get; set; }
    public int Semana { get; set; }
    public decimal Importe { get; set; }
    public int Day { get; set; }
    public int Year { get;set; }
}