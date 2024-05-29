const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
       
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
