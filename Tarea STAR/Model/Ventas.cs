using System.ComponentModel.DataAnnotations;

namespace Tarea_STAR.Model
{
    public class Ventas
    {
        public int? Z { get; set; }
        [Key]
        public string Documento { get; set; }
        public string Operador { get; set; }
        public string Tipo { get; set; }
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Año { get; set; }
        public int? ncomensales { get; set; }
        public int? Mesa { get; set; }
        public string FormaPago { get; set; }
        public DateTime? Fecha { get; set; }
        public TimeSpan? Hora { get; set; }
        public double? Base { get; set; }
        public double? IVA { get; set; }
        public double? Importe { get; set; }
        public string Cliente { get; set; }
        public string Caja { get; set; }
        public string CodImpresion { get; set; }
        public int? NumImpresion { get; set; }
        public double? Descuento { get; set; }
        public double? ImporteDescuento { get; set; }
        public double? Devido { get; set; }
        public string DocumentoAnula { get; set; }
        public bool? Marcado { get; set; }
        public bool? Procesado { get; set; }
        public double? Importe1 { get; set; }
        public string FormaPago1 { get; set; }
        public double? Importe2 { get; set; }
        public string FormaPago2 { get; set; }
        public TimeSpan? HoraInicio { get; set; }
        public DateTime? DiaInicio { get; set; }
        public bool EstoyAnulado { get; set; }
        public string huella { get; set; }
        public string Url { get; set; }
        public string DocPrevio { get; set; }
    }

}