class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }

    get name() {
        return 'DuplicityError'
    }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
    }

    get name() {
        return 'ContentError'
    }
}

class RangeError extends Error {
    constructor(message) {
        super(message)
    }

    get name() {
        return 'RangeError'
    }
}

class ExistenceError extends Error {
    constructor(message) {
        super(message)
    }

    get name() {
        return 'ExistenceError'
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
    }

    get name() {
        return 'AuthError'
    }
}

module.exports = {
    DuplicityError,
    ContentError,
    RangeError,
    ExistenceError,
    AuthError,
    TypeError,
}
