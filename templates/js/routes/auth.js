const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {user} = require('../models/index')

const router = new express.Router()

router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', async (err, user, info) => {
      if (err || !user) {
        res.status(401).send({
          status: 401,
          error: 'Server Error'
        })
      } else if (!err && user) {
        const token = jwt.sign(user._id.toString(), process.env.SECRET)

        res.status(200).send({token})
      }
    })(req, res)
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Server Error'
    })
  }
})

router.post('/register', (req, res, next) => {
  try {
    user.register(
      new user({username: req.body.username}),
      req.body.password,
      function (err) {
        if (err) {
          res.status(500).send({
            status: 500,
            error: 'Server Error'
          })
        }

        res.json({
          status: 200
        })
      }
    )
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Server Error'
    })
  }
})

module.exports = router
