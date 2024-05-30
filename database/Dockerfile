# Use the official MySQL 5.7 image as the base image
FROM mysql:8.4.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD example_password
ENV MYSQL_DATABASE test
ENV MYSQL_USER example_user
ENV MYSQL_PASSWORD example_password

# Copy initialization scripts (if any)
COPY . /docker-entrypoint-initdb.d