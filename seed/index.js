const data = require('./data.json')
const MongoClient = require('mongodb').MongoClient

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/chores'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const chores = db.collection('chores')

  chores.find().toArray((err, docs) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    if (docs.length > 0 ) {
      return db.close()
    } else {
      chores.insertMany(data, (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        } else {
          db.close()
        }
      })
    }
  })

})
