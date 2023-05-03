using Microsoft.EntityFrameworkCore;
using Tarea_STAR.Model;

namespace Tarea_STAR.Data
{
    public class AppDBContext : DbContext
    {

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) 
        { 
        
        }

        public DbSet<Ventas> Ventas { get; set; }
    }
}
