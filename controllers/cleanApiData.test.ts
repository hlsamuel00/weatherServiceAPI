import { createApiResponse } from './cleanApiData'
import { RawClientData } from '../models/rawClientData'
import { WeatherData, TempDescriptions } from '../models/weatherData'
import { describe, test, expect } from '@jest/globals'


const mockApiData: RawClientData = {
    current: {
        temp: 75,
        weather: [{ main: 'Clear' }]
    },
    alerts: [
        {
            event: 'Thunderstorms',
            description: 'Thunderstorms expected in area.'
        },
        {
            event: 'Tornado Watch',
            description: 'Be on the lookout for possible tornado in area.'
        }
    ]
}

const mockApiData2: RawClientData = {
    current: {
        temp: 90,
        weather: [{ main: 'Clear' }]
    },
    alerts: [
        {
            event: 'Heat Wave',
            description: 'High temperatures expected.'
        }
    ]
}

const mockApiDataNoAlerts: RawClientData = {
    current: {
        temp: 60,
        weather: [{ main: 'Cloudy' }]
    },
    alerts: []
}

const mockApiDataNoAlerts2: RawClientData = {
    current: {
        temp: 101,
        weather: [{ main: 'Rain' }]
    },
    alerts: []
}

// Run unit tests to ensure that the 
describe('cleanApiData testing to ensure module cleans data correctly', () => {
    
    test('createApiResponse() returns correct weather data with alerts', () => {
        const expectedWeatherData: WeatherData = {
            'temp description': TempDescriptions.Moderate,
            'current condition': 'Clear',
            'alerts': [
                'Thunderstorms\\nThunderstorms expected in area.', 
                'Tornado Watch\\nBe on the lookout for possible tornado in area.' 
            ]    
        }

        const result = createApiResponse(mockApiData)
        expect(result).toEqual(expectedWeatherData)
    })

    test('createApiResponse() returns correct weather data with alerts', () => {
        const expectedWeatherData: WeatherData = {
            'temp description': TempDescriptions.Hot,
            'current condition': 'Clear',
            'alerts': [
                'Heat Wave\\nHigh temperatures expected.'
            ]    
        }

        const result = createApiResponse(mockApiData2)
        expect(result).toEqual(expectedWeatherData)
    })
    
    test('createApiResponse() returns correct weather with no alerts', () => {
        const expectedWeatherData: WeatherData = {
            'temp description': TempDescriptions.Cold,
            'current condition': 'Cloudy',
            'alerts': 'No alerts at this time.'
        }
        
        const result = createApiResponse(mockApiDataNoAlerts)
        expect(result).toEqual(expectedWeatherData)
    })
    
    test('createApiResponse() returns correct weather with no alerts', () => {
        const expectedWeatherData: WeatherData = {
            'temp description': TempDescriptions.Hot,
            'current condition': 'Rain',
            'alerts': 'No alerts at this time.'
        }

        const result = createApiResponse(mockApiDataNoAlerts2)
        expect(result).toEqual(expectedWeatherData)
    })
})