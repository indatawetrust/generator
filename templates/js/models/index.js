const mongoose = require('mongoose')
const fs = require('fs')
mongoose.Promise = global.Promise

mongoose.connect(
  `mongodb://localhost:27017/${process.env.DB}`,
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.error(err)
      process.exit()
    }
  }
)

module.exports = {
  user: require('./user')
}
