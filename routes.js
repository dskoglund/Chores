const Router = require('express').Router
const assert = require('assert')
const ObjectId = require('mongodb').ObjectId

const appRouter = function(db) {
  const chores = db.collection('chores')
  const router = new Router()

  router.get('/', (req, res) => {
    console.log('get chores')
    chores
      .find()
      .toArray((err, docs) => {
      if(err) return next(err)
      res.json(docs)
      })
  })

  router.post('/', (req, res) => {
    console.log('create child')
    let child = parse(req.body)
    chores
      .insertOne(child)
      .then(() => res.status(201).json(child))
  })

  router.delete('/:id', (req, res) => {
    console.log('delete child')
    const id = { _id: ObjectId(req.params.id) }
    chores
      .removeOne(id, {justOne: true})
  })

  router.put('/:id', (req, res) => {
    console.log('delete chore')
    const id = { "id": ObjectId(req.body.id) }
    console.log(req.body.chore)
    chores
      .update( {}, { $pull: { "chores": id } } )

  })

  router.post('/:id', (req, res) => {
    const _id = { _id: ObjectId(req.body.id)}
    const x = ObjectId()

    console.log('create chore')
    const chore = { chores : { description: req.body.chore,
                              time: req.body.time,
                              id: x,
                              completed: false }}
    console.log(x)
    chores
      .update( _id ,{ $push : chore })
  })

  return router

}

function parse(child) {
  child = Object.assign({}, child)
  return child
}

module.exports = appRouter;
