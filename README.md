# Breaking bad App

React App to show cast info for breaking bad.

### [Demo](https://breaking-bad-jeremies.netlify.app/)

This codebase was created to demonstrate a frontend application built with React, Typescript, and Redux Toolkit including read operations, routing and more.

It uses the following API to get all the data: https://breakingbadapi.com/

This app consists of two screens:

1. List of all existing characters.
2. Character detail with a random quote.

# Features

- [x] Skeleton while loading data
- [x] Manage data loading feedback and error management
- [x] Ability to change the language between English and Spanish
- [x] Responsive app
- [x] Clean and Simple Material UI
- [x] Redux State Management
- [x] Tests

# How it works

The root of the application is the `src/components/App` component. The App component uses react-router's HashRouter to display the different pages. Each page is represented by a [function component](https://reactjs.org/docs/components-and-props.html).

Some components include a `.slice` file that contains the definition of its state and reducers, which might also be used by other components. These slice files follow the [Redux Toolkit](https://redux-toolkit.js.org/) guidelines. Components connect to the state by using [custom hooks](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).

This application is built following (as much as practicable) functional programming principles:

- Immutable Data
- No classes
- No let or var
- Use of monads (Option, Result)
- No side effects

The code avoids runtime type-related errors by using Typescript and decoders for data coming from the API.

Some components include a `.test` file that contains unit tests.

This project uses prettier and eslint to enforce a consistent code syntax.

## Folder structure

- `src/components` Contains all the functional components.
- `src/components/Pages` Contains the components used by the router as pages.
- `src/config` Contains configuration files.
- `src/services` Contains the code that interacts with external systems (API requests).
- `src/state` Contains redux related code.
- `src/translations` Contains translation files.
- `src/types` Contains type definitions alongside the code related to those types.
- `src/utils` Contains utility functions.

## Built with

- **@hqoss/monads**: for passing to the UI when data is loading or there has been an error using a single variable.
- **@mui/material**: for importing some simple React components.
- **@reduxjs/toolkit**: for Redux State Management.
- **axios**: provides an easy-to-use API in a compact package for most of your HTTP communication needs.
- **decoders**: Elegant and battle-tested validation library for type-safe input data for TypeScript
- **i18next**: translations
- **react-router-dom**: add routing to react apps
- **typescript**: strongly typed programming language that builds on JavaScript

# Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
