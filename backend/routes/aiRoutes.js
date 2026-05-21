const express = require('express')

const router = express.Router()

const {
  generateRCA
} = require('../controllers/aiController')

router.post(
  '/rca',
  generateRCA
)

module.exports = router