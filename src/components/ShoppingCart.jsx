
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // Simple cart sidebar just for quick view
  // Checkout logic moved to Checkout.jsx

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Your Selection</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-200 rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-slate-400 h-full flex flex-col items-center justify-center">
                  <ShoppingCartIcon size={48} className="mb-4 opacity-20" />
                  <p>No services selected yet.</p>
                  <Button variant="link" onClick={() => setIsCartOpen(false)} className="text-[#0D5A7A]">Browse Marketplace</Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variant.id} className="flex gap-4 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover rounded-md bg-slate-100" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{item.product.title}</h3>
                      <p className="text-xs text-slate-500 mb-1">{item.variant.title}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#0D5A7A]">{item.variant.sale_price_formatted}</span>
                        <div className="flex items-center border border-slate-200 rounded-md">
                           <button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} className="px-2 text-slate-500 hover:bg-slate-50">-</button>
                           <span className="px-1 text-xs">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="px-2 text-slate-500 hover:bg-slate-50">+</button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.variant.id)} className="self-start text-slate-300 hover:text-red-500">
                       <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-xl font-bold text-slate-900">{getCartTotal()}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  <Button className="w-full bg-[#FF9500] hover:bg-[#e08200] text-white font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all">
                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
