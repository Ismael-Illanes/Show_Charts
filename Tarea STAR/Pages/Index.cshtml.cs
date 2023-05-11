using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;
using Tarea_STAR.Data;
using Tarea_STAR.Model;
using System.Globalization;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Tarea_STAR.Helpers;

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

    public List<string> FechasUnicas { get; set; } 

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


        Ventas = _dbContext.Ventas
                .Where(v => v.Fecha >= diaInicio && v.Fecha <= diaFinal && v.Hora >= horaInicio && v.Hora <= horaFinal)
                .OrderBy(v => v.Fecha)
                .ThenBy(v => v.Hora);


        this.FechasUnicas = Ventas.Select(item => item.Fecha.HasValue ? item.Fecha.Value.Date.ToString("dd-MM-yyyy") : "").Distinct().ToList();
        return Page();
    }


}



