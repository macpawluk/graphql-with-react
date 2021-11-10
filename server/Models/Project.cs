using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyPlays.GraphQlWebApi.Models
{
    [MongoCollection("projects")]
    public class Project : EntityRef, IEntity
    {
        public string Abbreviation { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Issues { get; set; }
    }

    //vvv
    //public class ProjectWithIssuesIds : Project
    //{
    //    [BsonRepresentation(BsonType.ObjectId)]
    //    public string[] Issues { get; set; }
    //}
}