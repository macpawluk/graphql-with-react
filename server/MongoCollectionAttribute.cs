using System;

namespace MyPlays.GraphQlWebApi
{
    public class MongoCollectionAttribute : Attribute
    {
        public MongoCollectionAttribute(string collectionName)
            => CollectionName = collectionName;

        public string CollectionName { get; }
    }
}