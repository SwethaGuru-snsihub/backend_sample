const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    due_date: {
        type: Date,
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Todo", todoSchema);
