using MongoDB.Driver;
using System;
using System.Linq;

namespace MyPlays.GraphQlWebApi.Extensions
{
    public static class MongoExtensions
    {
        public static IAggregateFluent<TResult> ConditionalStage<TResult>(
            this IAggregateFluent<TResult> aggregate,
            bool condition,
            Func<IAggregateFluent<TResult>, IAggregateFluent<TResult>> stage)
            => condition ? stage(aggregate) : aggregate;

        public static UpdateDefinition<TDocument> ConditionalSet<TDocument, TField>(
            this UpdateDefinition<TDocument> update,
            FieldDefinition<TDocument, TField> field,
            bool condition,
            Func<TField> getValueCallback)
            => condition ? update.Set(field, getValueCallback()) : update;

        public static IMongoCollection<T> GetDBCollection<T>(this IMongoDatabase database)
        {
            var type = typeof(T);
            var collectionAttr = (MongoCollectionAttribute)type.GetCustomAttributes(inherit: false).First(a => a.GetType() == typeof(MongoCollectionAttribute));
            return database.GetCollection<T>(collectionAttr.CollectionName);
        }
    }
}