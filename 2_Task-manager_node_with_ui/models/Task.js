const mongoose = require('mongoose');

//schema
const TaskSchema = new mongoose.Schema({
  name: {
    //validators
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [30, 'name cannot be more than 30 characters'],
  },
  completed: {
    //validators
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
