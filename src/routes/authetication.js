const express = require('express')
const router = express.Router()
const passport = require('../lib/password')

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res) => {
    passport.authenticate('local.signup')
})

module.exports = router