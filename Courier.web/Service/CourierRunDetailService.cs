using Courier.web.Database;
using Courier.web.Models;
using Courier.web.Paging;
using Courier.web.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Courier.web.Service
{
  public class CourierRunDetailService : ICourierRunDetailService
  {
    private readonly CourierContext _dbcontext;
    protected readonly IAsyncRepository<CourierRunDetail> _courierRunDetailRepository;

    public CourierRunDetailService(CourierContext dbcontext, IAsyncRepository<CourierRunDetail> courierRunDetailRepository)
    {
      _courierRunDetailRepository = courierRunDetailRepository;
      _dbcontext = dbcontext;
    }

    //private static readonly Expression<Func<CourierRuns, bool>> nonDeleted = (d => d.IsRegularRun == false);
    private static Expression<Func<CourierRunDetail, bool>> SearchMultipleColumns(string openSearchString)
    {
      Expression<Func<CourierRunDetail, bool>> satisfiesSearch = d => d.Courier.CourierName.ToLower().Contains(openSearchString.ToLower()) || d.CourierRuns.RunName.ToLower().Contains(openSearchString.ToLower()); ;
      return satisfiesSearch;
    }

    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByCourierRunDetailsId = d => d.OrderBy(order => order.CourierRunDetailId);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByCourierName = d => d.OrderBy(order => order.Courier.CourierName);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByRunName = d => d.OrderBy(order => order.CourierRuns.RunName);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByNumberOfSample = d => d.OrderBy(order => order.NumberOfSamples);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByNumberOfSampleDsc = d => d.OrderByDescending(order => order.NumberOfSamples);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByCourierRunDetailsIdDsc = d => d.OrderByDescending(order => order.CourierRunDetailId);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByRunNameDsc = d => d.OrderByDescending(order => order.CourierRuns.RunName);
    private static readonly Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderByCourierNameDsc = d => d.OrderByDescending(order => order.Courier.CourierName);


    public async Task<PagedResult<CourierRunDetail>> GetCourierRunDetailListAsync(string sortBy, string searchFilter, int page, int pageSize)
    {
      Func<IQueryable<CourierRunDetail>, IOrderedQueryable<CourierRunDetail>> orderby = orderByCourierRunDetailsId;
      switch (sortBy)
      {
        case "courierRunDetailsId":
          orderby = orderByCourierRunDetailsId;
          break;
        case "courierRunDetailsId_Desc":
          orderby = orderByCourierRunDetailsIdDsc;
          break;
       
        case "CourierName":
          orderby = orderByCourierName;
          break;
        case "CourierName_Desc":
          orderby = orderByCourierNameDsc;
          break;

        case "RunName_Desc":
          orderby = orderByRunNameDsc;
          break;
        case "RunName":
          orderby = orderByRunName;
          break;

        case "NumberOfSamples":
          orderby = orderByNumberOfSample;
          break;
        case "NumberOfSamples_Desc":
          orderby = orderByNumberOfSampleDsc;
          break;
      }
      var result = await _courierRunDetailRepository.ListAllAsync(filter: SearchMultipleColumns(searchFilter), page: page, pageSize: pageSize, orderBy: orderby, enableNoTracking: true, includeProperties: "Courier,CourierRuns");
      return result;
    }

  }
  }



  public interface ICourierRunDetailService
  {
    Task<PagedResult<CourierRunDetail>> GetCourierRunDetailListAsync(string orderBy, string searchFilter, int page, int pageSize);
  }






