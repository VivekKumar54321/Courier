using Courier.web.Database;
using Courier.web.Models;
using Courier.web.Paging;
using Courier.web.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Courier.web.Service.CourierRunService;

namespace Courier.web.Service
{
  public class CourierRunService: ICourierRunService
  {
    private readonly CourierContext _dbcontext;
    protected readonly IAsyncRepository<CourierRuns> _courierRunRepository;

    public CourierRunService(CourierContext dbcontext, IAsyncRepository<CourierRuns> courierRunRepository)
    {
      _courierRunRepository = courierRunRepository;
      _dbcontext = dbcontext;
    }

    //private static readonly Expression<Func<CourierRuns, bool>> nonDeleted = (d => d.IsRegularRun == false);
    private static Expression<Func<CourierRuns, bool>> SearchMultipleColumns(string openSearchString)
    {
      Expression<Func<CourierRuns, bool>> satisfiesSearch = d => d.RunName.ToLower().Contains(openSearchString.ToLower());
      return satisfiesSearch;
    }



    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByCourierRunsId = d => d.OrderBy(order => order.CourierRunsId);
    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByRunName = d => d.OrderBy(order => order.RunName);
    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByIsRegularRun = d => d.OrderBy(order => order.IsRegularRun);
    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByCourierRunsIdDsc = d => d.OrderByDescending(order => order.CourierRunsId);
    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByRunNameDsc = d => d.OrderByDescending(order => order.RunName);
    private static readonly Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderByIsRegularRunDsc = d => d.OrderByDescending(order => order.IsRegularRun);


    public async Task<PagedResult<CourierRuns>> GetCourierListAsync(string sortBy, string searchFilter, int page, int pageSize)
    {
       Func<IQueryable<CourierRuns>, IOrderedQueryable<CourierRuns>> orderby = orderByCourierRunsId;
      switch (sortBy) 
      {
        case "courierRunsId":
          orderby = orderByCourierRunsId;
          break;
         case "courierRunsId_Desc":
          orderby = orderByCourierRunsIdDsc;
        break;
        case "RunName_Desc":
          orderby = orderByRunNameDsc;
          break;
        case "RunName":
          orderby = orderByRunName;
          break;
        case "isRegularRun":
          orderby = orderByIsRegularRun;
          break;
        case "isRegularRun_Desc":
          orderby = orderByIsRegularRunDsc;
          break;
      }
      var result= await _courierRunRepository.ListAllAsync(filter: SearchMultipleColumns(searchFilter), page: page, pageSize: pageSize, orderBy:orderby, enableNoTracking: true, includeProperties: "");
      return result;
    }
  }
 
}

public interface ICourierRunService
  {
    Task<PagedResult<CourierRuns>> GetCourierListAsync( string orderBy, string searchFilter, int page, int pageSize);
  }







