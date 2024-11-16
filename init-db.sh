#!/bin/bash
set -e

# Check if the pgdata directory exists
if [ ! -d "/var/lib/postgresql/data" ]; then
  echo "pgdata folder not found. Running table_create.sql..."
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/table_create.sql
else
  echo "pgdata folder exists. Skipping SQL initialization."
fi
