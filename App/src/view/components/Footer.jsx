export default function Footer({ onOpenAddPostModal }) {
    function handleOpenModal(event) {
        event.preventDefault()

        onOpenAddPostModal()
    }

    return (
        <footer className="fixed bottom-0 left-0 w-full dark:bg-gray-800 p-4 text-center md:hidden">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleOpenModal}
            >
                +{' '}
            </button>
        </footer>
    )
}
