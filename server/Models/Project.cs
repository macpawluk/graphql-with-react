using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.WebApi.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Abbreviation { get; set; }

        public string Color { get; set; }
    }
}