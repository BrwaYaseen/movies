#!/usr/bin/env bash

DB_CONTAINER_NAME="next-payload-3"

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again."
  echo "Docker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker stop $DB_CONTAINER_NAME
  docker rm $DB_CONTAINER_NAME
  echo "Stopped and removed existing container"
fi

set -a
source .env

# Extract password from POSTGRES_URI
DB_PASSWORD=$(echo $POSTGRES_URI | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
fi

docker run --name $DB_CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=next-payload-3 -d -p 5432:5432 postgres

echo "Database container was successfully created"
