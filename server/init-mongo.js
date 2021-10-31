db2 = db.getSiblingDB("projectsdb");

const frontEndApp = {
    "_id": new ObjectId(),
    "name": "Front-end app",
    "abbreviation": "FE",
    "description": "The front-end application for handling the tickets.",
    "color": "#6e40bf"
};

const webApi = {
    "_id": new ObjectId(),
    "name": "Web API",
    "abbreviation": "BE",
    "description": "GrapQL API for serving projects related data.",
    "color": "#bf5a40"
};

const project3 = {
    "_id": new ObjectId(),
    "name": "Palace",
    "abbreviation": "PL",
    "description": "The secrect project of bulding new mansion.",
    "color": "#40acbf"
};

const project4 = {
    "_id": new ObjectId(),
    "name": "Rio",
    "abbreviation": "RO",
    "description": "Plan to explore Rio De Janeiro and its neighbourhood",
    "color": "#2d864e"
};

const project5 = {
    "_id": new ObjectId(),
    "name": "Labyrinth",
    "abbreviation": "LB",
    "description": "The quiz application for kids in school age.",
    "color": "#86862d"
};

const project6 = {
    "_id": new ObjectId(),
    "name": "Seeburg",
    "abbreviation": "P6",
    "description": "The FPS game inspired by cartoon world.",
    "color": "#bf4073"
};

const project7 = {
    "_id": new ObjectId(),
    "name": "Aloha",
    "abbreviation": "P7",
    "description": "The music project that main goal is helping in relaxation.",
    "color": "#2d4586"
};

const project8 = {
    "_id": new ObjectId(),
    "name": "Lambeth",
    "abbreviation": "P8",
    "description": "Standalone tool for scraping news feeds from random sources.",
    "color": "#4d4d19"
};

db2.getCollection("projects").insertMany(
    [
        frontEndApp,
        webApi,
        project3,
        project4,
        project5,
        project6,
        project7,
        project8
    ]
);

db2.getCollection("issues").insertMany(
    [
        {
            "_id": new ObjectId(),
            "name": "Pretty serious bug",
            "description": "That's a bug with a high priority, but I won't give you steps to reproduce ;-)",
            "type": 2,
			"status": 1,
            "project": {
                "_id": frontEndApp._id,
                "name": frontEndApp.name
            }
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
            }
        },
        {
            "_id": new ObjectId(),
            "name": "Regular story",
            "description": "And some button there and don't ask further questions :-)",
            "type": 3,
			"status": 1,
            "project": {
                "_id": frontEndApp._id,
                "name": frontEndApp.name
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