using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.GraphQlWebApi.Models
{
    [MongoCollection("projects")]
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Issues { get; set; }
    }
}