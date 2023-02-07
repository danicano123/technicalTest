# TechnicalTest

An app to migrate data from a SQL database (postgres) to a NoSQL database (mongo), adapting the data according to the requirements given in advance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Github](https://img.shields.io/badge/Github-https://github.com/danicano123/technicalTest.git-lightgrey.svg)](https://github.com/danicano123/technicalTest.git)

## Table of contents

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#Usage)
- [Documentation](#Documentation)
- [Contribution](#Contribution)
- [Credits](#Credits)
- [License](#License)

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Git
- Node.js and npm (is included with Node.js)
- docker/dockerDesktop
- some terminal based on linux

## Installation

Follow the steps below to clone the repository, place it in the folder and install the dependencies:

1. Open the console and do git clone `https://github.com/username/nombre-del-repositorio.git`.
2. Do `cd repository-name` to access the project directory.
3. Do `npm install` to install the project dependencies.
4. do `docker-compose build app` (RECOMENDED!)
5. Apply your own AWS credential in docker-compose.yml
   Once these steps are completed, the project will be ready to run.

## Usage

I will leave by default the environment variables in the docker-compose.yml document, so if you want to change them, you must do it from that same document.
I will also leave data already saved in the "storeData" document (only from postgres) to make it easier to manage.

This is the list of the routes of my app:

- GET /api/health: This is the endpoint used to check if the API is running.

- GET /api/users/migrate: migrates the data from postgres to mongoDB doing the corresponding validations and transformations.

- GET /api/api/users: Returns all the records in the MongoDB database

- GET /api/users/{id}: Returns a record by ID from the MongoDB database.

- POST /api/users: This endpoint will create a new document in Mongo

- PATCH /api/users/{id}: Updates a document in the MongoDB database. For this endpoint the
  modification of the idCard field is not allowed.

- DELETE /api/users/{id}: Removes a record from the MongoDB database (Physical delete).


## Contribution

Do u want to contribute? Don´t breack the code plis jajajajajaj

## Credits

Platzi :v

## License

MIT
