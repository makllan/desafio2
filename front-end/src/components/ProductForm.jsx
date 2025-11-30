import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';
import { X } from 'lucide-react';

const ProductForm = ({ productToEdit, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                price: productToEdit.price,
                stock: productToEdit.stock
            });
        }
    }, [productToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productToEdit) {
                await updateProduct(productToEdit.id, formData);
            } else {
                await createProduct(formData);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar produto", error);
            alert("Erro ao salvar produto");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{productToEdit ? 'Editar Produto' : 'Novo Produto'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estoque</label>
                        <input
                            type="number"
                            required
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
