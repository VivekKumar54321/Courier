using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Courier.web.Models
{
  public class CourierRuns
  {
    public int CourierRunsId { get; set; }
    public string RunName { get; set; }
    public bool IsRegularRun { get; set; }
  }
}
