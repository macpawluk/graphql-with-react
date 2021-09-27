using MongoDB.Bson.Serialization;
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

            static void Register<T>()
            {
                if (!BsonClassMap.IsClassMapRegistered(typeof(T)))
                    BsonClassMap.RegisterClassMap<T>(cm =>
                    {
                        cm.AutoMap();
                        cm.SetDiscriminatorIsRequired(true);
                    });
            }

            //Register<AmericanFootballPlayer>();
        }
    }
}