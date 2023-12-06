const {Schema, model} = require('mongoose')

const taskSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "You must provide a name"],
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: new Date()
        }

    }
)

const Task = model('task', taskSchema)

module.exports = Task
