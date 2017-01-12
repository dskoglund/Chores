const Router = require('express').Router
const assert = require('assert')
const ObjectId = require('mongodb').ObjectId

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

  router.post('/', (req, res) => {
    let child = parse(req.body)
    chores
      .insertOne(child)
      .then(() => res.status(201).json(child))
  })

  router.put('/:id', (req, res) => {
    const id = { _id: ObjectId(req.params.id) }
    chores
      .remove(id, {justOne: true})
  })

  return router

}

function parse(child) {
  child = Object.assign({}, child)
  return child
}

module.exports = appRouter;
