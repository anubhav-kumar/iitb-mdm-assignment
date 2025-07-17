#!/usr/bin/env fish

# Container name
set container_name mongo-drone

# MongoDB exposed port
set host_port 27017
set container_port 27017

# Optional: path for persistent data
set mongo_data_path (pwd)/mongodb-setup/mongo-data

# Create volume dir if it doesn't exist
if not test -d $mongo_data_path
    mkdir -p $mongo_data_path
    echo "📁 Created data directory at $mongo_data_path"
end

# Check if already running
if podman container exists $container_name
    echo "🔁 Container '$container_name' already exists."
    podman start $container_name
else
    echo "🚀 Starting MongoDB container on port $host_port..."
    podman run -d \
        --name $container_name \
        -p $host_port:$container_port \
        -v $mongo_data_path:/data/db:Z \
        mongo:7

    echo "✅ MongoDB is running at mongodb://localhost:$host_port"
end

