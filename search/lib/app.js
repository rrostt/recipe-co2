const express = require('express')
const app = express()
const cors = require('cors')

const recipies = require('./services/recipies')

app.use(cors())

app.get('/search', (req, res) => {
  const { q } = req.query

  recipies.search(q)
    .then(recipe => {
      res.json(recipe)
    })
    .catch(_ => {
      res.statusCode(500).send('no')
    })
})

module.exports = app
