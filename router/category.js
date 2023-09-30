const express = require('express')
const pool = require('../queries')
const { render } = require('ejs')
const router = express.Router()

router.get('/category', (req, res) => {
    pool.query('select * from category ', (err, result)=>{
        if (err) {
            throw err
        }
        
        // res.json(result.rows)
        res.render('./pages/category', {'category' : result.rows})
    })
})

router.get('/category/:name', (req, res) => {
    // console.dir(req.params.name)
    var name = req.params.name
    pool.query(`select * from film 
                join film_category fc
                on film.film_id = fc.film_id 
                join category c 
                on fc.category_id = c.category_id 
                where c.name  = '${name}' `, (err, result)=>{
                    if (err) {
                        throw err
                    }
                    
                    // res.status(200).json(result.rows)
                    res.render('./pages/film_category', {'film' : result.rows, 'name_of_category' : name} )
                })
})



module.exports = router