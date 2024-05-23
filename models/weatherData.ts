// Model for the temperature descriptions
enum TempDescriptions{
    Freezing = 'Freezing',
    Cold = 'Cold',
    Moderate = 'Moderate',
    Hot = 'Hot',
    Boiling = 'Boiling'
}

// Model for the weather data that will be returned from the API
interface WeatherData { 
    'temp description': TempDescriptions,
    'current condition': string,
    'alerts': string[] | string
}

export { TempDescriptions, WeatherData }