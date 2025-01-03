#!/bin/bash
set -e

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to be ready
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong!Passw0rd" -Q "SELECT 1" &> /dev/null
do
  echo "Waiting for SQL Server to start..."
  sleep 1
done

echo "SQL Server is ready"

# Run the initialization script
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong!Passw0rd" -i /usr/config/01-init.sql

# Keep container running
tail -f /dev/null