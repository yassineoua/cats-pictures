# Cat Pictures App

We're creating a RESTful API for uploading and managing cat pictures.

# Setup

This project require a database installation to complete; however, the knex.ts query builder is configured for a sample Mysql database.

## Setup Backend Instructions

Create a `.env` in the `/src` directory.

See the `.env.example` file to see what fields are available.

Spin up a local Mysql database or connect to the hosted development database.

Add your database credentials to the `.env` file.

Install NPM Packages. `npm i`

If using a locally hosted database, migrate.

Migrate the database. `knex migrate:latest --knexfile=knexfile.ts --cwd=src`.

Start the dev server, `npm run watch`.

## Setup docker containers

Start all containers, `docker-compose up --build`.
