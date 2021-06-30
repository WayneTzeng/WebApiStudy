using APIStudy.Models;
using Microsoft.EntityFrameworkCore;

namespace Staff.Models
{
    public class StaffContext :DbContext
    {
         public StaffContext(DbContextOptions<StaffContext> options)
                : base(options)
            {
            }

        public DbSet<StaffItem> StaffItems { get; set; }

    }
           
}
