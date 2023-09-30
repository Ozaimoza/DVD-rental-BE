const express = require('express')
const pool = require('../queries')
const router = express.Router()

router.get('/actors', (req, res) => {
    pool.query(`select * from actor`, (err, result) =>{
        if (err) {
            throw err
        }
        var data_per_page = 10
        var pagination = result.rows.length / data_per_page
        // console.log(pagination)
        var page = 1
        var offset = (page - 1) * 10
        pool.query(`select * from actor LIMIT ${data_per_page} OFFSET ${offset} `, (err, result)=>{
                    if (err) {
                        throw err
                    }
                    // res.status(200).json(result.rows)
                    res.render('./pages/actors', {'actor' : result.rows, 'pagi': pagination, 'page': page, })
                    })
    })
})
router.get('/actors/page/:num', (req, res) => {
    pool.query(`select * from actor`, (err, result) =>{
        if (err) {
            throw err
        }
        var data_per_page = 10
        var pagination = result.rows.length / data_per_page
        // console.log(pagination)
        var page = req.params.num
        var offset = (page - 1) * 10
        pool.query(`select * from actor LIMIT ${data_per_page} OFFSET ${offset} `, (err, result)=>{
                    if (err) {
                        throw err
                    }
                    // res.status(200).json(result.rows)
                    res.render('./pages/actors', {'actor' : result.rows, 'pagi': pagination, 'page': page, })
                    })
    })
})





module.exports = router