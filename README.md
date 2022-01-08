<p align="center"><a href="https://nodejs.org/en/" target="_blank"><img src="https://nodejs.org/static/images/logo.svg" width="270"></a></p>

## 🧬 Cloning this project

1. To run this project you must have <a href="https://git-scm.com/downloads">Git</a> installed on your machine. On your terminal run:

```
git clone https://github.com/amazonsoft-tech/1money-api.git
```

2. Access the root folder:

```
cd 1money-api
```

## 💿 Installing dependencies

1. You must have Yarn or NPM installed so you can install the dependencies this project demands. In the root directory, run:

```
yarn install
```

in case you have NPM instead of Yarn run:

```
npm install
```


## 🚀 Running this API on localhost

1.  You must have Node installed on your machine to run this project on localhost. Run:

```
yarn dev
```

or

```
npm run dev
```

## 🔗 Database connection (TypeORM)

1.  Rename file ```.env.example``` to ```.env```

2.  In the file ```.env```, set the environment variables you'll need to use:
```TYPEORM_CONNECTION=      set the connection here, example: mysql or postgresql
TYPEORM_HOST=               set the host here
TYPEORM_USERNAME=           set the database username
TYPEORM_PASSWORD=           set the database password
TYPEORM_DATABASE=           set the database name
TYPEORM_PORT=               set the database port
TYPEORM_MIGRATIONS=         set the directory where the migrations (if any) are located and the language they're written in (.ts or .js)
TYPEORM_MIGRATIONS_DIR=     set the directory where the migrations (if any) are located
TYPEORM_ENTITIES=           set the directory where the entities are located and the language they're written in (.ts or .js)
TYPEORM_ENTITIES_DIR=       set the directory where the entities are located
SECRET=                     set the user secret key you'll use for JWT
SECRET_ADMIN=               set the admin secret key you'll use for JWT
```

## 📅 Running migrations

1.  To run the migrations and create the database tables run:
```
yarn typeorm migration:run
```
or 

```
npm run typeorm migration:run
```

2.  To revert the last migration you ran run:
```
yarn typeorm migration:revert
```
or
```
npm run typeorm migration:revert
```