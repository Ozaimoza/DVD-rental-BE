const express = require('express')
const app = express()
const port = 3000
const pool = require('./queries.js')
const film = require('./router/film.js')
const category = require('./router/category.js')
const actor = require('./router/actors.js')
const ejs = require('ejs');

pool.connect( (err, res) => {
    if (err){
        console.log(err)
    }
    console.log(`Connected To DB`)

})
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('pages/home')
})

app.use(film)
app.use(category)
app.use(actor)

// app.listen(port);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})