import './Form.css'

export default function Form({ children, className, ...props }) {
    return (
        <form
            className={`flex flex-col gap-5 mb-4 ${className ? className : ''}`}
            {...props}
        >
            {children}
        </form>
    )
}
