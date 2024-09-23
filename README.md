# tsh-movies-recruitment-task

This repo is NodeJS Typescript implementation of Movies API, as a recruitment task for The Software House.

## Launching the project

Project was developed and tested using Node v20.17.0.
Data file _db.json_ has been set in root folder of the project and reset to original values.

Running the project locally:

```
nvm use
npm install
cp .env.sample .env
npm run build
npm run start
```

Proposed environmental variables for local testing:

```
PORT=3000
NODE_ENV=dev
ALLOWED_ORIGINS=http://localhost
```

## URLs (with default port 3000):

API: http://localhost:3000/api
Swagger: http://localhost:3000/docs/

## Scripts

```
npm run build       // Build Typescript distribution
npm run start       // Launch built distribution
npm run dev         // Launch development server
npm run test        // Launch jest test suites
npm run testall     // Launch jest test suites with details
npm run lint        // Launch eslint check
```
