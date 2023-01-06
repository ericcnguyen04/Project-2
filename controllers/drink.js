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
router.delete('/:id', async (req, res) => {
    // console.log('delete route')
    try {
        const deletePost = await db.beverage.findByPk(req.params.id)
        deletePost.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

// GET /drink/edit
router.get('/edit/:idx', (req, res) => {
    res.render('drink/edit.ejs')
})

// PUT /drink/edit
router.put('/edit/:idx', async (req, res) => {
    try {
        //READ function to find all favorite drinks
          const editDrinks = await db.beverage.findAll({

          })
          res.render('drink/edit.ejs')
        } catch (error) {
          console.log(error)
        }
})

// export the router
module.exports = router