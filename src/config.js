import { config } from "dotenv"
config()

export default {
    listenPort: process.env.PORT,
    corsOptions:[process.env.CORS_OPT]
}