const mongoose = require('mongoose')

const {
    Schema,
    Schema: {
        Types: { ObjectId },
    },
    model,
} = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    avatar: {
        type: String,
    },
    favs: {
        type: [ObjectId],
        ref: 'Post',
    },
})
const pet = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    size: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    breed: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    image: {
        type: String,
        required: true,
    },
})

const comment = new Schema({
    // CASE LINKED
    // posts: {
    //     type: ObjectId,
    //     ref: 'Post',
    //     required: true,
    // },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        requeried: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    likes: {
        type: [ObjectId],
        ref: 'User',
    },
    // CASE EMBEDDED
    comments: {
        type: [comment],
    },
})

const reminder = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
})

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)
const Pet = model('Pet', pet)
const Reminder = model('Reminder', reminder)

module.exports = {
    User,
    Post,
    Comment,
    Pet,
    Reminder,
}
