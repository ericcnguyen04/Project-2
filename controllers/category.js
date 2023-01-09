// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// GET /category -- view all posts
router.get('/', (req, res) => {
    res.render('category/show.ejs', {})
})

// GET /category/alcoholic-- view all posts
router.get('/Alcoholic', async (req, res) => {
    try {
    //READ function to find all favorite drinks
        const posts = await db.beverage.findAll({
            include: [db.user, db.category]
        })        
        // const category = await db.category.findOne({
        //     where: {
        //         name: 'Alcoholic' //req.query.category
        //     }
        // })
      // res.send(posts)
      // const relatedPost = await posts.getCategory(category)
      console.log(posts[0].categories[0].dataValues.name)
      res.render('category/alcoholic.ejs', {
        posts: posts
      })
    } catch (error) {
      console.log(error)
    }
})

// GET /category/non-alcoholic-- view all posts
router.get('/Non-Alcoholic', async (req, res) => {
    try {
        //READ function to find all favorite drinks
          const posts = await db.beverage.findAll({
            include: {
              model: db.user
            }
          })
          const category = await db.category.findOne({
            where: {
                name: 'Non-Alcoholic' //req.query.category
            }
        })
          // res.send(posts)
          res.render('category/non-alcoholic.ejs', {
            posts: posts,
            category: category
          })
        } catch (error) {
          console.log(error)
        }
})

// export the router
module.exports = router