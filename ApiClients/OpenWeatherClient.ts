import { RawClientData } from "../models/rawClientData"


class OpenWeatherClient{
    private apiKey: string
    public baseURL: string

    constructor(apiKey: string){
        this.apiKey = apiKey
        this.baseURL = 'https://api.openweathermap.org/data/3.0/onecall?'
    }
/**
 * Get the raw data from the OpenWeather API client
 * @param {string} latitude - The latitude of the location to obtain the weather data.
 * @param {string} longitude - The longitude of the location to obtain the weather data.
 * @returns {Promise<RawClientData>} - The response received from the API client and data (if received) in JSON format
 */
    async fetchWeather(latitude: string, longitude: string): Promise<RawClientData> {
        // Construct the query builder for the OpenWeather API Call
        const params = new URLSearchParams({
            'lat': latitude,
            'lon': longitude,
            'exclude': 'minutely,hourly,daily',
            'units': 'imperial', 
            'appid': this.apiKey
        })
        
        // Construct the URL needed for the fetch
        const url = `${this.baseURL}${params.toString()}`

        try {
            const response = await fetch(url)
            let rawData = await response.json() as RawClientData
            return rawData

        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

export default OpenWeatherClient
