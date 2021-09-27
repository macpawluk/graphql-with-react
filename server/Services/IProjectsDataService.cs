using MyPlays.GraphQlWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Services
{
    public interface IProjectsDataService
    {
        Task<Project> GetProjectByIdAsync(string id, bool withIssues);

        Task<Project[]> GetProjectsAsync(IReadOnlyCollection<string> idsFilter, bool withIssues);

        Task<IReadOnlyCollection<Issue>> GetIssuesByIdsAsync(List<string> ids);
    }
}