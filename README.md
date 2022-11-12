# Todos App

[This repo](https://github.com/WandoCode/todolist) contains the code of my 'Todos App' website. The goal of this website is mainly to show off some of my frontend skills.

It's build with **React** and **Redux**.

## Hightlighted skills in this project

- React
- Redux and his toolkit
- Async function with redux
- CSS (with Sass)

### Main features

- Custom routing with protected routes
- Dark/light mode website
- Multilanguage website
- Drag and drop to ease todos management

### Responsive

The website works on smartphones.

### Design

The design will be improved later (mainly for the phone version).

I was inspired widely by styles I found on internet.

# Dependencies

## React

The project is build with React and his most common dependencies.

## Firebase

In this project, Firebase is used to manage the backend:

- hosting
- database
- authentication

To launch the project in a developement environement, Firebase emulators have to be started with the project (see [scripts](#scripts)).

## Other dependencies

- Redux (react-redux and @reduxjs/toolkit) for global state management
- react-router-dom for routing
- uniqid to build unique ids

# Scripts

## firebase:dev

Launch Firebase emulators to work in the developement environement.

## start:local

Launch the Todos App in the developement environement.

In this environement, an empty todo list of a user will be populated by mocked datas automatically.

## start:firebase

Launch the Todos App in the developement environement **but** the backend is a real firestore database.

It allows to test Firebase comportement without have to deploy the App.

## build

Create production files for the Todos App

## Other (firebase)

- firebase emulators:start: launch firebase emulators
- firebase deploy --only hosting: used to deploy the production build (in /build) on Firebase

# Licence

This website has been build for demonstration purpose only.

All the content is published under the MIT licence (see '/licence.txt')
