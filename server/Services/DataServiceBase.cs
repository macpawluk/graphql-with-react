using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MyPlays.GraphQlWebApi.Services
{
    public abstract class DataServiceBase
    {
        private readonly AppSettings _appSettings;

        protected DataServiceBase(IOptions<AppSettings> appSettings)
            => _appSettings = appSettings.Value;

        protected IMongoDatabase GetDatabase()
        {
            var mongoUrl = MongoUrl.Create(_appSettings.MongoUrl);
            var client = new MongoClient(mongoUrl);
            return client.GetDatabase(mongoUrl.DatabaseName);
        }
    }
}