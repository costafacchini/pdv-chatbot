const mongoose = require('mongoose')

class MongoServer {
  constructor(uri) {
    this.mongoUri = uri
  }

  async connect() {
    try {
      mongoose.connection
        .on('error', (err) => {
          throw new Error(err)
        })

      await mongoose.connect(this.mongoUri)
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = { MongoServer }