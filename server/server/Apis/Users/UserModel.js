const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: { type: String, default: "", required: true },
    email: { type: String, default: "", unique: true, required: true },
    password: { type: String, default: "", required: true },

    loginLogs: [{
        ip: { type: String, default: '' },
        loginTime: { type: Date, default: Date.now() },
        isLoged: { type: Boolean, default: false }
    }],

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("User", userSchema)