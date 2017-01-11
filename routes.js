const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const chores = db.collection('chores')
  const router = new Router()

  router.get('/', (req, res) => {
    chores
      .find()
      .toArray((err, docs) => {
      if(err) return next(err)
      res.json(docs)
      })
  })

  router.post('/', (req,res) => {
    let child = parse(req.body)
    chores
      .insertOne(child)
      .then(() => res.status(201).json(child))
  })

  return router
}

function parse(child) {
  child = Object.assign({}, child)
  return child
}

module.exports = appRouter;
