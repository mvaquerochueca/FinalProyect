// import NavBar from './NavBar'
// import Aside from './Aside'
// import { useEffect, useState } from 'react'
// import allComponents from './allComponents'

// const { Posts } = allComponents

// export default function Feed() {
//     const [randomPosts, setRandomPosts] = useState([])

//     const generateRandomPosts = () => {
//         const maxNumPosts = 6 // Número máximo de posts aleatorios
//         const randomPosts = []

//         for (let i = 0; i < maxNumPosts; i++) {
//             randomPosts.push(<Posts key={i} />)
//         }

//         setRandomPosts(randomPosts)
//     }
//     useEffect(() => {
//         generateRandomPosts()
//     }, [])

//     // useEffect(() => {
//     //     try {
//     //         retrieveUser()
//     //             .then(setUser)
//     //             .catch((error) => toast(error.message))
//     //     } catch (error) {
//     //         toast(error.message)
//     //     }
//     // }, [])

//     // const handleLogout = () => {
//     //     logoutUser()
//     //     navigate('/login')
//     // }
//     return (
//         <div>
//             <NavBar />
//             <Aside />
//             <div className="p-4 sm:ml-64">
//                 <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
//                     {/* Mostrar los posts generados */}
//                     <div className="grid grid-cols-3 gap-4">
//                         {randomPosts.map((post, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-center h-48 rounded bg-gray-50 dark:bg-gray-800"
//                             >
//                                 {post}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// //     return (
// //         <div>
// //             <NavBar />
// //             <Aside />
// //             <div className="p-4 sm:ml-64">
// //                 <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
// //                     <div className="grid grid-cols-3 gap-4 mb-4">
// //                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
// //                         <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                             <svg
// //                                 className="w-3.5 h-3.5"
// //                                 aria-hidden="true"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 fill="none"
// //                                 viewBox="0 0 18 18"
// //                             >
// //                                 <path
// //                                     stroke="currentColor"
// //                                     stroke-linecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth="2"
// //                                     d="M9 1v16M1 9h16"
// //                                 />
// //                             </svg>
// //                         </p>
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-4 mb-4">
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <img
// //                                 className="w-full h-full border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
// //                                 src="https://www.grupobillingham.com/images/51/8a/6defd341ce31dc26ff48352bcedc/1024-768-6/contenedor-10-bolsas-mosqueton-con-clic-barato-rojo.jpg"
// //                                 alt=""
// //                             />
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
// //                         <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                             <svg
// //                                 className="w-3.5 h-3.5"
// //                                 aria-hidden="true"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 fill="none"
// //                                 viewBox="0 0 18 18"
// //                             >
// //                                 <path
// //                                     stroke="currentColor"
// //                                     stroke-linecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth="2"
// //                                     d="M9 1v16M1 9h16"
// //                                 />
// //                             </svg>
// //                         </p>
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-4">
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
// //                             <p className="text-2xl text-gray-400 dark:text-gray-500">
// //                                 <svg
// //                                     className="w-3.5 h-3.5"
// //                                     aria-hidden="true"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 18 18"
// //                                 >
// //                                     <path
// //                                         stroke="currentColor"
// //                                         stroke-linecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="2"
// //                                         d="M9 1v16M1 9h16"
// //                                     />
// //                                 </svg>
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }
