const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const chores = db.collection('chores')
  const router = new Router()

  router.get('/', (req, res) => {
    chores.find().toArray((err, docs) => {
      if(err) return next(err)
      res.json(docs)
    })
  })

  return router
}

module.exports = appRouter;
