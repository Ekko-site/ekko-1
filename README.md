# Ekko

[![Build Status](https://travis-ci.org/Ekko-site/ekko.svg?branch=master)](https://travis-ci.org/Ekko-site/ekko)

## Installation

`yarn` - this will install all dependencies for the main API
`cd client && yarn` - this will install all dependencies for the React web-app
`yarn themes:build:install` - this will run a script that loops over each theme in `/src/themes` and installs all the dependencies

Everything should then be installed and ready to use.

## Usage

`yarn dev` - this will start both the API and the React web-app

## Building

`yarn build` needs to be ran before pushing if you've made changes to themes

There's a `commit.sh` in `/scripts` which can be ran like so:

`$ ./scripts/commit.sh "changed a theme"` which will run `yarn build` and then commit/push changes.


## Database

Create your own `config.js` file in the `/config` directory (this file is `.gitignore`d), with the following contents:

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

Create a database called 'ekko' on your local machine

We use Sequelize for database access and queries in the app code, and also for migrations. Migrations run before the app starts up in dev and prod. More info on using Sequelize migrations can be found here: https://sequelize.org/master/manual/migrations.html


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

### Theme Development & Design

Theme definitions are stored and referenced in the `Themes` database table. This is what the application uses to display and render theme information from. However, if you want to add a new theme, or edit an existing theme's name, or description, edit: `/config/themes.js`. When the app boots up, it first checks this config file for any new or updated theme info, and makes the necessary `UPDATE` or `INSERT` SQL calls into the `Themes` table. Basically, if you edit the actual IDs in this config file, it will corrupt the data integrity of Themes in Ekko.

To design a new theme: Duplicate a theme folder in `/src/themes`, and edit the JS and Sass files to fit your desired design, layout and content. If you're familiar with React, these Theme files should look very familiar to you, as they are simply React Components. The user's FB Page data gets passed to the master Component: `layout.js` as "props".

To test your new Theme design, spin up the app, and open `[serverURL]/s/[facebookPageID]?theme=[The ThemeID from /config/themes.js]]`, ie. http://localhost:3000/293749827658926478/?theme=2

## Deploying

Hosted on Heroku, this repo can be connected to Heroku from GitHub and can be set up so it automatically deploys from Master branch when its pushed.
