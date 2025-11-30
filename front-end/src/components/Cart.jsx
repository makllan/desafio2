import React from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/api';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, total, isOpen, setIsOpen, clearCart } = useCart();

    const handleCheckout = async () => {
        try {
            const checkoutRequest = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };
            await checkout(checkoutRequest);
            alert('Pedido realizado com sucesso!');
            clearCart();
            setIsOpen(false);
            window.location.reload(); // Refresh to update stock
        } catch (error) {
            console.error("Falha no checkout", error);
            alert("Falha no checkout: " + (error.response?.data || error.message));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                            <ShoppingBag className="mr-2" /> Carrinho de Compras
                        </h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio</p>
                        ) : (
                            <ul className="space-y-4">
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="ml-4 flex-1 flex flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{item.name}</h3>
                                                    <p className="ml-4">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="px-2">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p>R$ {total.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${cartItems.length > 0
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
