# REST API implemented using NodeJs, ExpressJs and Typescript

Welcome to this test project. This project aims to display:
-- How to develop a REST API using NodeJs, ExpressJs and Typescript
-- How to test a NodeJs application
-- How to setup CI/CD pipelines

# Available endpoints

GET / -> Returns the constant JSON { "message": "Hello World!" }  
GET /todos -> Gets all persisted TODOS  
GET /todo/:id -> Gets the TODO with the provided id  
POST /todo (body: { title: "<ATitle>", "description": "<ADescription>"}) -> Persists the todo 

# Running coverage

To test the coverage of the tested classes, you must install the "nyc" package globally by running the command:
-npm i nyc -g
Once npm is finished you can now run tests with coverage using:
- npm run test-coverage

# Run the application

To run the REST application simply type this command on your terminal:
- npm start

# Run the application as a Docker container

To run the REST application as a Docker container you must type these commands on your terminal:
- docker build .
- docker run -d -p 8081:8081 <IMAGE_ID>

# Deployment 

This application has been hooked up to Heroku and can be queried using this secured URL:

https://nodejs-typescript-example.herokuapp.com/

# Continuous integration/deployment

This application has been hooked up to Buddy and a pipeline has been setup on each push made to 
the master branch.

Here are the jobs of that pipeline:
-- Run npm test
-- Deploy to Heroku