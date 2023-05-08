using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;
using Tarea_STAR.Data;
using Tarea_STAR.Model;
using System.Globalization;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly AppDBContext _dbContext;
    public IEnumerable<Ventas> Ventas { get; set; }
    [BindProperty]
    public string DiaInicio { get; set; }
    [BindProperty]
    public string DiaFinal { get; set; }
    [BindProperty]
    public string HoraInicio { get; set; }
    [BindProperty]
    public string HoraFinal { get; set; }
    public IndexModel(ILogger<IndexModel> logger, AppDBContext dbContext)
    {

        _logger = logger;
        _dbContext = dbContext;
    }

    public void OnGet()
    {

    }

    //public DateTime formateo(DateTime x)
    //{
        
    //    var y = x.ToString();
    //    var partes = y.Split(' ')[0];
    //    DateTime fecha = DateTime.ParseExact(partes, "dd/MM/yyyy", CultureInfo.InvariantCulture);
    //    return fecha;
    //}


    public IActionResult OnPost()
    {
        DateTime fechaInicial = DateTime.ParseExact(DiaInicio, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        string fechaFormateada1 = fechaInicial.ToString("dd/MM/yyyy");
        DateTime diaInicio = DateTime.ParseExact(fechaFormateada1, "dd/MM/yyyy", CultureInfo.InvariantCulture);

        DateTime fechaFinal = DateTime.ParseExact(DiaFinal, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        string fechaFormateada2 = fechaFinal.ToString("dd/MM/yyyy");
        DateTime diaFinal = DateTime.ParseExact(fechaFormateada2, "dd/MM/yyyy", CultureInfo.InvariantCulture);

        TimeSpan horaInicio = TimeSpan.ParseExact(HoraInicio, "hh\\:mm", CultureInfo.InvariantCulture);
        TimeSpan horaFinal = TimeSpan.ParseExact(HoraFinal, "hh\\:mm", CultureInfo.InvariantCulture);


        

        Ventas = _dbContext.Ventas
            .Where(v => v.Fecha >= diaInicio && v.Fecha <= diaFinal && v.Hora >= horaInicio && v.Hora <= horaFinal)
        .OrderBy(v => v.Fecha)
        .ThenBy(v => v.Hora);


        return Page();
    }

}
