const ObjectId = require('mongodb').ObjectID;

module.exports = [
  {
    _id: ObjectId('58910631b91e5021df17a4af'),
    name: "Skyler",
    chores: [
      {
        time: "Morning",
        id: "skyler1",
        description: "Make Your Bed",
        completed: false
      },
      {
        time: "Evening",
        id: "skyler2",
        description: "Brush Your Teeth",
        completed: false
      }
    ]
  },
  {
    _id: ObjectId(),
    name: "Riley",
    chores: [
      {
        description: "Make Your Bed",
        id: "riley1",
        time: "Morning",
        completed: false
      },
      {
        description: "Brush Your Teeth",
        id: "riley2",
        time: "Evening",
        completed: false
      }
    ]
  }
]
