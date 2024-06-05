'use client'
import { useState, useEffect } from 'react';
import NavBar from '../views/NavBar';
import FooterProduct from '../views/Footer';
import styles from '../css/cart.module.css';
import axios from 'axios';
import useIntersectionObserver from "../hooks/scroll";

export default function Products() {
    const [cartItems, setCartItems] = useState([]); // State để lưu các sản phẩm trong giỏ hàng

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi component được render
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    function handleRemoveItem(index) {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        setCartItems(updatedCartItems); // Cập nhật lại danh sách sản phẩm trong giỏ hàng
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Cập nhật lại localStorage
        const cartCountCurrent = localStorage.getItem('cartCount');
        localStorage.setItem('cartCount', cartCountCurrent - 1);
    }

    return (
        <div>
            <NavBar />
            <div className='container mt-2 mb-2'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="md:flex">
                            <div className="md:w-8/12 border-t border-b md:border-b-0 md:border-r">
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h4 className="text-xl font-semibold">Shopping Cart</h4>
                                        <div className="text-right text-muted">{cartItems.length} items</div>
                                    </div>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="border-t border-b">
                                            <div className="flex items-center py-4">
                                                <div className="w-16">
                                                    <img className="w-full" src={`/image/${item.image}`} />
                                                </div>
                                                <div className="flex-grow ml-4">
                                                    <h3 className="text-base">{item.name}</h3>
                                                </div>
                                                <div>
                                                    <a href="#" className="px-2 border">-</a>
                                                    <span className="px-2 border">1</span>
                                                    <a href="#" className="px-2 border">+</a>
                                                </div>
                                                <div className="flex-grow text-right">&euro; {item.price} <span className="close cursor-pointer" onClick={() => handleRemoveItem(index)}>&#10005;</span></div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-8">
                                        <a href="#" className="text-muted">&leftarrow;</a><span className="text-muted">Back to shop</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-4/12">
                                <div className="p-8">
                                    <div className="mb-8">
                                        <h5 className="text-xl font-semibold">Summary</h5>
                                        <hr className="my-4" />
                                        <div className="flex justify-between">
                                            <div className="text-sm">ITEMS {cartItems.length}</div>
                                            <div className="text-right">&euro; {calculateTotalPrice(cartItems)}</div>
                                        </div>
                                    </div>
                                    <form>
                                        <p>SHIPPING</p>
                                        <select className="block w-full bg-gray-200 border border-gray-300 px-3 py-2 rounded mt-1 focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option className="text-muted">Standard-Delivery- &euro;5.00</option>
                                        </select>
                                        <p>GIVE CODE</p>
                                        <input id="code" placeholder="Enter your code" className="block w-full bg-gray-200 border border-gray-300 px-3 py-2 rounded mt-1 focus:outline-none focus:bg-white focus:border-gray-500" />
                                    </form>
                                    <div className="mt-8 border-t border-b py-4">
                                        <div className="flex justify-between">
                                            <div className="text-sm">TOTAL PRICE</div>
                                            <div className="text-right">&euro; {calculateTotalPrice(cartItems)}</div>
                                        </div>
                                    </div>
                                    <button className="btn bg-black text-white w-full mt-8">CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterProduct />
        </div>
    );
}

function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
}
