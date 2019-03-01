using Courier.web.Database;
using Courier.web.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Courier.web.Repository
{
  public class EfRepository<T> : IAsyncRepository<T> where T : class
  {
    protected readonly CourierContext _dbcontext ;

    public EfRepository(CourierContext dbContext)
    {
      _dbcontext = dbContext;
    }

    public async Task<PagedResult<T>> ListAllAsync(Expression<Func<T, bool>> filter, int page, int pageSize, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, bool enableNoTracking = true, string includeProperties = "")
    {
      var query = GetIQueryableSet(filter, orderBy, "", includeProperties, page, pageSize, enableNoTracking);
      var result = await PagedResultEFCoreExtensions.GetPagedAsync(query, page, pageSize).ConfigureAwait(false);
      return result;
    }

    public virtual IQueryable<T> GetIQueryableSet(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string columnsToRetrieve = "", string includeProperties = "", int? pageNumber = default(int?), int? pageSize = default(int?), bool enableNoTracking = true)
    {

      IQueryable<T> query = enableNoTracking ? _dbcontext.Set<T>().AsNoTracking() : _dbcontext.Set<T>();

      if (filter != null)
      {
        query = query.Where(filter);
      }

      var propertiesToInclude = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
      foreach (var includeProperty in propertiesToInclude)
      {
        query = query.Include(includeProperty.Trim());
      }

      if (orderBy != null)
      {
        query = orderBy(query);
      }

      if (!string.IsNullOrWhiteSpace(columnsToRetrieve))
      {
        var selectExpression = DALHelper.GetExpression<T>(columnsToRetrieve);
        if (selectExpression != null)
        {
          query = query.Select(selectExpression);
        }
      }
      return query;
    }
  }

  public interface IAsyncRepository<T> where T:class
  {
    Task<PagedResult<T>> ListAllAsync(Expression<Func<T, bool>> filter, int page, int pageSize, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, bool enableNoTracking = true, string includeProperties = "");
  }
}
