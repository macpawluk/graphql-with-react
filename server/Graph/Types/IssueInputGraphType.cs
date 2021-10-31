using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class IssueInputGraphType : InputObjectGraphType<Issue>
    {
        public IssueInputGraphType()
            : this(idNullable: false)
        {
        }

        protected IssueInputGraphType(bool idNullable)
        {
            Name = "IssueInput";

            Field(h => h.Id, nullable: idNullable).Description("The id of the issue.");
            Field(h => h.Name).Description("The name of the issue.");
            Field(h => h.Description).Description("The description of the issue.");
            Field<IssueTypeGraphType>(nameof(Issue.Type), "The type of the issue.", resolve: x => (int)x.Source.Type);
            Field<IssueStatusGraphType>(nameof(Issue.Status), "The status of the issue.", resolve: x => (int)x.Source.Status);
        }
    }

    public class IssueInsertGraphType : IssueInputGraphType
    {
        public IssueInsertGraphType()
            : base(idNullable: true)
        {
            Name = "IssueInsertInput";
        }
    }
}