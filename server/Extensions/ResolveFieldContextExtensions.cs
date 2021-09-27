using GraphQL.Builders;
using GraphQL.Types.Relay.DataObjects;
using MyPlays.GraphQlWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPlays.GraphQlWebApi.Extensions
{
    public static class ResolveFieldContextExtensions
    {
        public static async Task<Connection<U>> GetPagedResults<T, U>(
            this IResolveConnectionContext<T> context,
            IReadOnlyCollection<string> ids,
            Func<List<string>, Task<IReadOnlyCollection<U>>> getItemsByIds)
            where U : IEntity
        {
            if (context.SubFields.Count == 1 && context.SubFields.ContainsKey("totalCount"))
            {
                return new Connection<U>
                {
                    TotalCount = ids.Count
                };
            }

            List<string> idList;
            var pageSize = context.PageSize ?? 20;

            if (context.IsUnidirectional || context.After != null || context.Before == null)
            {
                if (context.After != null)
                {
                    idList = ids
                        .SkipWhile(x => !x.Equals(context.After))
                        .Skip(1)
                        .Take(context.First ?? pageSize).ToList();
                }
                else
                {
                    idList = ids
                        .Take(context.First ?? pageSize).ToList();
                }
            }
            else
            {
                if (context.Before != null)
                {
                    idList = ids.Reverse<string>()
                        .SkipWhile(x => !x.Equals(context.Before))
                        .Skip(1)
                        .Take(context.Last ?? pageSize).ToList();
                }
                else
                {
                    idList = ids.Reverse<string>()
                        .Take(context.Last ?? pageSize).ToList();
                }
            }

            var list = (await getItemsByIds(idList)).ToList();
            var cursor = list.Count > 0 ? list.Last().Id : null;
            var endCursor = ids.Count > 0 ? ids.Last() : null;

            return new Connection<U>
            {
                Edges = list.Select(x => new Edge<U> { Cursor = x.Id, Node = x }).ToList(),
                TotalCount = ids.Count,
                PageInfo = new PageInfo
                {
                    EndCursor = endCursor,
                    HasNextPage = endCursor == null ? false : cursor != endCursor,
                }
            };
        }
    }
}