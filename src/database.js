const { MongoServer } = require('./mongo')

async function connect() {
  const config = {
    development: { uri: process.env.MONGODB_URI },
    production: { uri: process.env.MONGODB_URI },
  }

  const { username, password, host, db, uri } = config[process.env.NODE_ENV || 'development']

  const mongoServer = new MongoServer(uri || `mongodb://${username}:${password}@${host}/${db}`)
  await mongoServer.connect()
}

module.exports = connect