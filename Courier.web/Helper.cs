using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Courier.web
{
  public static class DALHelper
  {

    public static Expression<Func<T, T>> GetExpression<T>(string propertyNames)
    {
      try
      {
        var xParameter = Expression.Parameter(typeof(T), "parameter");

        var xNew = Expression.New(typeof(T));

        var selectFields = propertyNames.Split(',').Select(parameter => parameter.Trim())
            .Select(parameter =>
            {
              var prop = typeof(T).GetProperty(parameter);

              if (prop == null) // The field doesn't exist
            {
                return null;
              }
              var xOriginal = Expression.Property(xParameter, prop);

              return Expression.Bind(prop, xOriginal);
            }
            ).Where(x => x != null);

        var lambda = Expression.Lambda<Func<T, T>>(Expression.MemberInit(xNew, selectFields), xParameter);
        return lambda;
      }
      catch
      {
        return null;
      }
    }
  }
}
