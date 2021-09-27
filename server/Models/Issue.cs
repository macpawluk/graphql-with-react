using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.GraphQlWebApi.Models
{
    [MongoCollection("issues")]
    public class Issue : IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public IssueType Type { get; set; }

        public EntityRef Project { get; set; }
    }
}