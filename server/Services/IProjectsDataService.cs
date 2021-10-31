using MongoDB.Driver;
using MyPlays.GraphQlWebApi.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Services
{
    public interface IProjectsDataService
    {
        Task<Project> GetProjectByIdAsync(string id, bool withIssues);

        Task<Project[]> GetProjectsAsync(IReadOnlyCollection<string> idsFilter, bool withIssues);

        Task<IReadOnlyCollection<Issue>> GetIssuesByIdsAsync(List<string> ids);

        Task<T> GetEntityByIdAsync<T>(string id)
            where T : EntityWithId;

        Task DeleteEnityById<T>(string id)
            where T : EntityWithId;

        Task<T> UpdateEnityById<T>(string id, Func<UpdateDefinitionBuilder<T>, UpdateDefinition<T>> updateCallback)
            where T : EntityWithId;

        Task<T> AddEnity<T>(T document)
            where T : EntityWithId;
    }
}