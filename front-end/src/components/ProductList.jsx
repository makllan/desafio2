import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { Plus, Trash2, Edit } from 'lucide-react';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-xl mt-2">R$ {product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 mt-1">Estoque: {product.stock}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${product.stock > 0
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Plus size={16} />
                            <span>Adicionar</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
