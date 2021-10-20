using GraphQL;
using GraphQL.Types;
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
        }

        private async Task<Project> RemoveProject(IResolveFieldContext<object> context)
        {
            var entityWithId = context.GetArgument<EntityWithId>("project");
            var project = await _dataService.GetProjectByIdAsync(entityWithId.Id, withIssues: false);
            await _dataService.DeleteEnityById<Project>(entityWithId.Id);

            return project;
        }
    }
}