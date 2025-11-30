import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import { ShoppingCart, Plus } from 'lucide-react';
import logo from './assets/logo.png';

const Header = ({ onAddProduct }) => {
  const { cartItems, setIsOpen } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo Marketplace" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onAddProduct}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Adicionar Produto</span>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setRefreshKey(old => old + 1);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header onAddProduct={handleAdd} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductList key={refreshKey} onEdit={handleEdit} />
        </main>

        <Cart />

        {isFormOpen && (
          <ProductForm
            productToEdit={editingProduct}
            onClose={() => setIsFormOpen(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
