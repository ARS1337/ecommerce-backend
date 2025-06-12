# Setting up the project

## run _npm i_ to install all the dependencies

## add the necessary variables in the .env file

### the JWT_SECRET for signing the jwt ( access_token used in authentication )

### the PORT on which the server needs to run on

### the FRONTEND_URL needed for cors with credentials

## update the below fields in config.json in the config folder, used by sequelize for connecting to the database

### username : (username of your postgres database)

### password : (password of your postgres database)

### database : (postgres for postgres database)

### host : (localhost for local or the database server host name)

### dialect : (postgres for postgres database)

## run _npm run migrate:undo-all_ for undoing any previous migration (no need if migrating the first time)

## run _npm run migrate_ for applying the migrations

## run _npm run seed:undo-all_ for undoing any previous seeding (no need if seeding the first time)

## run _npm run seed_ for seeding the database with categories, products, user and a seller

## run _npm run dev_ for starting with nodemon or _npm run start_ for starting with node
