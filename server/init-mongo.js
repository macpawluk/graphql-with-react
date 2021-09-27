db2 = db.getSiblingDB("projectsdb");

const frontEndProject = {
    "_id": new ObjectId(),
    "name": "Front-end project",
    "abbreviation": "FE",
    "color": "#9860FF"
};

const backEndProject = {
    "_id": new ObjectId(),
    "name": "Back-end project",
    "abbreviation": "BE",
    "color": "#FF8263"
};

db2.getCollection("projects").insertMany(
    [
        frontEndProject,
        backEndProject
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Pretty serious bug",
            "type": 2,
            "project": {
                "_id": frontEndProject._id,
                "name": frontEndProject.name
            }
        },
        {
            "_id": new ObjectId(),
            "name": "Nice improvement",
            "type": 4,
            "project": {
                "_id": frontEndProject._id,
                "name": frontEndProject.name
            }
        },
        {
            "_id": new ObjectId(),
            "name": "Regular story",
            "type": 3,
            "project": {
                "_id": frontEndProject._id,
                "name": frontEndProject.name
            }
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