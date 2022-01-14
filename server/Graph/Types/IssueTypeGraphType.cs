using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class IssueTypeGraphType : EnumerationGraphType<IssueType>
    {
        public IssueTypeGraphType()
        {
            Name = "IssueType";
            Description = "Type of an issue";

            AddValue("UNKNOWN", "Unknown", (int)IssueType.Unknown);
            AddValue("TASK", "A task", (int)IssueType.Task);
            AddValue("BUG", "A bug", (int)IssueType.Bug);
            AddValue("STORY", "A story", (int)IssueType.Story);
            AddValue("IMPROVEMENT", "An improvement", (int)IssueType.Improvement);
            AddValue("IMPROVEMENT", "An improvement", (int)IssueType.Improvement);
        }
    }
}