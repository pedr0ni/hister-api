import { Application } from 'express'
import fs from 'fs'
import path from 'path'
import environment from '../environment'

environment.load()

export default {
    load(app: Application) {
        let files = fs.readdirSync(path.join(__dirname, '../controllers'))

        //if (process.env.NODE_ENV != 'test')
            //files = files.filter(file => file.endsWith('.js'))

        files.forEach(entry => {
            const filePath = path.join(__dirname, `../controllers/${entry}`)
            const routerPath = entry.substring(0, entry.indexOf('Controller')).toLowerCase()

            console.log(`[ROUTER] Loading ${entry} into /${routerPath}`)
            app.use(`/${routerPath}`, require(filePath).default)
            console.log(`[ROUTER] Loaded ${entry} into /${routerPath}`)
        })
    }
}