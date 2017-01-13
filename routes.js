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

  router.delete('/:id', (req, res) => {
    const id = { _id: ObjectId(req.params.id) }
    chores
      .removeOne(id, {justOne: true})
  })

  router.put('/:name/dailyChores/:time', (req, res) => {
    let name = name: req.params.name
    let time = dailyChores.req.params.time
    chores
      .update({ name, time })
  }

  //   update({"name":"skyler", "dailyChores.time":"afternoon"},{"$push":{"dailyChores.$.chores":{"chore":"Do Your Homework", "completed": false}}})
  return router

}

function parse(child) {
  child = Object.assign({}, child)
  return child
}

module.exports = appRouter;
