using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.GraphQlWebApi.Models
{
    public class EntityWithId
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}