using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Courier.web.Models

{
  public class CourierRunDetail
  {
    public int CourierRunDetailId { get; set; }
    
    public Courier Courier { get; set; }
    public int CourierId { get; set; }
        
    public CourierRuns CourierRuns { get; set; }
    public int CourierRunsId { get; set; }

    public int NumberOfSamples { get; set; }
    
    [DataType(DataType.DateTime)]
    public DateTime CourierArrivalTime { get; set; } = System.DateTime.Now;

  }
}

