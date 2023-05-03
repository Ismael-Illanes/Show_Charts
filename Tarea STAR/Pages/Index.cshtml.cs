using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;
using Tarea_STAR.Data;
using Tarea_STAR.Model;
using System.Globalization;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly AppDBContext _dbContext;
    public const string FORMATO_FECHA_HORA = "MM/dd/yyyy - HH:mm";
    public static DateTime Hoy { get => DateTime.Today; }
    public string fechaHora = Hoy.ToString(FORMATO_FECHA_HORA);
    public IEnumerable<Ventas> Ventas { get; set; }
    [BindProperty(Name = "fechaInicio")]
    public string FechaInicio { get; set; }
    [BindProperty(Name = "fechaFinal")]
    public string FechaFinal { get; set; }
    public string HoraInicio { get; set; }
    public string HoraFinal { get; set; }
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
        string formato = "dd/MM/yyyy - HH:mm";
        DateTime fechaHoraObj1 = DateTime.ParseExact(FechaInicio, formato, CultureInfo.InvariantCulture);
        DateTime fechaHoraObj2 = DateTime.ParseExact(FechaFinal, formato, CultureInfo.InvariantCulture);
        string fecha1 = fechaHoraObj1.ToString("dd/MM/yyyy");
        string hora1 = fechaHoraObj1.ToString("HH:mm");       string fecha2 = fechaHoraObj2.ToString("dd/MM/yyyy");
        string hora2 = fechaHoraObj2.ToString("HH:mm");




        FechaInicio = fecha1;
        HoraInicio = hora1;
        FechaFinal = fecha2;
        HoraFinal = hora2;

        Ventas = _dbContext.Ventas.Where(v => v.Fecha >= fechaHoraObj1 && v.Fecha <= fechaHoraObj2);

        return Page();
    }

}
