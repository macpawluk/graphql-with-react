using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class IssueGraphType : ObjectGraphType<Issue>
    {
        public IssueGraphType()
        {
            Name = "Issue";

            Field(h => h.Id).Description("The id of the issue.");
            Field(h => h.Name).Description("The name of the issue.");
            Field(h => h.Description).Description("The description of the issue.");
            Field<IssueTypeGraphType>(nameof(Issue.Type), "The type of the issue.", resolve: x => (int)x.Source.Type);
            Field<IssueStatusGraphType>(nameof(Issue.Status), "The status of the issue.", resolve: x => (int)x.Source.Status);
            Field(h => h.Updated).Description("The timestamp of the last data update.");
            Field(h => h.LastStatusChange).Description("The timestamp of the last status change.");
        }
    }
}