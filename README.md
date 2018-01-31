# React Demo

## Installation

`npm install`

## Usage

`npm run start`


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
