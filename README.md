# Weather Tracking Server
This is an HTTP server that utilizes the Open Weather API that exposes an endpoint that takes in latitude and longitude coordinates as query parameters. This endpoint will return the current weather condition in that area. It will provide a weather condition (snow, rain, clouds, etc.), whether it is hot, cold, or moderate outside (hot > 85, cold < 60, and moderate between 60 and 85), and whether there are any weather alerts in the area.
 
## Technology Used
 
### Packages/Dependencies used:
- `dotenv` for environment variables
- `express` for the server framework
- `node` and `ts-node` for runtime and Typescript Execution

### Development Dependencies used:
- `jest` for testing 
- `nodemon` for automatic server restarts during development
- `jest-test-mock` for mock API calls in test

This server was written in Typescript Node using the Express framework and the MVC architecture paradigm. The server exposes an empty endpoint '/' accepting two query parameters (latitude and longitude) of the requested location. It utilizes these coordinates to obtain the raw data from the Open Weather API, cleans it, transforms it, and returns the data condensed in an easy to read format. The dotenv file (explained below) stores the private information of the Port the listener is palced on as well as the API key obtained from the Open Weather API.

## Setup Instructions

### OpenWeather API Account
1. Navigate to [OpenWeather API](https://openweathermap.org/api) and create an account.
2. Subscribe to the One Call API 3.0 plan (free up to 1000 calls per day).
3. Generate an API key and save it for later use.

### Cloning the Repository
Clone the repository to your local machine.
```bash
git clone https://github.com/hlsamuel00/weatherServiceAPI.git
```

### Installing Dependencies
Navigate to the project directory and install the dependencies:
```bash
npm install
```
### Configuration
1. Create a `config` directory in the root of the project
2. Create a `.env` fine inside of the `config` directory and add the following key-value pairs:
```
PORT = 3005
API_KEY = your_openweather_api_key
```
## Running The Application

### Development Mode
To run the server in development mode with automatic restarts, use:
```bash
npm run dev
```

### Development Mode
To run the server in production mode, use:
```bash
npm start
```

## Testing

### Running Tests
The application currently supports tests for both the OpenWeatherClient to ensure effective calls are made to the API to obtain the raw data, and the cleanApiData module to ensure that once the correct data is received, it is cleaned and returned appropriately.

### Prerequisites
Before running tests, ensure that you have the required dependencies installed: 
```bash
npm install
```

### Running the Tests
To run the test, use:
```bash
npm test
```
### Test Structure
- OpenWeatherClient Tests: These tests ensure that the OpenWeatherClient correctly interacts with the OpenWeather API, making the proper requests and handling responses according to the defined RawClientData interface.
- cleanApiData Tests: These tests verify that the cleanApiData module processes and transforms the raw weather data correctly into the desired format.

### Testing Explanation
By running `npm test`, you will execute all the tests in your application and receive feedback on whether the API client and data cleaning module function as expected. The tests ensure that the integration with the OpenWeather API and the subsequent data processing are reliable and maintain the application's integrity.

## Using the API

### Making Requests
In a separate terminal (or in a browser) send a GET request to `http://localhost:3005` with the following query parameters:
- `latitude`: the latitude of the requested location
- `longitude`: the longitude of the requested location

Example Request:
```bash
curl "http://localhost:3005/?latitude=32.776665&longitude=-96.796989"
```

### Response Format
The server responds with weather data in JSON format. 

Example Response:
```json
  {
    "temp description": "Moderate",
    "current condition": "Smoke",
    "alerts": "No alerts at this time."
  }
```

## How It Works

### Request Handling
1. The server exposes an endpoint at `http://localhost:${PORT}`.
2. An instance of `OpenWeatherClient` is created, and initialized with the API key.
3. The `getWeather` method in `controllers/main.ts` handles incoming GET requests with latitude and longitude query parameters.
   - If the parameters are missing, the server responds with a 400 error.
4. The `fetchWeather` method of `OpenWeatherClient` fetches raw weather data from the OpenWeather API.
5. The raw data is typed using `models/rawClientData.ts`.
6. The `createApiResponse` method in `controllers/cleanApiData.ts` processes and transforms the raw data into a structured format defined in `models/weatherData.ts`.
7. The cleaned data is returned to the client in JSON format.
 
## Video Demonstration
To provide a visual guide, I've decided to include a video demonstration of me running the unit tests in jest and the end to end test using the command line and Postman

### Video Link
Watch the video below to see how to run the tests in Jest as well as making an end-to-end test by getting a response from the API using the command line and Postman.
- https://www.loom.com/share/0c0eadd217d84609bb6c957f1ee6cea6?sid=fa935477-1917-468b-9b26-d88fe57adcf1 

## Optimizations/Enhancements

- **Error Handling:** Improve error handling for various edge cases and API failures.
- **Caching:** Implement caching to reduce the number of API calls and improve response times.
- **Rate Limiting:** Add rate limiting to protect the server from abuse.
- **Testing:** Enhance testing to cover various edge cases and API failures
