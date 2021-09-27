using MongoDB.Bson.Serialization.Conventions;

namespace MyPlays.GraphQlWebApi
{
    public static class Bootstrapper
    {
        public static void SetupMongoDriver()
        {
            ConventionRegistry.Register("conventions",
                new ConventionPack
                {
                    new CamelCaseElementNameConvention(),
                    new IgnoreExtraElementsConvention(true)
                }, _ => true);
        }
    }
}