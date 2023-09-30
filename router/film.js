const express = require('express')
const pool = require('../queries')
const router = express.Router()

router.get('/film', (req, res) => {
    pool.query(`select * from film`, (err, result) =>{
        if (err) {
            throw err
        }
        var data_per_page = 10
        var pagination = result.rows.length / data_per_page
        // console.log(pagination)
        var page = 1
        var offset = (page - 1) * 10
        pool.query(`select film.film_id ,film.title, film.description, film.release_year, language.name as language, film.rating from film 
                    join language on film.language_id = language.language_id LIMIT ${data_per_page} OFFSET ${offset}
                    `, (err, result)=>{
                    if (err) {
                        throw err
                    }
                    // res.status(200).json(result.rows)
                    res.render('./pages/film', {'film' : result.rows, 'pagi': pagination, 'page': page, })
                    })
    })
})

router.get('/film/page/:num', (req, res) => {
    pool.query(`select * from film`, (err, result) =>{
        if (err) {
            throw err
        }
        var data_per_page = 10
        var pagination = result.rows.length / data_per_page
        // console.log(pagination)
        var page = req.params.num
        var offset = (page - 1) * 10
        pool.query(`select film.title, film.description, film.release_year, language.name as language, film.rating from film 
                    join language on film.language_id = language.language_id LIMIT ${data_per_page} OFFSET ${offset}
                    `, (err, result)=>{
                    if (err) {
                        throw err
                    }
                    // res.status(200).json(result.rows)
                    res.render('./pages/film', {'film' : result.rows, 'pagi': pagination, 'page': req.params.num, })
                    })
    })
})

router.get('/film/:id', (req, res) => {
    const id  = req.params.id
    pool.query(`select * from film where film_id = ${id} `, (err, result)=>{
        if (err) {
            throw err
        }
        
        // res.status(200).json(result.rows)
        res.render('./pages/film_detail', {'detail' : result.rows } )
    })
})




module.exports = router