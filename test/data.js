const { ObjectId } = require( 'mongodb')

module.exports = [
  {
    "name": "Skyler",
    "_id": ObjectId(),
    "chores": [
      {
        "time": "Morning",
        "id": ObjectId(),
        "description": "Make Your Bed",
        "completed": false
      },
      {
        "time": "Evening",
        "id": ObjectId(),
        "description": "Brush Your Teeth",
        "completed": false
      }
    ]
  },
  {
    "name": "Riley",
    "_id": ObjectId(),
    "chores": [
      {
        "description": "Make Your Bed",
        "id": ObjectId(),
        "time": "Morning",
        "completed": false
      },
      {
        "description": "Brush Your Teeth",
        "id": ObjectId(),
        "time": "Evening",
        "completed": false
      }
    ]
  }
]
