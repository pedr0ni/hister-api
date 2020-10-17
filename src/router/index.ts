import { Application } from 'express'
import fs from 'fs'
import path from 'path'

export default {
    async load(app: Application) {
        const files = fs.readdirSync(path.join(__dirname, '../controllers'))

        await files.forEach(entry => {
            const filePath = path.join(__dirname, `../controllers/${entry}`)
            const routerPath = entry.substring(0, entry.indexOf('Controller')).toLowerCase()

            console.log(`[ROUTER] Loading ${entry} into /${routerPath}`)
            app.use(`/${routerPath}`, require(filePath).default)
            console.log(`[ROUTER] Loaded ${entry} into /${routerPath}`)
        })
    }
}