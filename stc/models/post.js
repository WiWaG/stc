//Wouter
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    date: {
        type: {
            type: Date,
            default: Date.now
        }
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

    categoryType: {
        type: String,
        required: true,
        enum: ["aanbod", "vraag"],
        lowercase: true
    },

    categoryRequestType: {
        type: String,
        lowercase: true
    },

    region: {
        type: String,
        lowercase: true
    }

});

module.exports = mongoose.model("Post", PostSchema);