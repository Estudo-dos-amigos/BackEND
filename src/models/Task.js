const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
  name: { type: String, required: [true, "O campo name é obrigatorio"] },
  description: { type: String, required: [true, "O campo description é obrigatorio"] },
  taskDone: { type: Boolean, required: [true, "O campo taskDone é obrigatorio"] },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdDate: { type: Date, default: Date.now }
})

module.exports = Task
