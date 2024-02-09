const { Schema, model } = require("mongoose");

const userSchema = Schema({
    user_id: {
        type: Number,
        unique: true,
        require: true
    },
    user_name: {
        type: String,
    },
    balance: {
        type: Number,
    },
}, { timestamps: true });

module.exports = model("User", userSchema);