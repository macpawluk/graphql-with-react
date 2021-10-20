using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace MyPlays.GraphQlWebApi.Graph
{
    public class ProjectsSchema : Schema
    {
        public ProjectsSchema(IServiceProvider provider)
            : base(provider)
        {
            Query = provider.GetRequiredService<ProjectsQuery>();
            Mutation = provider.GetRequiredService<ProjectsMutation>();
        }
    }
}