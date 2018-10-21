import React from 'react'
import axios from 'axios'

import * as co2 from '../lib/services/co2'

const SEARCH_ENDPOINT = 'http://localhost:4000/search'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        ingredients: [],
        name: '',
        url: ''
      },
      queryInput: '',
      loading: false
    }
  }

  runQuery() {
    this.setState({ loading: true })
    axios.get(`${SEARCH_ENDPOINT}`, {
      params: {
        q: this.state.queryInput
      }
    })
    .then(response => response.data)
    .then((recipe) => {
      this.setState({ recipe })
      return recipe
    })
    .then(recipe => this.resolveCo2(recipe))
    .catch(_ => null)
    .then(_ => this.setState({ loading: false }))
  }

  resolveCo2(recipe) {
    Promise.all(recipe.ingredients.map(({ text }) =>
      co2.bestGuessImpact(text)
        .catch(_ => null)
    ))
    .then(co2 => {
      console.log(co2)

      this.setState({ recipe: {
        ...this.state.recipe,
        ingredients: this.state.recipe.ingredients.map((ingredient, i) => ({
          ...ingredient,
          type: (co2[i] && co2[i].name) || undefined,
          co2: (co2[i] && co2[i].co2.mean * ingredient.weight / 1000) || undefined
        }))
      }})
    })
  }

  onQueryChange(event) {
    this.setState({ queryInput: event.target.value })
  }

  onQuerySubmit(event) {
    this.runQuery()
  }

  render() {
    const totalCo2 = this.state.recipe.ingredients.reduce((sum, ingredient) => sum + (ingredient.co2 || 0), 0)
    return <div>
      <input value={this.state.queryInput} onChange={this.onQueryChange.bind(this)}/><input type='submit' onClick={this.onQuerySubmit.bind(this)} />
      { this.state.loading ? <div>Loading...</div> : null }
      <h1>{ this.state.recipe.name }</h1>
      <a href={ this.state.recipe.url }>go to recipe</a><br />
      { this.state.recipe.ingredients.map(ingredient => <div key={ingredient.text}>({ingredient.weight}) {ingredient.text} &rarr; {ingredient.type} &rarr; <b>{ingredient.co2}</b> </div>) }
      <h2>kg CO2e: { totalCo2 }</h2>
    </div>
  }
}
