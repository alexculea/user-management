// loads the .env file into process.env
// env variables that already exist take precedence
require('dotenv').config(); 

const [node, script, command] = process.argv;

if (!command) {
  console.error(`Mode parameter needs to be set to either 'create' or 'drop'. Ex: node mysql-schema.js create`);
  process.exit(1);
}

const {
  db_host: host,
  db_port: port,
  db_user: user,
  db_pass: password,
  db_schema: database,
} = process.env;

const commandToQuery = {
  create: `CREATE SCHEMA IF NOT EXISTS \`${database}\` CHARACTER SET utf8 COLLATE utf8_unicode_ci;`,
  drop: `DROP SCHEMA \`${database}\`;`
};

const commandToErrorMsg = {
  create: 'Error creating database.',
  drop: 'Error deleting database.'
}

const mysql = require('mysql');
mysql.createConnection({
  host,
  port,
  user,
  password
}).query(commandToQuery[command.toLowerCase()], e => {
  if (e) {
    console.log(`${commandToErrorMsg[command.toLowerCase()]} Reason: ${e}`);
    process.exit(1);
  } 

  console.log('Done.');
  process.exit(0);
});
  

