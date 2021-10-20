using GraphQL.Types;
using MyPlays.GraphQlWebApi.Models;

namespace MyPlays.GraphQlWebApi.Graph.Types
{
    public class EntityWithIdInputGraphType : InputObjectGraphType<EntityWithId>
    {
        public EntityWithIdInputGraphType()
        {
            Name = "EntityIDInput";
            Field(h => h.Id).Description("The id of the entity.");
        }
    }
}