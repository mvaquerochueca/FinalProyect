export default function Input({ className, type, error, ...props }) {
    return (
        <input
            className={`border-2 border-gray-700 border-opacity-5 rounded-md p-2  w-1/1 mx-auto mr-10 ml-10 placeholder-black ${
                className ? className : ''
            }`}
            {...props}
            {...error}
            type={type}
        ></input>
    )
}
