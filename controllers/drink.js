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
        ingredient: req.body.ingredient,
        userId: req.body.userId
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
router.get('/edit', async (req, res) => {
    try {
        const drink = await db.beverage.findByPk(req.query.id)
        res.render('drink/edit.ejs',{
            a: drink
        })

    } catch (error) {
      console.log(error)
      res.send('bad')
    }
})

// PUT /drink/edit
router.put('/edit', async (req, res) => {
    try {
          //res.send(req.body.id)
          const drink = await db.beverage.findByPk(req.body.id)
          await drink.update({
            name: req.body.name,
            description: req.body.description,
            ingredient: req.body.ingredient
          })
          res.redirect('/')
        } catch (error) {
          console.log(error)
          res.send('bad')
        }
})

// GET /api
router.get('', (req,res) => {
    
})

// export the router
module.exports = router