docker stop graphqlwebapi-container
docker stop mongodb-container
docker rm graphqlwebapi-container
docker rm mongodb-container
docker rmi graphqlwebapi
rem docker rmi mongo:5.0.3