using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.GraphQlWebApi.Models
{
    public class EntityRef
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
    }
}