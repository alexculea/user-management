// loads the .env file into process.env
// env variables that already exist take precedence
require('dotenv').config(); 

const {
  db_host: host,
  db_port: port,
  db_user: username,
  db_pass: password,
  db_schema: database,
} = process.env;

module.exports = {
  host,
  port,
  username,
  password,
  database,
  type: "mysql",
  entities: ["dist/models/*.entity.js"],
  migrationsTableName: "typeorm_migrations",
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
}