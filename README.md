# Todos App

[This repo](https://github.com/WandoCode/todolist) contains the code of my 'Todos App' website. The goal of this website is mainly to show off some of my frontend skills.

It's build with **React** and **Redux**.

## Hightlighted skills in this project

### Technologies

- React
- Redux and his toolkit
- Async function with redux
- CSS (with Sass)
- React-router-dom for routing

### Main features

- Custom routing with protected routes
- Dark/light mode website
- Multilanguage website
- Drag and drop to ease todos management

### Responsive

The website works on desktop (last version of Chromimum or Firefox).

The website works on smartphones (last version of Chromimum or Firefox)

### Design

The design will be improved later (mainly for the phone version).

I was inspired widely by styles I found on internet.

# How to install

## Prerequisites

- nodeJS v16.14.2 or better
- (Authorized users) Firebase CLI v11.15.0 or better

## Setup

For the full developement environement (for authorized users - Firebase authentication to the project is mandatory):

- Be sure to have the Firebase CLI installed
- Be sure to have launched [the Firebase emulators](https://firebase.google.com/docs/emulator-suite)
- Install dependencies with `npm install`
- Launch firebase emulators `npm run firebase:dev`
- Launch the App with `npm run start:local`

For the semi-local developement environement (all users):

- Install dependencies with `npm install`
- Launch the App with `npm run start:firebase`

# Dependencies

## React

The project is build with React and his most common dependencies.

## Firebase

In this project, Firebase is used to manage the backend:

- hosting
- database
- authentication

To launch the project in a developement environement, Firebase emulators have to be started with the project (see [scripts](#scripts) and [setup](##Setup)).

## Other dependencies

- Redux (react-redux and @reduxjs/toolkit) for global state management
- react-router-dom for routing
- uniqid to build unique ids

# Scripts

## firebase:dev

For authorized users only (Firebase authentication to the project mandatory).

Launch Firebase emulators to work in the developement environement.

## start:local

For authorized users only (Firebase authentication to the project mandatory).

Launch the Todos App in the developement environement.

In this environement, an empty todo list of a user will be populated by mocked datas automatically.

## start:firebase

All user.

Launch the Todos App in the developement environement **but** the backend is a real firestore database.

It allows to access the development environement without being logged to Firebase.

It allows to test Firebase comportement without having to deploy the App.

## build

Create production files for the Todos App

## Other (firebase)

For authorized users

- `firebase emulators:start`: launch firebase emulators
- `firebase deploy --only hosting`: used to deploy the production build (in /build) on Firebase

# Licence

This website has been build for demonstration purpose only.

All the content is published under the MIT licence (see ['/licence.txt'](https://github.com/WandoCode/todolist/blob/main/licence.txt))
