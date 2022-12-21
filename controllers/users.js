// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// mount out routes on the router

// GET /users/new - serves a form to create a new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
// POST /users -- creates a new user from the form @ /users/new
router.post('/', async (req, res) => {
    try {
        // based on the info in the req.body, find or create a user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: don't add plaintext passwords to the db
            defaults: { 
                password: req.body.password
            }
        })
        // TODO: redirect to the login page if the user is found
        // log the user in (store the user's id as a cookie in the browser)
        res.cookie('userID', newUser.id)
        // redirect to the home page (for now)
        res.redirect('/')
    } catch(err) {x
        console.log(err)
        res.status(500).send('server error')
    }
})

// GET /users/login -- render a login form that POSTs to /users/login
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login -- ingest data from form rendered @ GET /users/login
router.post('/login', async (req,res) => {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        // booilerplate message if login fails
        const badCredentialMessage = 'username or password incorrect'
        if (!user) {
            // if the user isn't found in the db
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else if (user.password !== req.body.password) {
            // if the user's supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
            // if the user is found and their password matches. log them in
            console.log('logging user in!')
            res.cookie('userID', user.id)
            res.redirect('/')
        }
    } catch(err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// GET /users/logout -- clear any cookies and redirect to the homepage
router.get('/logout', (req,res) => {
    // log the user out by removeing the cookie
    res.clearCookie('userId')
    res.redirect('/')
})

// export the router
module.exports = router