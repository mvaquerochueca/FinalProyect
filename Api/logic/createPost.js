const {
    validators: { validateId, validateUrl, validateText },
} = require('com')
const { User, Post } = require('../data/models.js')

module.exports = (userId, image, text, location) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    validateUrl(location, 'location url')

    return (
        User.findById(userId)
            .then((user) => {
                if (!user) throw new Error(`user with id ${userId} not found`)

                return Post.create({
                    author: userId,
                    image,
                    location,
                    text,
                })
            })

            //El siguiente then es para que no devuelva nada al crear el post
            .then(() => {})
    )
}
