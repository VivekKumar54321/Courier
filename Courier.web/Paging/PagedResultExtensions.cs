using Courier.web.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Courier.web.Paging
{
    public static class PagedResultExtensions
    {
        public static PagedResult<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize)
        {
            var result = new PagedResult<T>
            {
                CurrentPage = page,
                PageSize = pageSize,
                RowCount = query.Count()
            };

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = query.Skip(skip).Take(pageSize).ToList();

            return result;
        }
    }
  public static class PagedResultEFCoreExtensions
  {
    public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query, int page, int pageSize)
    {
      var result = new PagedResult<T>
      {
        CurrentPage = page,
        PageSize = pageSize,
        RowCount = await query.CountAsync()
      };

      var pageCount = (double)result.RowCount / pageSize;
      result.PageCount = (int)Math.Ceiling(pageCount);

      var skip = (page - 1) * pageSize;
      result.Results = await query.Skip(skip).Take(pageSize).ToListAsync();

      return result;
    }



    public static  PagedResult<T> GetPaged<T>(this List<T> listofResult, int TotalRows, int page, int pageSize)
    {
      var result = new PagedResult<T>
      {
        CurrentPage = page,
        PageSize = pageSize,
        RowCount = TotalRows
      };

      var pageCount = (double)result.RowCount / pageSize;
      result.PageCount = (int)Math.Ceiling(pageCount);


      result.Results = listofResult;

      return result ;
    }
  }
}
