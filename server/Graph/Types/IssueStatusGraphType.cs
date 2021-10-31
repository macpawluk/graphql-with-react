using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class IssueStatusGraphType : EnumerationGraphType<IssueStatus>
    {
        public IssueStatusGraphType()
        {
            Name = "IssueStatus";
            Description = "Status of an issue";

            AddValue("Unknown", "Unknown", (int)IssueStatus.Unknown);
            AddValue("NotStarted", "The issue is not started", (int)IssueStatus.NotStarted);
            AddValue("InProgress", "The issue is in progress", (int)IssueStatus.InProgress);
            AddValue("Paused", "The issue is paused", (int)IssueStatus.Paused);
            AddValue("Completed", "The issue is completed", (int)IssueStatus.Completed);
        }
    }
}