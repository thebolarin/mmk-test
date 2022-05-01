# MMK Test Service.

## Description
A microservice based on MMK interview test
## Dependencies

- Nodejs 16.13.1
- Postgres 14.1
- Redis

## Install Nodejs
Follow the installation guide [here](https://nodejs.org/en/download/)

## Install Redis
Follow the installation guide [here](https://redis.io/docs/getting-started/#install-redis)

## Install Postgres
Follow the installation guide [here](https://www.postgresql.org/download/)

## Clone the repository

```
git clone https://github.com/thebolarin/mmk-test.git && cd mmk-test
```

## Install Nodejs dependencies

From your freshly checked out mmk-test repo, run:

```bash
$ npm install
```

## Setup database and schema
\* Ensure to have _Postgres_ , _Redis_ & _NodeJS (v16.13)_ installed on Ubuntu.
```
psql -h HOST -U User -d Database -f PATH_TO_SCHEMA_FILE
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm start
```

The app should be accessible through http://localhost:3000/
## Testing

```bash
# unit tests
$ npm run test

```
