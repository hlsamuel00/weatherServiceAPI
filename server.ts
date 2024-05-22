// Environment Variables Configuration
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

// Imports
import express from 'express'
import mainRouter from './routes/main'

const app = express()

// Routes
app.use('/', mainRouter)

// Listener
app.listen(process.env.PORT, () => {
    console.log(`The server is running on port: ${process.env.PORT}.`)
})