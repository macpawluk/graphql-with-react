db2 = db.getSiblingDB("projectsdb");
db2.getCollection("projects").insertMany(
    [
        {
            "_id": ObjectId("614f5df0acdaff861ce5c378"),
            "name": "Al Calpone",
            "abbreviation": "AC",
            "color": "#FFFF"
        },
        {
            "_id": ObjectId("614f5df0acdaff861ce5c377"),
            "name": "Video Capture",
            "abbreviation": "VC",
            "color": "#FF0000"
        },
        {
            "_id": ObjectId("614f5da9acdaff861ce5c376"),
            "name": "Crazy Horse",
            "abbreviation": "CH",
            "color": "#FFFF00"
        }
    ]
);

db.createUser(
    {
        user: "user",
        pwd: "user_password",
        roles: [
            {
                role: "dbOwner",
                db: "projectsdb"
            }
        ]
    }
);

db2.getCollection("sampledocuments").drop();