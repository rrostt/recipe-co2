# search for recipe and get co2 impact

## Introduction

The purpose of this project is to test the co2-api that I have started here: https://github.com/rrostt/co2. I am trying to figure out what it needs to be able to do, so this project becomes its first consumer and able to request features and data formats from the API.

Contains two projects: app and search.

Search is a simple service for getting recipes.

App is a simple nextjs frontend that let you search for recipes in the edamame database and tries to figure out the co2 impact of the ingredients in the recipe.

# Install

Search uses the Edamame recipe database (https://developer.edamam.com). Get an API key. Create an .env file with EDAMAM_API_ID and EDAMAM_API_KEY in the search project.

# Run

First, run the search api:

    cd search
    npm install
    npm start

Second, start the frontend:

    cd app
    npm install
    npm start
