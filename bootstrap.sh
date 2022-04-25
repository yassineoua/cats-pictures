node ./node_modules/knex/bin/cli.js migrate:latest --knexfile=./build/knexfile.js
node ./node_modules/knex/bin/cli.js seed:run --knexfile=./build/knexfile.js
node ./build/server.js