# Node RESTful APIs

## Node Version

```
node version 16.16.0
```

## Quick Start

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--interfaces\     # Interfaces
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point
```

## Seeded Data

```
src\config\seeder\
|--mockAdmin.json    # Admin login data (email and Password).
|--mockData.json     # Transaction data for admin dashboard.
|--campaignMock.json # Marketing data for creating campaign.

These seeded data are automatically populate in db when you start are server.
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3001/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.
