// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// GET /drink/new - serves a form to create a new user
router.get('/new', (req, res) => {
    res.render('drink/new.ejs', {
        user: res.locals.user
    })
})


// export the router
module.exports = router