# Messager API

This repository present API written in NodeJS using Express framework.
It provides basic functionality of creating messages and requesting paginated
list.

## Features

Presented API using following tools/features:
+ Express web-framework
+ NoSQL database MongoDB using Mongoose ODM
+ Simple verification using Mongoose model matching

## Demo
Demo app example is running in Heroku Cloud.

## Installation

To install type in console:

```
$ git clone https://github.com/legonian/nodejs-website
$ cd nodejs-website
$ npm ci
```

## Usage

Before runing the server Postgres database need to be created with following
scripts: ``./create_db.sql`` and ``./node_modules/connect-pg-simple/table.sql``.
Credentials for database placed in environment variable: ``$MONGO_DB``.

The ``$MONGO_DB`` follows this naming convention:

```
mongodb+srv://<user>:<password>@<host>/<dbname>?retryWrites=true&w=majority
```

After running commands and setting up environment variables type:

```
$ npm run start
```

And access website by typing in browser ``http://localhost:3000``.
