# bookstore-v1

Fullstack Bookstore application containing both Frontend and Backend code

### Get Started

## Setting up frontend environment

```
cd store-client
npm i
npm start
```

## Tools and Resources

- Reactjs - Frontend framwork
- Typescript
- React Icons
- ChakraUI - css framework
- axios - request wrapper

## Setting up backend environment

STEP 1: Install dependencies

```
cd store-api
npm i
```

STEP 2: Add env variables

```
// Add the env for backend server, and postgressql database url
_SECRET=
_ALGO=HS256
DATABASE_URL=
```

STEP 3: Setup database

```
// migrate
npx prisma migrate dev

// seed books to db
npm run seed
```

STEP 4 start server

```
npm run dev
```

## Tools and Resources

- Typescript
- Express - Rest API framework
- Prisma - RDMS ORM
- JWT
- nodemon
- Container Awilix - Dependency injections
- jest - unit testing library

API Documentation
The api was documented using POSTMAN,
import the collection `Bookstore API.postman_collection` in the root directory to postman, and test the endpoints

Cheers
