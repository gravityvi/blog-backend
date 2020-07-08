# blog-backend
A rest_api project created with the express and mongo.

## This is a bullet proof Rest api -structure in node using express.
The code is divided into following structure:
- ### routes
Contains all the routes of the system.
- services
Bussiness logic is extracted out in this layer.
- errors
Throwing errors and error management is done in this layer.
- logging
Proper logging of the system with respect to the enviroment is handled here.
- startup
Initialing routes and other serivices and security management during start of the app is extracted out in this folder.
- middlewares
There are multiple middlewares to related to authentication and authorization.
- models
DB models of different collection are defined here using mongoose.
- config
Configuration of environment variables.
- index.js (entry point)

### Steps to run the project.
- clone the repo.
- run `npm install` in the folder to install all the dependencies.
- make sure you have mongoDB installed locally into your system.
- run `node index.js` to start the system service.
