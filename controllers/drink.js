// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// GET /drink -- view all posts


// GET /drink/new -- show form for creation of new post
router.get('/new', (req, res) => {
    res.render('drink/new.ejs', {})
})

// POST /drink/new - creation of post in browser
router.post('/', (req, res) => {
    db.beverage.create({
        name: req.body.name,
        description: req.body.description,
        ingredient: req.body.ingredient
    })
    .then((post) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

// DELETE  /drink/delete
router.post('/:idx', (req, res) => {
    db.beverage.delete({
        where: {
            id: req.params.id
        }
    })
    .then((post) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

// PUT /drink/edit

// export the router
module.exports = router