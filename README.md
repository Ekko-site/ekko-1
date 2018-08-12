# Ekko

[![Build Status](https://travis-ci.org/Ekko-site/ekko.svg?branch=master)](https://travis-ci.org/Ekko-site/ekko)

## Installation

`yarn`

## Usage

`yarn dev`


## Database

Create your own `config/config.json` file

```
module.exports = {
    "development": {
        "username": "{ YOUR USERNAME }",
        "password": null,
        "database": "ekko",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "url": process.env.DATABASE_URL,
        "dialect": "postgres",
        "use_env_variable": "DATABASE_URL"
    }
}
```


Create a database called 'ekko'.
