import React, { useState } from 'react'
import Aside from './Aside'
import NavBar from './NavBar'

export default function Wishlist() {
    const [productName, setProductName] = useState('')
    const [amazonUrl, setAmazonUrl] = useState('')
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlSegments = amazonUrl.split('/')
        const product = productName || urlSegments[urlSegments.length - 1]

        setProducts([
            ...products,
            { name: product, url: amazonUrl, selected: false },
        ])
        setProductName('')
        setAmazonUrl('')
    }

    const handleCheckboxChange = (index) => {
        const updatedProducts = products.map((product, i) => {
            if (i === index) {
                return { ...product, selected: !product.selected }
            }
            return product
        })
        setProducts(updatedProducts)
    }

    const handleRemoveSelected = () => {
        const updatedProducts = products.filter((product) => !product.selected)
        setProducts(updatedProducts)
    }

    //show button to remove selected products if any are selected

    const hasSelectedProducts = () => {
        return products.some((product) => product.selected)
    }

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <NavBar />
            <Aside />
            <div className="w-full max-w-md mx-auto p-4">
                <h1 className="mt-14 text-2xl font-bold mb-4">Mi Wishlist</h1>
                <form onSubmit={handleSubmit} className="mb-4 ">
                    <label className="block mb-2">Product Name </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    <label className="block mb-2">URL Product </label>
                    <input
                        type="text"
                        value={amazonUrl}
                        onChange={(e) => setAmazonUrl(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-2 justify-center"
                    >
                        Add Product{' '}
                    </button>
                </form>
                <h2 className="text-xl font-semibold mb-2">
                    Producst in Wishlist:
                </h2>
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className="mb-1 flex items-center">
                            <input
                                type="checkbox"
                                checked={product.selected}
                                onChange={() => handleCheckboxChange(index)}
                                className="mr-2"
                            />
                            {product.url.startsWith('http') ? (
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {product.name}
                                </a>
                            ) : (
                                product.name
                            )}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleRemoveSelected}
                    className={`bg-red-500 text-white rounded px-4 py-2 mt-2 ${
                        !hasSelectedProducts() && 'hidden'
                    }`}
                >
                    Remove Product{' '}
                </button>
            </div>
        </div>
    )
}
