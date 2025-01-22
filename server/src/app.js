import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import apiError from './utils/apiError.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "10mb"}))

app.use(express.urlencoded({extended: true, limit: "10mb"}))

app.use(express.static("public"))

app.use(cookieParser())

import userRoutes from "./routes/user.route.js"

app.use('/api/v1/users', userRoutes)

// app.use((req, res, next) => {
//     const error = new apiError(404, "Error Occured")
//     next(error)
// });

app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        statusCode: statusCode
    })
})

app.get('/', (req, res) => {
    console.log('Server is running')
    res.status(200).send({
        "success": true,
        "msg": "Node server is running"
    })
})

export default app