using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Courier.web.Database;
using Courier.web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Courier.web.Controllers
{
  [Produces("application/json")]
  [Route("~/api/CouriersAPI")]

  public class CouriersAPIController : ControllerBase
  {
    private readonly CourierContext _context;
    private readonly ICourierService _courierService;

    public CouriersAPIController(CourierContext context, ICourierService courierService)
    {
      _context = context;
      _courierService = courierService;
    }

    // GET: api/CouriersApi
    [HttpGet, Route("~/api/CouriersAPI/GetCouriersList")]
    public async Task<ActionResult<IEnumerable<Courier.web.Models.Courier>>> GetCouriers()
    {

      return await _context.Courier.ToListAsync();

    }

    // GET: api/CouriersApi/5
    [HttpGet("GetCourier/{id}")]
    public async Task<IActionResult> GetCourier(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var courier = await _context.Courier.FindAsync(id);

      if (courier == null)
      {
        return NotFound();
      }

      return Ok(courier);
    }

    // PUT: api/CouriersApi/5
    [HttpPost, Route("PutCourier")]
    public async Task<IActionResult> PutCourier([FromBody] Courier.web.Models.Courier courier)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var cors = await _context.Courier.FindAsync(courier.CourierId);
      cors.CourierName = courier.CourierName;


      _context.Entry(cors).State = EntityState.Modified;
      await _context.SaveChangesAsync();

    //  return Ok("Updated");
      return Ok(new ResponseResult { Message = $"{courier.CourierName}  Successfully Updated" });


    }

    // POST: api/CouriersApi
    [Route("~/api/CouriersAPI/PostCourier"), HttpPost]
    public async Task<IActionResult> PostCourier([FromBody] Courier.web.Models.Courier courier)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (_context.Courier.Any(x => x.CourierName == courier.CourierName))
      {

        return Ok(new ResponseResult { Message = $"{courier.CourierName} Already Exists" });
      }
      else
      {
        _context.Courier.Add(courier);
        await _context.SaveChangesAsync();

        return Ok(new ResponseResult { Message= $"{courier.CourierName}  Successfully Created" });
      }
    }


    // DELETE: api/CouriersApi/5
    [HttpDelete, Route("DeleteCourier/{id}")]
    public async Task<IActionResult> DeleteCourier(int id)
    {

      var cour = await _context.Courier.FindAsync(id);
      if (cour == null)
      {
        return NotFound();
      }

      _context.Courier.Remove(cour);
      await _context.SaveChangesAsync();

     // return Ok(cour);
      return Ok(new ResponseResult { Message = $"{cour.CourierName}  Successfully Deleted" });
    }

    // Paging
    [Route("getpagedlist"), HttpPost]
    public async Task<object> getpagedlist([FromBody] Search search)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return await _courierService.GetCouriersListAsync(orderBy: search.OrderBy, searchFilter: search.SearchText, page: search.PageNumber, pageSize: search.PageSize);
    }

    private bool CourierExists(int id)
    {
      return _context.Courier.Any(e => e.CourierId == id);
    }

    //Message
    public class ResponseResult
    {
      public string Message { get; set; }
    }

  }
}
