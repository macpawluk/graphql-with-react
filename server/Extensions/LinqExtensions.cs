using LinqKit;
using System;
using System.Linq.Expressions;

namespace MyPlays.GraphQlWebApi.Extensions
{
    public static class LinqExtensions
    {
        public static ExpressionStarter<T> ConditionalAnd<T>(
            this ExpressionStarter<T> expressionStarter,
            Expression<Func<T, bool>> expression,
            bool condition)
            => condition
                ? expressionStarter.And(expression)
                : expressionStarter;
    }
}