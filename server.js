

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use(serveStatic('build'))

// make a callback fuction  that takes overything and has require and response as values
app.get('*', (req, res) => {
    // in the return we will sendFile back to the user and the path resolve takes the index from build folder into the browser
    return res.sendFile(path.resolve('build', 'index.html'))
})

// specify the environment or take it the localhost 3000 and make have the listen method to PORT where msg will come
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)) 