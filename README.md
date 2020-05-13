# Rust TCP Server UI

User interface for Stu's Rust TCP Server. This project is used to learn about TCP streams, HTTP, and websockets.

## Structure

This user interface consists of two parts; a ReactJS website that will render the UI content, and an Electron application that packages the website as a cross-platform desktop application.

### ReactJS

More information about ReactJS is available here: [https://reactjs.org/](https://reactjs.org/)

### Electron

More information about Electron is available here: [https://www.electronjs.org/](https://www.electronjs.org/)

## Scripts

The following scripts allow the installation of dependencies and can be used to run the website and electron apps locally and package them for distribution.

### `yarn install`

Install package dependencies. This is required after first cloning the repo.

### `yarn start`

Runs the ReactJS website in development mode on [http://localhost:3000](http://localhost:3000)

### `yarn electron-start`

Runs the electron wrapper application locally. Assumes that the website is already running at [http://localhost:3000](http://localhost:3000)

### `yarn build`

Prepare a production build of the web application.

### `yarn dist`

Builds a distribution of the electron application with the website bundled inside.
