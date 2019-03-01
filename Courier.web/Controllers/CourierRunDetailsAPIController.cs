using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Courier.web.Database;
using Courier.web.Models;

namespace Courier.web.Controllers
{
  [Produces("application/json")]
  [Route("~/api/CourierRunDetailsAPI")]

  public class CourierRunDetailsAPIController : ControllerBase
  {
    private readonly CourierContext _context;
    private readonly ICourierRunDetailService _courierRunDetailService;

    public CourierRunDetailsAPIController(CourierContext context, ICourierRunDetailService courierRunDetailService)
    {
      _context = context;
      _courierRunDetailService = courierRunDetailService;
    }
    
    // GET: api/CourierRunDetailsAPI
    [Route("GetCourierRunDetail"), HttpGet]
    public async Task<ActionResult<IEnumerable<CourierRunDetail>>> GetCourierRunDetail()
    { 
                  if (!ModelState.IsValid)
                  {
                    return BadRequest();
                  }

  var c = _context.CourierRunDetail.ToList();

      return await _context.CourierRunDetail.Include(X => X.Courier).Include(X => X.CourierRuns).ToListAsync();
    
    }
    
    //Dropdown for CourierRUns
    [HttpGet, Route("~/api/CourierRunDetailsAPI/GetCourierRunsDropDown")]
    public async Task<ActionResult<IEnumerable<DropDownModel>>> GetCourierRunsDropDown()
    {
      return await _context.CourierRuns.Select(x => new DropDownModel { Id = x.CourierRunsId, Value = x.RunName }).ToListAsync();

    }
    
    //Dropdown for Courier
    [HttpGet, Route("~/api/CourierRunDetailsAPI/GetCourierDropDown")]
    public async Task<ActionResult<IEnumerable<DropDownModel>>> GetCourierDropDown()
    {
      return await _context.Courier.Select(x => new DropDownModel { Id = x.CourierId, Value = x.CourierName }).ToListAsync();

    }
        
    // POST: api/CourierRunDetails
    [Route("~/api/CourierRunDetailsAPI/PostCourierRunDetails"), HttpPost]
    public async Task<ActionResult<CourierRunDetail>> PostCourierRunDetails([FromBody]CourierRunDetail courierRunDetail)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }


      var model = new CourierRunDetail()
      {
        CourierRunDetailId = courierRunDetail.CourierRunDetailId,
        CourierId = courierRunDetail.Courier.CourierId,
        CourierRunsId = courierRunDetail.CourierRuns.CourierRunsId,
        NumberOfSamples = courierRunDetail.NumberOfSamples,
        CourierArrivalTime = courierRunDetail.CourierArrivalTime

      };


      _context.CourierRunDetail.Add(model);
      await _context.SaveChangesAsync();
      //return CreatedAtAction("GetCourierRunDetail", new { id = courierRunDetail.CourierRunDetailId }, courierRunDetail);
    return Ok(new ResponseResult { Message = $"Successfully Created" });
    }

    //Get :api/CourierRunDetailsAPI/{id}
    [HttpGet, Route("~/api/CourierRunDetailsAPI/GetCourierRunDetail/{id}")]
    public async Task<ActionResult<CourierRunDetail>> GetCourierRunDetail(int id)
    {
      var courierRunDetail = await _context.CourierRunDetail.Include(x => x.CourierRuns).Include(x => x.Courier).Where(x => x.CourierRunDetailId == id).FirstOrDefaultAsync();
           
      if (courierRunDetail == null)
      {
        return NotFound();
      }

      return courierRunDetail;
    }

    //Post : api/CourierRunDetailsAPI/PutCourierRunDetails
    [Route("PutCourierRunDetails"), HttpPost]
    public async Task<ActionResult> PutCourierRunDetails([FromBody] CourierRunDetail courierRunDetail)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var v = await _context.CourierRunDetail.Where(x => x.CourierRunDetailId == courierRunDetail.CourierRunDetailId).FirstOrDefaultAsync();
      v.CourierRunsId = courierRunDetail.CourierRuns.CourierRunsId;
      v.CourierId = courierRunDetail.Courier.CourierId;
      v.NumberOfSamples = courierRunDetail.NumberOfSamples;
      v.CourierArrivalTime = System.DateTime.Now;
      _context.Entry(v).State = EntityState.Modified;
      await _context.SaveChangesAsync();
      //return Ok();
      return Ok(new ResponseResult { Message = $"Successfully Updated" });
    }
    
    // DELETE: api/CourierRunDetails/5
    [Route("~/api/CourierRunDetailsAPI/DeleteCourierRunDetails/{id}"), HttpDelete]
    public async Task<ActionResult<CourierRunDetail>> DeleteCourierRunDetails(int id)
    {

      var courierRunDetail = await _context.CourierRunDetail.FindAsync(id);
      if (courierRunDetail == null)
      {
        return NotFound();
      }

      _context.CourierRunDetail.Remove(courierRunDetail);
      await _context.SaveChangesAsync();

      // return courierRunDetail;
      return Ok(new ResponseResult { Message = $"Successfully Deleted" });
    }



    // Paging
    [Route("getpagedlistCRD"), HttpPost]
    public async Task<object> getpagedlistCRD([FromBody] Search search)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return await _courierRunDetailService.GetCourierRunDetailListAsync(orderBy: search.OrderBy, searchFilter: search.SearchText, page: search.PageNumber, pageSize: search.PageSize);
    }



    //DROPDOWN 
    public class DropDownModel
    {
      public int Id { get; set; }
      public string Value { get; set; }
    }


    //Message
    public class ResponseResult
    {
      public string Message { get; set; }
    }
  }
}
