using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class ProjectInputGraphType : InputObjectGraphType<Project>
    {
        public ProjectInputGraphType()
            : this(idNullable: false)
        {
        }

        protected ProjectInputGraphType(bool idNullable)
        {
            Name = "ProjectInput";

            Field(h => h.Id, nullable: idNullable).Description("The id of the project.");
            Field(h => h.Name).Description("The name of the project.");
            Field(h => h.Abbreviation).Description("The abbreviation of the project.");
            Field(h => h.Description).Description("The description of the project.");
            Field(h => h.Color).Description("The color of the project.");
        }
    }

    public class ProjectInsertGraphType : ProjectInputGraphType
    {
        public ProjectInsertGraphType()
            : base(idNullable: true)
        {
            Name = "ProjectInsertInput";
        }
    }
}