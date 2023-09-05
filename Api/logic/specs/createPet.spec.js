const { expect } = require('chai')
import dotenv from 'dotenv'

const {
    mongoose,
    models: { User, Pet },
} = require('com')

const createPet = require('./createPet')

describe('createPet', () => {
    it('should succeed on new pet', () => {
        createPet(
            '5ed1204ee99ccf6fae798aef',
            'Pepito',
            'small',
            '1',
            'chihuahua',
            'very cute',
            'https://www.purina.es/gato/purina-one/sites/g/files/mcldtz1856/files/2018-06/Como%20cuidar%20de%20un%20gato%20beb%C3%A9.jpg',
            (error) => {
                expect(error).to.be.null

                Pet.findOne({ name: 'Pepito' }).then((pet) => {})
            }
        )
    })
})
