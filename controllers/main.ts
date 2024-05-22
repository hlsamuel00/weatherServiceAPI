// Imports
import { Request, Response } from 'express'
import OpenWeatherClient from '../ApiClients/OpenWeatherClient'
import { createApiResponse } from './cleanApiData'
import { RawClientData } from '../models/rawClientData'
import { WeatherData } from '../models/weatherData'


// Initialize OpenWeatherClient for OpenWeather API calls
const weatherClient: any = new OpenWeatherClient(process.env.API_KEY)

/**
 * Get the raw data from the OpenWeather API client, clean, transform, and return it to the user
 * @param {Request} req - The request object received from the exposed endpoint; latitude and longitude are required and will return an error if not provided.
 * @param {Response} res - The response object used to send back the desired weather data or an error message.
 * @returns {Promise<Response<WeatherData>} - The response containing the cleaned and transformed weather data in JSON format.
 */
export const getWeather =  async (req: Request, res: Response): Promise<Response<WeatherData>> => {
    const { latitude, longitude } = req.query

    // Determine if the latitude and longitude were provided.
    if (!latitude || !longitude){
        return res.status(400).json({ error: 'Latitude and Longitude are required.' })
    }

    // Get specific weather data by calling the WeatherClient with the latitude and longitude of the request
    const rawData: RawClientData = await weatherClient.fetchWeather(latitude, longitude)
    const weatherInfo: WeatherData = createApiResponse(rawData)
    
    return res.json(weatherInfo)
}