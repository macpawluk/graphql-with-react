using GraphQL.Types;
using MyPlays.GraphQlWebApi.Extensions;
using MyPlays.GraphQlWebApi.Models;
using MyPlays.GraphQlWebApi.Services;
using System.Linq;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class ProjectGraphType : ObjectGraphType<Project>
    {
        public ProjectGraphType(IProjectsDataService dataService)
        {
            Name = "Project";

            Field(h => h.Id).Description("The id of the project.");
            Field(h => h.Name).Description("The name of the project.");
            Field(h => h.Abbreviation).Description("The abbreviation of the project.");
            Field(h => h.Description).Description("The description of the project.");
            Field(h => h.Color).Description("The color of the project.");

            Connection<IssueGraphType>()
                .Name("issuesConnection")
                .Description("A list of a project's issues.")
                .Bidirectional()
                .Resolve(context => context.GetPagedResults(
                    context.Source.Issues?.ToList(),
                    dataService.GetIssuesByIdsAsync));
        }
    }
}