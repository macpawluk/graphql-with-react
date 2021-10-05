using GraphQL;
using GraphQL.Types;
using MyPlays.GraphQlWebApi.Graph.Types;
using MyPlays.GraphQlWebApi.Services;

namespace MyPlays.GraphQlWebApi.Graph
{
    /* These are exemplary queries.
       query projectQuery {
           project(id: "6158a8471c3b7c8990e9c8ec") {
               id,
               name,
               issuesConnection(first: 10) {
                   totalCount,
                   pageInfo {
                       endCursor,
                       hasNextPage
                   },
                   items {
                       id,
                       name,
                       type
                   }
               }
           }
       }

       query projectsQuery {
           projects {
               id,
               name,
               issuesConnection(first: 10) {
                     totalCount,
               }
           }
       }
    */

    public class ProjectsQuery : ObjectGraphType<object>
    {
        public ProjectsQuery(IProjectsDataService dataService)
        {
            Name = "Query";

            Field<ListGraphType<ProjectGraphType>>(
                "projects",
                resolve: context => dataService.GetProjectsAsync(idsFilter: null, context.SubFields.ContainsKey("issuesConnection")));
            Field<ProjectGraphType>(
                "project",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the project" }
                ),
                resolve: context => dataService.GetProjectByIdAsync(
                    context.GetArgument<string>("id"),
                    context.SubFields.ContainsKey("issuesConnection"))
            );
        }
    }
}