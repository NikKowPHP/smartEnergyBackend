#!/bin/bash
set -e

# Wait for SQL Server to be ready
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1"; do
    echo "Waiting for SQL Server to start..."
    sleep 1
done

echo "SQL Server is ready"

# Run initialization scripts
for f in /docker-entrypoint-initdb.d/*.sql
do
    echo "Running $f"
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -i "$f"
done 