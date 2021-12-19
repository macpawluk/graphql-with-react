using GraphQL;
using GraphQL.Types;
using MongoDB.Driver;
using MyPlays.GraphQlWebApi.Extensions;
using MyPlays.GraphQlWebApi.Graph.Types;
using MyPlays.GraphQlWebApi.Models;
using MyPlays.GraphQlWebApi.Services;
using System;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Graph
{
    public class ProjectsMutation : ObjectGraphType
    {
        private readonly IProjectsDataService _dataService;

        public ProjectsMutation(IProjectsDataService dataService)
        {
            _dataService = dataService;
            Name = "Mutation";

            Field<ProjectGraphType>(
               "addProject",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<ProjectInsertGraphType>> { Name = "project" }
               ),
               resolve: context => AddProject(context));

            Field<ProjectGraphType>(
                "updateProject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ProjectInputGraphType>> { Name = "project" }
                ),
                resolve: context => UpdateProject(context));

            Field<ProjectGraphType>(
                "removeProject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<EntityWithIdInputGraphType>> { Name = "project" }
                ),
                resolve: context => RemoveProject(context));

            Field<IssueGraphType>(
               "addIssue",
               arguments: new QueryArguments(
                   new QueryArgument<IdGraphType> { Name = "projectId" },
                   new QueryArgument<NonNullGraphType<IssueInsertGraphType>> { Name = "issue" }
               ),
               resolve: context => AddIssue(context));

            Field<IssueGraphType>(
                "updateIssue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IssueInputGraphType>> { Name = "issue" }
                ),
                resolve: context => UpdateIssue(context));

            Field<IssueGraphType>(
                "removeIssue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<EntityWithIdInputGraphType>> { Name = "issue" }
                ),
                resolve: context => RemoveIssue(context));
        }

        private async Task<Project> AddProject(IResolveFieldContext<object> context)
        {
            var project = context.GetArgument<Project>("project");
            project.Updated = DateTime.Now;

            var result = await _dataService.AddEnity(project);
            result.Issues = Array.Empty<string>();

            return result;
        }

        private async Task<Project> UpdateProject(IResolveFieldContext<object> context)
        {
            var project = context.GetArgument<Project>("project");
            var result = await _dataService.UpdateEnityById<Project>(
                project.Id,
                builder => builder
                    .Set(nameof(Project.Name), project.Name)
                    .Set(nameof(Project.Abbreviation), project.Abbreviation)
                    .Set(nameof(Project.Description), project.Description)
                    .Set(nameof(Project.Color), project.Color)
                    .Set(nameof(Project.Updated), DateTime.Now)
                );

            return result;
        }

        private async Task<Project> RemoveProject(IResolveFieldContext<object> context)
        {
            var entityWithId = context.GetArgument<EntityWithId>("project");
            var project = await _dataService.GetProjectByIdAsync(entityWithId.Id, withIssues: false);
            var deleteProjectTask = _dataService.DeleteEnityById<Project>(entityWithId.Id);
            var deleteIssuesTask = _dataService.DeleteEnities<Issue>(i => i.Project.Id == entityWithId.Id);

            await Task.WhenAll(deleteProjectTask, deleteIssuesTask);

            return project;
        }

        private async Task<Issue> AddIssue(IResolveFieldContext<object> context)
        {
            var issue = context.GetArgument<Issue>("issue");
            var projectId = context.GetArgument<string>("projectId");
            var now = DateTime.Now;

            var project = await _dataService.GetEntityByIdAsync<Project>(projectId);
            issue.Project = project.ToEntityRef();
            issue.Updated = now;
            issue.LastStatusChange = now;

            var result = await _dataService.AddEnity(issue);

            return result;
        }

        private async Task<Issue> UpdateIssue(IResolveFieldContext<object> context)
        {
            var issue = context.GetArgument<Issue>("issue");

            var issueDb = await _dataService.GetEntityByIdAsync<Issue>(issue.Id);

            var result = await _dataService.UpdateEnityById<Issue>(
                issue.Id,
                builder => builder
                    .Set(nameof(Issue.Name), issue.Name)
                    .Set(nameof(Issue.Description), issue.Description)
                    .Set(nameof(Issue.Type), issue.Type)
                    .Set(nameof(Issue.Status), issue.Status)
                    .Set(nameof(Issue.Updated), DateTime.Now)
                    .ConditionalSet(nameof(Issue.LastStatusChange), issueDb.Status != issue.Status, () => DateTime.Now)
                );

            return result;
        }

        private async Task<Issue> RemoveIssue(IResolveFieldContext<object> context)
        {
            var entityWithId = context.GetArgument<EntityWithId>("issue");
            var issue = await _dataService.GetEntityByIdAsync<Issue>(entityWithId.Id);
            await _dataService.DeleteEnityById<Issue>(entityWithId.Id);

            return issue;
        }
    }
}