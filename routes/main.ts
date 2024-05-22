// Imports
import { Router } from 'express'
const mainRouter = Router()
import * as mainController from '../controllers/main'

// @description     Gets the weather data using the latitude and longitude passed in as options with the API call
// @route           Get /?latitude=?longitude=
mainRouter.get('/', mainController.getWeather)

export default mainRouter