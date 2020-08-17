# RouteEasy - Leaflet + Google Geocoder

## How to use it
**To run this project, you'll need NPM!**
(https://www.npmjs.com/)

### GET THE FILES
> Clone this project and open the folder
```shell
$ git clone https://github.com/MBAlexandreMB/routeEasy-Test.git
$ cd routeEasy-Test
```

### SETUP
> Install all the dependencies on both client and server
```shell
$ cd server
$ npm i

$ cd ../client
$ npm i
```
> Create a .env file on both client and server folders and set these variables:
Client:
  - BASE_URL= String | The Url to the API RESTFUL server
  - M_API_KEY= String | The MapBox API Key (https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)
  
Server:
  - PORT= number | The PORT that the server should use
  - MONGODB_URI= String (mongodb://localhost/routeEasy) | The mongodb URI with database name
  - G_API_KEY= String | The Google API Key (https://developers.google.com/maps/documentation/javascript/get-api-key)


### RUN
> You can run as different servers with npm
```shell
// At the server folder
$ npm start

// Then at the client folder
$ npm start
```

> Or you can build it, to run as just one server
```shell
// At the client folder
$ npm build

// Then at the client folder
$ npm start
```
