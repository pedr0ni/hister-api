import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import database from './database'
import router from './router'

const app = express()

// Initialize compress extensions
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cors())

router.load(app)

app.prototype.disconnect = async () => {
    await database.disconnect()
}

export default app