using LinqKit;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MyPlays.GraphQlWebApi.Extensions;
using MyPlays.GraphQlWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Services
{
    public class ProjectsDataService : DataServiceBase, IProjectsDataService
    {
        public ProjectsDataService(IOptions<AppSettings> appSettings)
            : base(appSettings)
        {
        }

        public async Task<Project> GetProjectByIdAsync(string id, bool withIssues)
        {
            var projects = await GetProjectsAsync(new[] { id }, withIssues);
            return projects.FirstOrDefault();
        }

        public async Task<Project[]> GetProjectsAsync(IReadOnlyCollection<string> idsFilter, bool withIssues)
        {
            var database = GetDatabase();
            var projectsCollection = database.GetDBCollection<Project>();
            var issuesCollection = database.GetDBCollection<Issue>();

            var projectsExpr = PredicateBuilder
                .New<Project>(true)
                .ConditionalAnd(p => idsFilter.Contains(p.Id), idsFilter != null);

            var projectsTask = (await projectsCollection
                .FindAsync(projectsExpr))
                .ToListAsync();
            Task<List<Project>> projectsIssuesTask = Task.FromResult<List<Project>>(null);

            if (withIssues)
            {
                projectsIssuesTask = issuesCollection
                    .Aggregate()
                    .ConditionalStage(
                        idsFilter != null,
                        agg => agg.Match(i => idsFilter.Contains(i.Project.Id)))
                    .SortByDescending(i => i.LastStatusChange)
                    .ThenByDescending(i => i.Id)
                    .Group(new BsonDocument
                    {
                        { "_id", "$project._id" },
                        { "issues", new BsonDocument { { "$push", "$$ROOT._id" } } }
                    })
                    .As<Project>()
                    .ToListAsync();
            }

            await Task.WhenAll(projectsTask, projectsIssuesTask);

            var projects = projectsTask.Result;

            if (withIssues && projects.Any())
            {
                var projectsIssues = projectsIssuesTask.Result;
                var issuesDictionary = new Dictionary<string, string[]>();
                foreach (var entry in projectsIssues)
                {
                    issuesDictionary.Add(entry.Id, entry.Issues);
                }

                foreach (var project in projects)
                {
                    project.Issues = issuesDictionary.ContainsKey(project.Id)
                        ? issuesDictionary[project.Id]
                        : Array.Empty<string>();
                }
            }

            return projects.ToArray();
        }

        public async Task<IReadOnlyCollection<Issue>> GetIssuesByIdsAsync(List<string> ids)
        {
            var database = GetDatabase();
            var issuesCollection = database.GetDBCollection<Issue>();
            var issues = await (await issuesCollection.FindAsync(p => ids.Contains(p.Id))).ToListAsync();

            return issues.ToArray();
        }

        public async Task<T> GetEntityByIdAsync<T>(string id)
            where T : EntityWithId
        {
            var database = GetDatabase();
            var issuesCollection = database.GetDBCollection<T>();
            var entity = await (await issuesCollection.FindAsync(x => x.Id == id)).FirstOrDefaultAsync();

            return entity;
        }

        public async Task DeleteEnityById<T>(string id)
            where T : EntityWithId
        {
            var database = GetDatabase();
            var projectsCollection = database.GetDBCollection<T>();
            await projectsCollection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task DeleteEnities<T>(Expression<Func<T, bool>> filter)
        {
            var database = GetDatabase();
            var projectsCollection = database.GetDBCollection<T>();
            await projectsCollection.DeleteManyAsync(filter);
        }

        public async Task<T> UpdateEnityById<T>(string id, Func<UpdateDefinitionBuilder<T>, UpdateDefinition<T>> updateCallback)
            where T : EntityWithId
        {
            var database = GetDatabase();

            var updateBuilder = Builders<T>.Update;
            var updateDefinition = updateCallback(updateBuilder);

            var collection = database.GetDBCollection<T>();
            await collection.UpdateOneAsync(x => x.Id == id, updateDefinition);

            return await (await collection.FindAsync(x => x.Id == id)).FirstOrDefaultAsync();
        }

        public async Task<T> AddEnity<T>(T document)
           where T : EntityWithId
        {
            var database = GetDatabase();

            var collection = database.GetDBCollection<T>();
            await collection.InsertOneAsync(document);

            return document;
        }
    }
}