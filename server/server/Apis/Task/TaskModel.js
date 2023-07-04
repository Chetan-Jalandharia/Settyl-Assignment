const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    title: { type: String, default: "", required: true },
    description: { type: String, default: "", unique: true, required: true },
    dueDate: { type: Date, required: true },
    currentStatus: { type: String, default: "Assigned" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'User' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'User' },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Task", taskSchema)   