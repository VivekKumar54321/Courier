using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Courier.web.Database;
using Courier.web.Models;
using Courier.web.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Courier.web.Controllers
{
  [Route("api/[controller]")]
  [Produces("application/json")]
  //[Route("~/api/CourierRunsAPI")]

  public class CourierRunsAPIController : ControllerBase
  {
    private readonly CourierContext _context;
    private readonly ICourierRunService _courierRunService;


    public CourierRunsAPIController(CourierContext context,ICourierRunService courierRunService)
    {
      _context = context;
      _courierRunService = courierRunService;

    }

    // GET: api/CourierRuns
    [Route("~/api/CourierRunsAPI/GetCourierRuns"), HttpGet]
    public async Task<ActionResult<IEnumerable<CourierRuns>>> GetCourierRuns()
    {
      var gcr = _context.CourierRuns.ToList();
      return await _context.CourierRuns.ToListAsync();

    }

    // GET: api/CourierRuns/5
    [Route("~/api/CourierRunsAPI/GetCourierRuns/{id}"), HttpGet]
    public async Task<ActionResult<CourierRuns>> GetCourierRuns(int id)
    {
      var courierRuns = await _context.CourierRuns.FindAsync(id);

      if (courierRuns == null)
      {
        return NotFound();
      }

      return courierRuns;
    }

    
   //POST : api/CourierRuns
    [Route("~/api/CourierRunsAPI/PutCourierRuns"), HttpPost]
    public async Task<ActionResult> PutCourierRuns([FromBody] CourierRuns courierRuns)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var v = await _context.CourierRuns.FindAsync(courierRuns.CourierRunsId);
      v.RunName = courierRuns.RunName;
      v.IsRegularRun = courierRuns.IsRegularRun;
      _context.Entry(v).State = EntityState.Modified;
      await _context.SaveChangesAsync();

      //return Ok();
      return Ok(new ResponseResult { Message = $"{courierRuns.RunName} & {courierRuns.IsRegularRun}  Successfully Updated" });

    }


    // POST: api/CourierRuns
    [Route("~/api/CourierRunsAPI/PostCourierRuns"), HttpPost]
    public async Task<ActionResult<CourierRuns>> PostCourierRuns([FromBody]CourierRuns courierRuns)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }


      if (_context.CourierRuns.Any(x => x.RunName == courierRuns.RunName))
      {
       // return BadRequest(new ResponseResult { Message = $"{courierRuns.RunName} already exists" });
        return Ok(new ResponseResult { Message = $"{courierRuns.RunName} Already Exists" });
      }
      else
      {
        _context.CourierRuns.Add(courierRuns);
        await _context.SaveChangesAsync();
        return Ok(new ResponseResult { Message = $"{courierRuns.RunName} Successfully Created" });
      }

    }

    // DELETE: api/CourierRuns/5
    [Route("~/api/CourierRunsAPI/DeleteCourierRuns/{id}"), HttpDelete]
    public async Task<ActionResult<CourierRuns>> DeleteCourierRuns(int id)
    {
      var courierRuns = await _context.CourierRuns.FindAsync(id);
      if (courierRuns == null)
      {
        return NotFound();
      }

      _context.CourierRuns.Remove(courierRuns);
      await _context.SaveChangesAsync();

      //return courierRuns;
      return Ok(new ResponseResult { Message = $"{courierRuns.RunName} & {courierRuns.IsRegularRun}  Successfully Deleted" });
    }



    private bool CourierRunsExists(int id)
    {
      return _context.CourierRuns.Any(e => e.CourierRunsId == id);
    }

    // Paging
    [Route("getpagedlist"), HttpPost]
    public async Task<object> getpagedlist([FromBody] Search search)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
    
      //var sps = await _courierRunService.GetCourierListAsync(orderBy: search.OrderBy, searchFilter: search.SearchText, page: 1, pageSize: 10);
      return await _courierRunService.GetCourierListAsync(orderBy: search.OrderBy, searchFilter: search.SearchText, page: search.PageNumber, pageSize: search.PageSize);
    }

    //[Route("getpagedlist1"), HttpGet]
    //public async Task<object> getpagedlist1()
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }
      
    //  return new { name = "manxe" };
    //}

    public class ResponseResult
    {
      public string Message { get; set; }
    }

  } 
}
