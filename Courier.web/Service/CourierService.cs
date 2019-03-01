using Courier.web.Database;
using Courier.web.Paging;
using Courier.web.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Courier.web.Service
{
  public class CourierService : ICourierService
  {
   
      private readonly CourierContext _dbcontext;
      protected readonly IAsyncRepository<Courier.web.Models.Courier> _courierRepository;

      public CourierService(CourierContext dbcontext, IAsyncRepository<Courier.web.Models.Courier> courierRunRepository)
      {
        _courierRepository = courierRunRepository;
        _dbcontext = dbcontext;
      }

      //private static readonly Expression<Func<CourierRuns, bool>> nonDeleted = (d => d.IsRegularRun == false);
      private static Expression<Func<Courier.web.Models.Courier, bool>> SearchMultipleColumns(string openSearchString)
      {
        Expression<Func<Courier.web.Models.Courier, bool>> satisfiesSearch = d => d.CourierName.ToLower().Contains(openSearchString.ToLower());
        return satisfiesSearch;
      }



      private static readonly Func<IQueryable<Courier.web.Models.Courier>, IOrderedQueryable<Courier.web.Models.Courier>> orderByCourierId = d => d.OrderBy(order => order.CourierId);
      private static readonly Func<IQueryable<Courier.web.Models.Courier>, IOrderedQueryable<Courier.web.Models.Courier>> orderByCourierName = d => d.OrderBy(order => order.CourierName);
      private static readonly Func<IQueryable<Courier.web.Models.Courier>, IOrderedQueryable<Courier.web.Models.Courier>> orderByCourierIdDsc = d => d.OrderByDescending(order => order.CourierId);
      private static readonly Func<IQueryable<Courier.web.Models.Courier>, IOrderedQueryable<Courier.web.Models.Courier>> orderByCourierNameDsc = d => d.OrderByDescending(order => order.CourierName);


      public async Task<PagedResult<Courier.web.Models.Courier>> GetCouriersListAsync(string sortBy, string searchFilter, int page, int pageSize)
      {
        Func<IQueryable<Courier.web.Models.Courier>, IOrderedQueryable<Courier.web.Models.Courier>> orderby = orderByCourierId;
        switch (sortBy)
        {
          case "courierId":
            orderby = orderByCourierId;
            break;
          case "courierId_Desc":
            orderby = orderByCourierIdDsc;
            break;
          case "CourierName_Desc":
            orderby = orderByCourierNameDsc;
            break;
          case "CourierName":
            orderby = orderByCourierName;
            break;
          
        }
        var result = await _courierRepository.ListAllAsync(filter: SearchMultipleColumns(searchFilter), page: page, pageSize: pageSize, orderBy: orderby, enableNoTracking: true, includeProperties: "");
        return result;
      }
    }

  }

  public interface ICourierService
  {
    Task<PagedResult<Courier.web.Models.Courier>> GetCouriersListAsync(string orderBy, string searchFilter, int page, int pageSize);
  }







