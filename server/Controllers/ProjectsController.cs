using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MyPlays.WebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IOptions<AppSettings> appSettings, ILogger<ProjectsController> logger)
            => (_appSettings, _logger) = (appSettings.Value, logger);

        [HttpGet]
        public async Task<IEnumerable<Project>> Get()
        {
            var mongoUrl = MongoUrl.Create(_appSettings.MongoUrl);
            var client = new MongoClient(mongoUrl);
            var database = client.GetDatabase(mongoUrl.DatabaseName);
            var projectsCollection = database.GetCollection<Project>("projects");

            return await (await projectsCollection.FindAsync(p => true)).ToListAsync();
        }
    }
}