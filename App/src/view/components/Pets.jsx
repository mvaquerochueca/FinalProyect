import index from '../../logic'
import Pet from './Pet'
import Aside from './Aside'
import NavBar from './NavBar'
import Footer from './Footer'

import { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'

const { retrievePets } = index

export default function Pets() {
    const { Toaster, toast } = useAppContext()

    const [pets, setPets] = useState()

    useEffect(() => handleRefreshPets(), [])

    const handleRefreshPets = () => {
        try {
            retrievePets()
                .then(setPets)
                .catch((error) => toast.error(error.message))
        } catch (error) {
            toast(error.message)
        }
    }

    return (
        <section className="z-20 items-center ">
            <NavBar />
            <Aside />

            {pets && pets.map((pet) => <Pet key={pet.id} pet={pet} />)}
            <Toaster />
        </section>
    )
}
