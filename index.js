// === required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const axios = require('axios')
const methodOverride = require('method-override')


// === app config
const app = express()
const PORT = process.env.PORT || 4000
app.set('view engine', 'ejs')
// parse request bodies from html forms
app.use(express.urlencoded({extended: false}))
// enable PUTing and DELETEing from HTML5 forms
app.use(methodOverride('_method'))
// tell express to parse incoming cookies
app.use(cookieParser())

// custom auth middleware that checks the cookies for a user id
// and if it finds one, it will loop up the user in the db
// tell all downstream routes about this user
app.use(async(req, res, next) => {
    try {
        if (req.cookies.userId) {
            // decrypt the user id and turn it into a string
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            // the user is logged in, lets find them in the db
            const user = await db.user.findByPk(decryptedString)
            // mount the logged in user on the res.locals
            res.locals.user = user
        } else {
            // set the logged in user to be null for conditional rendering
            res.locals.user = null
        }

        // move on to the next middleware/route
        next()
    } catch(err) {
        console.log('error in auth middleware:🔥🔥🔥🔥🔥', err)
        next() // go to the next thing
    }
})

// example custom middleware (incoming request logger)
app.use((req, res, next) => {
    // our code goes here
    // console.log('hello from inside of the middleware!')
    console.log(`incoming request: ${req.method} - ${req.url}`)
    // res.locals are a place that we can put data to sharw with 'downstream routes'
    // res.locals.myData = 'hello I am data'
    // invoke next to tell express to go to the next route or middle
    next()
})

// === routes and controllers
// GET / - display form of posts
app.get('/', async (req, res) => {
    try {
    //READ function to find all favorite drinks
      const posts = await db.beverage.findAll()
      res.render('home.ejs', {
        posts: posts
      })
    } catch (error) {
      console.log(error)
    }
  })



app.use('/users', require('./controllers/users'))
app.use('/drink', require('./controllers/drink'))



// === listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT}`)
})