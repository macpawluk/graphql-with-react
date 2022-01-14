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

            AddValue("UNKNOWN", "Unknown", (int)IssueStatus.Unknown);
            AddValue("NOT_STARTED", "The issue is not started", (int)IssueStatus.NotStarted);
            AddValue("IN_PROGRESS", "The issue is in progress", (int)IssueStatus.InProgress);
            AddValue("PAUSED", "The issue is paused", (int)IssueStatus.Paused);
            AddValue("COMPLETED", "The issue is completed", (int)IssueStatus.Completed);
        }
    }
}