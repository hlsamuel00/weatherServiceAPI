import { WeatherData } from '../models/weatherData'
import { TempDescriptions } from '../models/weatherData'
import { RawClientData } from '../models/rawClientData'

/**
 * Get a description of the temperature based on it's Fahrenheit numerical value.
 * @param {number} temperature - The temperature to describe.
 * @returns {TempDescriptions} The description of the temperature.
 */
function getTempDesc(temperature: number): TempDescriptions{
    if (temperature < 70){
        return TempDescriptions.Cold
    }
    else if (temperature > 87.5){
        return TempDescriptions.Hot
    }
    else {
        return TempDescriptions.Moderate
    }
}

/**
 * Transform the raw API data into the response needed for the user.
 * @param {RawClientData} data - The data in JSON format received from the API client
 * @returns {WeatherData} The cleaned and transformed data for the user
*/
export function createApiResponse(data: RawClientData): WeatherData{
    // Extract relevant weather data
    let alerts = data.alerts || []
    let string_alerts = alerts.map((alert)=> `${alert.event}\\n${alert.description}`)

    // Prepare the object for the API response
    const weatherInfo: WeatherData = {
        'temp description' : getTempDesc(data.current.temp),
        'current condition' : data.current.weather[0].main,
        'alerts': string_alerts.length ? string_alerts : 'No alerts at this time.'
    }
    
    // Return the weather object
    return weatherInfo
}
