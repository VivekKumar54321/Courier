using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Courier.web.Database;
using Courier.web.Repository;
using Courier.web.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Courier.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});
            services.AddCors();

             services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                            .AllowAnyMethod()
                                                             .AllowAnyHeader()));

      services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
      services.AddTransient<ICourierRunService, CourierRunService>();
      services.AddTransient<ICourierRunDetailService, CourierRunDetailService>();
      services.AddTransient<ICourierService, CourierService>();


      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

              services.AddDbContext<CourierContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("CourierContext")));
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //else
            //{
            //    app.UseExceptionHandler("/Home/Error");
            //    app.UseHsts();
            //}
      app.UseCors("AllowAll");
      app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

      app.UseMvc();
      //(routes =>
      //    {
      //        routes.MapRoute(
      //            name: "default",
      //            template: "{controller=Home}/{action=Index}/{id?}");
      //    });


      if (env.IsDevelopment())
      {
        app.UseWebSockets().UseNgProxy();
      }
      else
      {
        // app.UseStaticFiles(); // Uncomment this line if it is not present somewhere else in the Configure method.
        app.UseNgRoute();
      }
    }
    }
}
