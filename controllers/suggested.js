// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')

// GET /suggested -- view all posts
router.get('/', async (req, res) => {
    try {
        const input = req.params.name
        const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
        const foundData = await axios.get(apiURL)
          console.log(foundData.drink)
          
        // res.send(foundData.data.forms)
        res.render("suggested/show.ejs", {
          name: foundData.data
        })
      } catch(err) {
        console.error(err)
      }
})


// export the router
module.exports = router