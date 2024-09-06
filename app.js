import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({ limit: "160kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))

app.use(cookieParser())


//import routes
import playerRouter from "./src/routes/playerRoute.js"


app.use('/api/v1/players', playerRouter)





export { app }