const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('ok')
})

module.exports = router
