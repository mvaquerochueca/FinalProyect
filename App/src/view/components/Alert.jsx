import Container from '../library/Container'

export default function Alert({ message, level, onAccept }) {
    console[level](message)

    console.debug('Alert -> render')

    let color = 'dodgerblue'

    if (level === 'warn') color = 'gold'
    else if (level === 'error') color = 'tomato'

    return (
        <Container tag="section" className="modal">
            <p style={{ backgroundColor: color }} className="pt-2">
                {message}
            </p>
            <button onClick={onAccept} className="p-1">
                Accept
            </button>
        </Container>
    )
}
