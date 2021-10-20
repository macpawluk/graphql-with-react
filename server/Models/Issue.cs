namespace MyPlays.GraphQlWebApi.Models
{
    [MongoCollection("issues")]
    public class Issue : EntityRef, IEntity
    {
        public IssueType Type { get; set; }

        public EntityRef Project { get; set; }
    }
}