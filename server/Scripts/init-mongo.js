db2 = db.getSiblingDB("projectsdb");

const frontEndApp = {
    "_id": new ObjectId(),
    "name": "Front-end app",
    "abbreviation": "FE",
    "description": "The front-end application for handling the tickets.",
    "color": "#6e40bf",
    "updated": new Date()
};

const webApi = {
    "_id": new ObjectId(),
    "name": "Web API",
    "abbreviation": "BE",
    "description": "GrapQL API for serving projects related data.",
    "color": "#bf5a40",
    "updated": new Date()
};

const palace = {
    "_id": new ObjectId(),
    "name": "Palace",
    "abbreviation": "PL",
    "description": "The secrect project of bulding new mansion.",
    "color": "#40acbf",
    "updated": new Date()
};

const rio = {
    "_id": new ObjectId(),
    "name": "Rio",
    "abbreviation": "RO",
    "description": "Plan to explore Rio De Janeiro and its neighbourhood",
    "color": "#2d864e",
    "updated": new Date()
};

const labyrinth = {
    "_id": new ObjectId(),
    "name": "Labyrinth",
    "abbreviation": "LB",
    "description": "The quiz application for kids in school age.",
    "color": "#86862d",
    "updated": new Date()
};

const seeburg = {
    "_id": new ObjectId(),
    "name": "Seeburg",
    "abbreviation": "P6",
    "description": "The FPS game inspired by cartoon world.",
    "color": "#bf4073",
    "updated": new Date()
};

const aloha = {
    "_id": new ObjectId(),
    "name": "Aloha",
    "abbreviation": "P7",
    "description": "The music project that main goal is helping in relaxation.",
    "color": "#2d4586",
    "updated": new Date()
};

const lambeth = {
    "_id": new ObjectId(),
    "name": "Lambeth",
    "abbreviation": "P8",
    "description": "Standalone tool for scraping news feeds from random sources.",
    "color": "#4d4d19",
    "updated": new Date()
};

db2.getCollection("projects").insertMany(
    [
        frontEndApp,
        webApi,
        palace,
        rio,
        labyrinth,
        seeburg,
        aloha,
        lambeth
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Pretty serious bug",
            "description": "That's a bug with a high priority, but I won't give you steps to reproduce ;-)",
            "type": 2,
            "status": 2,
            "project": {
                "_id": frontEndApp._id,
                "name": frontEndApp.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "Nice improvement",
            "description": "World is going to be so much better once you put that in!",
            "type": 4,
            "status": 1,
            "project": {
                "_id": frontEndApp._id,
                "name": frontEndApp.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "Add a button",
            "description": "Add some button there and don't ask further questions :-)",
            "type": 3,
            "status": 1,
            "project": {
                "_id": frontEndApp._id,
                "name": frontEndApp.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Getting 404",
            "description": "The API returns 404 for standard projects request.",
            "type": 2,
            "status": 2,
            "project": {
                "_id": webApi._id,
                "name": webApi.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "Add some API tests",
            "description": "Every API needs some tests coverage. Add some.",
            "type": 1,
            "status": 1,
            "project": {
                "_id": webApi._id,
                "name": webApi.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
		{
            "_id": new ObjectId(),
            "name": "Add labels",
            "description": "It would be nice to have an option to tag tickets with self-made labels.",
            "type": 3,
            "status": 1,
            "project": {
                "_id": webApi._id,
                "name": webApi.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "No helicopter landing pad",
            "description": "No way, where am I going to land my bird?",
            "type": 2,
            "status": 2,
            "project": {
                "_id": palace._id,
                "name": palace.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "Check-in with garden team",
            "description": "Make sure they know the plans about golf course.",
            "type": 1,
            "status": 4,
            "project": {
                "_id": palace._id,
                "name": palace.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
		{
            "_id": new ObjectId(),
            "name": "Widen garage spots",
            "description": "The spots do not fit my tank.",
            "type": 3,
            "status": 1,
            "project": {
                "_id": palace._id,
                "name": palace.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Book tickets",
            "description": "You won't get there without plane tickets. Book some.",
            "type": 3,
            "status": 1,
            "project": {
                "_id": rio._id,
                "name": rio.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "Plan travel route",
            "description": "We need a detailed plan when to see what.",
            "type": 3,
            "status": 1,
            "project": {
                "_id": rio._id,
                "name": rio.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Introduce difficulty level",
            "description": "The game can't be too difficult, especially for younger kids.",
            "type": 3,
            "status": 4,
            "project": {
                "_id": labyrinth._id,
                "name": labyrinth.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "The character can go through the walls",
            "description": "Going through the walls should not be possible at all.",
            "type": 2,
            "status": 4,
            "project": {
                "_id": labyrinth._id,
                "name": labyrinth.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Add more characters",
            "description": "The player should have an option to choose from wider range of characters.",
            "type": 1,
            "status": 2,
            "project": {
                "_id": seeburg._id,
                "name": seeburg.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
        {
            "_id": new ObjectId(),
            "name": "SpongeBob doesn't look like him",
            "description": "The designer should do better with this one.",
            "type": 2,
            "status": 1,
            "project": {
                "_id": seeburg._id,
                "name": seeburg.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
		{
            "_id": new ObjectId(),
            "name": "More tools",
            "description": "Let's add some more tools for charater's toolbox.",
            "type": 4,
            "status": 1,
            "project": {
                "_id": seeburg._id,
                "name": seeburg.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        }
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Volume threshold doesn't work",
            "description": "The threshold should stop volume increase at 50%.",
            "type": 2,
            "status": 1,
            "project": {
                "_id": aloha._id,
                "name": aloha.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
        },
		{
            "_id": new ObjectId(),
            "name": "Add visual effects",
            "description": "The app should paint calm graphics in music's rhythm.",
            "type": 4,
            "status": 1,
            "project": {
                "_id": aloha._id,
                "name": aloha.name
            },
            "updated": new Date(),
            "lastStatusChange": new Date()
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