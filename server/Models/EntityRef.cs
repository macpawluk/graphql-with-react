namespace MyPlays.GraphQlWebApi.Models
{
    public class EntityRef : EntityWithId
    {
        public string Name { get; set; }

        public EntityRef ToEntityRef()
            => new EntityRef
            {
                Id = Id,
                Name = Name
            };
    }
}