const mongoose = require('mongoose')

const User = mongoose.model('User',{
  name: { type: String, required: [true, "O campo name é obrigatorio"] },
  email: { type: String, required: [true, "O campo email é obrigatorio"] },
  password: { type: String, required: [true, "O campo password é obrigatorio"] },
  createdDate: { type: Date, default: Date.now }
})

module.exports = User