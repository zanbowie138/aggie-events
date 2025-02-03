#!/bin/bash

# Check if dependency containers are running
IS_RUNNING_TRAEFIK=$(docker compose -f compose.deps.yml ps -q traefik)
IS_RUNNING_DB=$(docker compose -f compose.deps.yml ps -q db)
IS_RUNNING_BACKUP=$(docker compose -f compose.deps.yml ps -q db_backup)

if [ -z "$IS_RUNNING_TRAEFIK" ] || [ -z "$IS_RUNNING_DB" ] || [ -z "$IS_RUNNING_BACKUP" ]; then
    echo "One or more dependency containers are not running. Starting now..."
    docker compose -f compose.deps.yml up -d
else
    echo "Dependency containers are already running."
fi

# Restart production containers
docker compose -f compose.prod.yml down
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d

# Clean up unused Docker images
yes | docker image prune -a
