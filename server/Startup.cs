using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyPlays.GraphQlWebApi.Graph;
using MyPlays.GraphQlWebApi.Graph.Types;
using MyPlays.GraphQlWebApi.Services;

namespace MyPlays.GraphQlWebApi
{
    public class Startup
    {
        private const string CorsPolicyName = "DefaultPolicy";

        public Startup(IConfiguration configuration)
            => Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();

                options.AddPolicy(CorsPolicyName, builder =>
                {
                    builder
                    .AllowAnyHeader()
                    .WithMethods("GET", "POST")
                    .WithOrigins(appSettings.CorsOrigin);
                });
            });

            services.AddControllers();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // GraphQL stuff
            services
                .AddTransient<IProjectsDataService, ProjectsDataService>()
                .AddSingleton<ProjectsQuery>()
                .AddSingleton<ProjectGraphType>()
                .AddSingleton<IssueGraphType>()
                .AddSingleton<IssueTypeGraphType>()
                .AddSingleton<ISchema, ProjectsSchema>()
                .AddGraphQL(options => options.EnableMetrics = true)
                .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
                .AddSystemTextJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(CorsPolicyName);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseGraphQL<ISchema>().UseGraphQLPlayground();
        }
    }
}