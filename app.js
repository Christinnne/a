const express = require('express')
const app = express()
const exphds = require('express-handlebars')
const restaurant_list = require('./restaurant.json')
const port = 3000

app.engine('handlebars', exphds.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurant_list.results })
})

app.get('/restaurants/:index', (req, res) => {
  const restaurant = restaurant_list.results.find(item => item.id.toString() === req.params.index)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const restaurants = restaurant_list.results.filter(item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants, keywords: req.query.keyword})
})

app.listen(port, () => {
  console.log(`server running`)
})