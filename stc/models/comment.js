const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String,
        required: true
    },

    date: {
        type: {
            Date,
            default: Date.now
        }
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model("Comment", CommentSchema);