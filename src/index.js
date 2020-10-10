const app = require('./app')

// Start application 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[API] Listening on port ${port}`)
})