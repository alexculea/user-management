# User management API
A REST API CRUD backend using MySQL to manage users, departments and permissions.

## How to run
Get a MySQL database ready, such as:
```
docker run --name mysql-db-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8
```

Once the database instance is ready, make sure to configure the DB connection details under the `.env` file.

With the database up, run:
```BASH
npm run i
npm run db:install
```

Then finally
```
npm run start
```

