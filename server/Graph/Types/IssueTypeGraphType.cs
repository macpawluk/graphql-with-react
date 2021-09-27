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

            AddValue("Unknown", "Unknown", (int)IssueType.Unknown);
            AddValue("Task", "A task", (int)IssueType.Task);
            AddValue("Bug", "A bug", (int)IssueType.Bug);
            AddValue("Story", "A story", (int)IssueType.Story);
            AddValue("Improvement", "An improvement", (int)IssueType.Improvement);
        }
    }
}