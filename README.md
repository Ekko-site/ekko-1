# Ekko

[![Build Status](https://travis-ci.org/Ekko-site/ekko.svg?branch=master)](https://travis-ci.org/Ekko-site/ekko)

## Installation

`yarn`

## Usage

`yarn dev`


## Building

`yarn build` needs to be ran before pushing if you've made changes to themes

There's a `commit.sh` in `/scripts` which can be ran like so:

`$ ./scripts/commit.sh "changed a theme"` which will run `yarn build` and then commit/push changes.


## Database

Create your own `config/config.json` file

Create a database called 'ekko'.

```
module.exports = {
    "development": {
        "username": "{ YOUR DB USER }",
        "password": null,
        "database": "ekko",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}
```


## Structure

`/client`
This is the React web-app

`/config/demo.js`
If you want to include a "free" plan for certain users

`/config/free-trial.js`
How many days to include in the free trial

`/config/stripe-plans.js`
Used to display the Stripe plan details, manually updated from the Stripe Dashboard

`/config/themes.js`
List of all themes Ekko supports. Each time the system starts, we loop through this array and create/update the themes in the database.

`/src`
The Node API

`/src/controllers`
Express request handlers

`/src/etc`
Standalone node modules, mostly abstracted logic

`/src/models`
Sequelize DB classes which map to DB tables

`/src/services`
General purpose Classes, mainly to connect to external APIs


## Themes

Themes are what the user sees when they visit their website, they are self-contained React Components. Themes are contained in `/src/themes/` and each one will have at minimum a "layout.js" and a "client.js" file. "layout.js" is a React Component which gets passed the user's FB Page data as React `props`. "client.js" is what gets ran when the browser loads the page client-side.

## Deploying

Hosted on Heroku, this repo can be connected to Heroku from GitHub and can be set up so it automatically deploys from Master branch when its pushed.
