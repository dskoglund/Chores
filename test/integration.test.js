/* global describe, it, before, after, beforeEach */
const { MongoClient } = require('mongodb')
const request = require('request')
const { expect } = require('chai')
const data = require('./data')
const createApp = require('../chores-app')

const TEST_DB = 'mongodb://localhost:27017/test'
const TEST_PORT = 3002
const TEST_URI = 'http://localhost:' + TEST_PORT

describe('Chores API', () => {

  let db, server, chores

  before(done => {
    MongoClient.connect(TEST_DB, (err, _db) => {
      if(err) return done(err)
      db = _db
      chores = db.collection('chores')
      const app = createApp(db)
      server = app.listen(TEST_PORT, () => {
        done()
      })
    })
  })

  after(done => {
    db.close(true, () => {
      server.close()
      done()
    })
  })

  beforeEach(done => {
    chores
      .remove({}, err => {
        if (err) return done(err)
        chores
          .insertMany(data, err => {
            if (err) return done(err)
            done()
          })
      })
  })

  describe('GET /shoes', () => {
    it('return a list of user objects and their chores', done => {
      request.get(TEST_URI + '/chores', { json: true }, (err, res, body) => {
        expect(err).to.be.null
        expect(res).to.have.property('statusCode', 200)
        expect(body).to.have.lengthOf(2)
        done()
      })
    })
  })
})
