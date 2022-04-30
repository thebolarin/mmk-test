# MMK Test Service.

## Description
A microservice based on MMK test
## Dependencies

- Nodejs 16.13.1
- Postgres 14.1
- Redis

## Install Nodejs
Follow the installation guide [here](https://nodejs.org/en/download/)

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
npm run migrate
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm start
```

The app should be accessible through http://localhost:6000/
## Testing

```bash
# unit tests
$ npm run test

```
