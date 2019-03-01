using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Courier.web.Models
{
  public class Search
  {

    public string OrderBy { get; set; }

  
    public string SearchText { get; set; }


    public int PageSize { get; set; } = 5;

 
    public int PageNumber { get; set; } = 1;

 
    public string totalRecords { get; set; }

  }
}
