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

    public List<List<VentaPorDias>> ListaVentasPorDia { get; set; }
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

        ventaPorDias = FechasUnicas.Where(fecha => DateTime.TryParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechaDateTime))
                                          .Select(fecha => new VentaPorDias
                                          {
                                              Fecha = fecha,
                                              DayOfWeek = DateTime.ParseExact(fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture).DayOfWeek,
                                              Importe = Ventas.Where(venta => venta.Fecha.HasValue && venta.Fecha.Value.Date.ToString("dd-MM-yyyy") == fecha).Sum(venta => venta.Importe)
                                          })
                                          .ToList();
         this.VentasPorDias = ventaPorDias;

        foreach(var item in ventaPorDias)
        {
            if(item.DayOfWeek == DayOfWeek.Monday)
            {
                ventaPorLunes.Add(item);
            }else if(item.DayOfWeek == DayOfWeek.Tuesday)
            {
                ventaPorMartes.Add(item);
            } else if(item.DayOfWeek == DayOfWeek.Wednesday)
            {
                ventaPorMiercoles.Add(item);
            } else if(item.DayOfWeek== DayOfWeek.Thursday)
            {
                ventaPorJueves.Add(item);
            }else if(item.DayOfWeek == DayOfWeek.Friday)
            {
                ventaPorViernes.Add(item);
            }else if(item.DayOfWeek == DayOfWeek.Saturday)
            {
                ventaPorSabado.Add(item);
            }
            else if(item.DayOfWeek == DayOfWeek.Sunday)
            {
                ventaPorDomingo.Add(item);
            }
        }

        if (SelectedDays.Contains("0"))
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
        } else if(SelectedDays.Contains("1")) 
        {
            this.Lunes = ventaPorLunes;
            listaVentaPorDia.Add(this.Lunes) ;
        }

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
}
