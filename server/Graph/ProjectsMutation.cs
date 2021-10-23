using GraphQL;
using GraphQL.Types;
using MongoDB.Driver;
using MyPlays.GraphQlWebApi.Graph.Types;
using MyPlays.GraphQlWebApi.Models;
using MyPlays.GraphQlWebApi.Services;
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
                "removeProject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<EntityWithIdInputGraphType>> { Name = "project" }
                ),
                resolve: context => RemoveProject(context));

            Field<ProjectGraphType>(
                "editProject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ProjectInputGraphType>> { Name = "project" }
                ),
                resolve: context => EditProject(context));

            Field<ProjectGraphType>(
                "addProject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ProjectInsertGraphType>> { Name = "project" }
                ),
                resolve: context => AddProject(context));
        }

        private async Task<Project> RemoveProject(IResolveFieldContext<object> context)
        {
            var entityWithId = context.GetArgument<EntityWithId>("project");
            var project = await _dataService.GetProjectByIdAsync(entityWithId.Id, withIssues: false);
            await _dataService.DeleteEnityById<Project>(entityWithId.Id);

            return project;
        }

        private async Task<Project> EditProject(IResolveFieldContext<object> context)
        {
            var project = context.GetArgument<Project>("project");
            var result = await _dataService.UpdateEnityById<Project>(
                project.Id,
                builder => builder
                    .Set(nameof(Project.Name), project.Name)
                    .Set(nameof(Project.Abbreviation), project.Abbreviation)
                    .Set(nameof(Project.Description), project.Description)
                    .Set(nameof(Project.Color), project.Color)
                );

            return result;
        }

        private async Task<Project> AddProject(IResolveFieldContext<object> context)
        {
            var project = context.GetArgument<Project>("project");
            var result = await _dataService.AddEnity(project);

            return result;
        }
    }
}