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