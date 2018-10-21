const axios = require('axios')

const EDAMAM_API_ID = process.env.EDAMAM_API_ID || ''
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY || ''

const search = q =>
  axios.get(`https://api.edamam.com/search`, {
    params: {
      q,
      app_id: EDAMAM_API_ID,
      app_key: EDAMAM_API_KEY
    }
  })
  .then(response => response.data)
  .then(data => data.hits[0].recipe)
  .then(recipe => ({
    name: recipe.label,
    ingredients: recipe.ingredients,
    url: recipe.url
  }))
  .catch(error => {
    console.log(error)
    throw error
  })

module.exports = {
  search
}
