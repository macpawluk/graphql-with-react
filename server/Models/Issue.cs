namespace MyPlays.GraphQlWebApi.Models
{
    [MongoCollection("issues")]
    public class Issue : EntityRef, IEntity
    {
        public IssueType Type { get; set; }

        public IssueStatus Status { get; set; }

        public string Description { get; set; }

        public EntityRef Project { get; set; }
    }
}