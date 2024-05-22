import fetchMock from 'jest-fetch-mock'
import OpenWeatherClient from '../ApiClients/OpenWeatherClient'
import { RawClientData } from '../models/rawClientData'
import { describe, test, expect, beforeEach } from '@jest/globals'

fetchMock.enableMocks()

const mockApiResponse: RawClientData = {
    "lat": 40.7128,
    "lon": -74.0060,
    "timezone": "America/New_York",
    "timezone_offset": -14400,
    "current": {
        "dt": 1625487999,
        "sunrise": 1625462400,
        "sunset": 1625512800,
        "temp": 298.15,
        "feels_like": 298.95,
        "pressure": 1013,
        "humidity": 56,
        "dew_point": 288.15,
        "uvi": 5,
        "clouds": 75,
        "visibility": 10000,
        "wind_speed": 4.1,
        "wind_deg": 240,
        "wind_gust": 7.2,
        "weather": [{
            "id": 801,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
        }]
    },
    "alerts": [{
        "event": "Heat Advisory",
        "description": "A heat advisory is in effect."
    }]
}

describe('OpenWeatherClient testing to ensure API client provides correct response data', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    test('should fetch weather data and match RawClientData model', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse))

        const client = new OpenWeatherClient(process.env.API_KEY)
        const data: RawClientData = await client.fetchWeather('40.7128', '-74.0060')

        // Validate specific structure and types
        expect(data).toMatchObject({
            lat: expect.any(Number),
            lon: expect.any(Number),
            timezone: expect.any(String),
            timezone_offset: expect.any(Number),
            current: expect.objectContaining({
                dt: expect.any(Number),
                sunrise: expect.any(Number),
                sunset: expect.any(Number),
                temp: expect.any(Number),
                feels_like: expect.any(Number),
                pressure: expect.any(Number),
                humidity: expect.any(Number),
                dew_point: expect.any(Number),
                uvi: expect.any(Number),
                clouds: expect.any(Number),
                visibility: expect.any(Number),
                wind_speed: expect.any(Number),
                wind_deg: expect.any(Number),
                wind_gust: expect.any(Number),
                weather: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        main: expect.any(String),
                        description: expect.any(String),
                        icon: expect.any(String)
                    })
                ])
            }),
            alerts: expect.arrayContaining([
                expect.objectContaining({
                    event: expect.any(String),
                    description: expect.any(String)
                })
            ])
        })
    })

    test('should throw an error if the fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'))

        const client = new OpenWeatherClient('fake-api-key')

        await expect(client.fetchWeather('40.7128', '-74.0060')).rejects.toThrow('Failed to fetch')
    })
})