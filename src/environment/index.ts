import dotenv from 'dotenv'

export default {
    
    load() {
        dotenv.config({
            path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
        })
        
        console.log(dotenv.config)
    }
}