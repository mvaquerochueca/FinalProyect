import index from '../../logic'
import { useEffect, useState } from 'react'
// import petitionApiQuote from '../../../LibraryApis/petitionApiQuote'
// import { Input, Container, Form, ButtonForm } from '../library'
import { useAppContext, useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'
import { errors } from 'com'

const { ContentError, DuplicityError, RangeError } = errors
const { loginUser } = index

export default function Login({}) {
    console.debug('Login -> render')
    const { alert, Toaster, toast, navigate } = useAppContext()

    const handleErrors = useHandleErrors()

    const [quote, setQuote] = useState(null)

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

    const handleLogin = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })
    }
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center h-full w-full">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74] text-center">
                        Login
                    </h2>
                    <p className="text-xs mt-4 text-[#002D74]">
                        If you are already a member, easily log in
                    </p>

                    <form
                        action=""
                        className="flex flex-col gap-4"
                        onSubmit={handleLogin}
                    >
                        <input
                            className="p-2 mt-8 rounded-xl border"
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
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                            Login
                        </button>
                    </form>

                    <div className="mt-2 text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Don't have an account?</p>
                        <Link
                            to="/register"
                            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img
                        className="rounded-2xl"
                        src="https://i.imgur.com/IlMXGoI.jpg"
                    />
                </div>
            </div>
            <Toaster />
        </section>

        //     <Container tag="main" className=" shadow-slate-500 shadow-md ">
        //         <Form onSubmit={handleLogin}>
        //             <p className="text-2xl text-center mt-5 ">Sign In</p>

        //             {quote && (
        //                 <p className="text-center">
        //                     <q>{quote.content}</q>
        //                     <br />
        //                     <cite>{quote.author}</cite>
        //                 </p>
        //             )}
        //             <label className="text-center " htmlFor="username">
        //                 Email
        //                 <Input
        //                     type="email"
        //                     name="email"
        //                     id="username"
        //                     autoComplete="username"
        //                 />
        //             </label>
        //             <label className="text-center" htmlFor="password">
        //                 Password
        //                 <Input
        //                     type="password"
        //                     name="password"
        //                     autoComplete="password"
        //                     id="password"
        //                 />
        //             </label>
        //             <ButtonForm className="mx-10 " type="submit">
        //                 Login
        //             </ButtonForm>
        //             <p className="text-center p-2">
        //                 You do not have an account?{' '}
        //                 <Link to="/register" className="text-center text-blue-500 ">
        //                     Sign Up!
        //                 </Link>
        //             </p>
        //         </Form>
        //         <Toaster position="bottom-center" reverseOrder={false} />
        //     </Container>
        // )
    )
}
