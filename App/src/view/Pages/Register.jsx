import index from '../../logic'
// import './LoginRegister.css'
// import petitionApiQuote from '../../LibraryApis/petitionApiQuote'
import { Input, Container, Form, ButtonForm } from '../library'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'
import { errors } from 'com'
// import Alert from '../components/Alert'
const { registerUser } = index

const { ContentError, DuplicityError, RangeError } = errors

export default function Register({}) {
    console.debug('Register -> Render')
    const { navigate, Toaster, toast, alert } = useAppContext()
    // const [quote, setQuote] = useState(null)

    // useEffect(() => {
    //     try {
    //         petitionApiQuote((error, content, author) => {
    //             if (error) {
    //                 alert(error.message, 'error')
    //                 return
    //             }
    //             setQuote({ content, author })
    //         })
    //     } catch (error) {
    //         alert(error.message, 'error')
    //     }
    // }, [])

    //Como cambio el color del toast en funcion del error del registro?

    const handleRegisterUser = async function (event) {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            await registerUser(name, email, password)
            navigate('/login')
        } catch (error) {
            if (error instanceof RangeError)
                toast(error.message, {
                    style: {
                        background: '#F34242',
                        color: '#000',
                    },
                })
            else if (error instanceof DuplicityError)
                toast(error.message, {
                    style: {
                        background: '#F34242',
                        color: '#000',
                    },
                })
            else if (error instanceof ContentError)
                toast(error.message, {
                    style: {
                        background: '#E2EC84',
                        color: '#000',
                    },
                })
            else
                toast(error.message, {
                    style: {
                        background: 'E2EC84',
                        color: '#000',
                    },
                })
        }
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74] text-center">
                        Register
                    </h2>
                    <p className="text-xs mt-4 text-[#002D74]">
                        If you are not already a member, easily sign up
                    </p>

                    <form
                        action=""
                        className="flex flex-col gap-4"
                        onSubmit={handleRegisterUser}
                    >
                        <input
                            className="p-2 mt-8 rounded-xl border"
                            type="name"
                            name="name"
                            placeholder="Name"
                        />
                        <input
                            className="p-2 rounded-xl border"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <div className="relative">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="relative">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="password-confirm"
                                placeholder="Password Confirm"
                            />
                        </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                            Register
                        </button>
                    </form>

                    <div className="mt-2 text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Do you shave an account?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img
                        className="rounded-2xl"
                        src="https://i.imgur.com/zQpPpw9.jpg"
                    />
                </div>
            </div>
            <Toaster />
        </section>

        // <Container tag="main" className=" shadow-slate-500 shadow-md">
        //     <Form onSubmit={handleRegisterUser}>
        //         <p className="text-2xl text-center mt-5 ">Sing Up</p>
        //         <p className="text-center ml-1 mr-1">Create a free account!</p>

        //         <label className="text-center" htmlFor="name">
        //             Name
        //             <Input
        //                 type="text"
        //                 name="name"
        //                 id="name"
        //                 autoComplete="name"
        //             />
        //         </label>
        //         <label className="text-center " htmlFor="email">
        //             Email
        //             <Input
        //                 type="email"
        //                 name="email"
        //                 id="email"
        //                 autoComplete="username"
        //             />
        //         </label>
        //         <label className="text-center " htmlFor="password">
        //             Password
        //             <Input
        //                 type="password"
        //                 name="password"
        //                 id="password"
        //                 autoComplete="password"
        //             />
        //         </label>

        //         <ButtonForm className="mx-10 " type="submit">
        //             Sing up
        //         </ButtonForm>
        //         <p className="text-center ">Have an account?</p>
        //         <p className="text-center">
        //             <Link
        //                 to="/login"
        //                 className="text-center text-blue-500 mb-2"
        //             >
        //                 Sign In
        //             </Link>
        //         </p>
        //     </Form>
        //     <Toaster
        //         position="bottom-center"
        //         reverseOrder={false}
        //         toastOptions={{
        //             className: '',
        //             duration: 1500,
        //             error: {
        //                 style: {
        //                     background: '#FCA5A5',
        //                     color: '#fff',
        //                 },
        //             },
        //         }}
        //     />
        // </Container>
    )
}
