using Courier.web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Courier.web.Database
{
  public class CourierContext : DbContext
  {
    public CourierContext(DbContextOptions<CourierContext> options)
          : base(options)
    {
    }

    public DbSet<Courier.web.Models.Courier> Courier { get; set; }
    public DbSet<Courier.web.Models.CourierRuns> CourierRuns { get; set; }
    public DbSet<Courier.web.Models.CourierRunDetail> CourierRunDetail { get; set; }

   
  }
}
