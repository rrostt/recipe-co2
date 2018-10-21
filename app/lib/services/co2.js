const axios = require('axios')

const equivalents = {
  beef: 'beef',
  lamb: 'lamb',
  'wild meat': 'wild, rabbit, dear, boar',
  pork: 'pork, bacon',
  poultry: 'poultry, chicken, turkey',
  seafood: 'seafood, fish, seabass, crab, lobster',
  'processed meat': 'sausage, chorizo',
  egg: 'egg',
  quorn: 'quorn',
  'meat substitute': 'fake meat',
  nuts: 'nuts, peanuts, cashew',
  legumes: 'legume, bean, lentil, legume',

  milk: 'milk',
  cream: 'cream',
  cheese: 'cheese, cheddar',
  butter: 'butter',
  'other dairy': '',

  rice: 'rice',
  potatoe: 'potato',
  pasta: 'pasta',
  bread: 'bread',
  grain: 'grain, flour, sugar',

  fruit: 'fruit, apple, banana, orange, kiwi',
  'sallad greens': 'sallad, tomato, cucumber, pea, leek, celery, paprika, cauliflower',
  'root vegetables': 'onion, carrot, garlic',
  greens: '',

  juice: 'juice',

  sauce: 'sauce',
  oil: 'oil',
  margarine: 'margarine',
  spice: 'spice',

  candy: 'candy'
}

const getFirstFromCo2 = q =>
  axios.get('https://co2.rost.me/q?', {
    params: { name: q }
  })
  .then(response => response.data)
  .then(results => results && results[0])
  .then(result => {
    if (!result) throw new Error('not found')
    return result
  })

const guessType = thing =>
  Object.keys(equivalents).reduce((prevResult, equivalent) =>
    prevResult.catch(_ => {
      const words = equivalents[equivalent]
        .split(',')
        .map(x => x.trim())
        .filter(x => x.length > 0)
      console.log('words', words)
      return words.some(word => thing.indexOf(word) > -1) && equivalent
    })
    .then(x => {
      if (!x) throw new Error('not found')
      return x
    }),
    Promise.reject(new Error('not found'))
  )

const bestGuessImpact = thing =>
  getFirstFromCo2(thing)
    .catch(_ =>
      guessType(thing)
        .then(type => getFirstFromCo2(type))
    )

export {
  guessType,
  bestGuessImpact
}
