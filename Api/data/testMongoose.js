const mongoose = require('mongoose')

const { User, Post } = require('./models.js')

mongoose
    .connect('mongodb://localhost:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        const user = new User({
            name: 'Mateo Vaquero',
            email: 'marioandres@vquero.com',
            password: '12345678',
        })
        const post = new Post({
            author: user.id,
            image: 'https://pixfans.com/imagenes/2011/04/Sora2.jpg',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        })

        // post.author = user.id

        user.favs.push(post.id)
        post.likes.push(user.id)

        return Promise.all([user.save(), post.save()])
    })

    .then((user, post) => {
        //...
    })
    .catch((error) => {
        console.error(error)
    })
    .finally(() => {
        mongoose.disconnect()
    })
