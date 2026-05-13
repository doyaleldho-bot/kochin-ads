
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
        const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
        return total + price * item.quantity;
    }, 0) / 100;
  }, [cartItems]);

  const handlePayment = async () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      // Usually clear cart after successful redirect logic, but since we leave app:
      // We might keep it until success page clears it.
      // But clearing here ensures no stale cart if they come back via back button. 
      // Actually standard practice is clear on success page.
      
      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast({
        title: "Checkout Error",
        description: "Could not initialize payment gateway. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Kochin Ads</title>
      </Helmet>
      
      <div className="min-h-screen bg-slate-50 pt-28 pb-12">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Order Summary</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-6">Explore our services to start a campaign.</p>
                    <Link to="/store">
                        <Button className="bg-[#0D5A7A] hover:bg-[#094660]">Browse Services</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <motion.div 
                                key={item.variant.id}
                                layout
                                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                            >
                                <div className="w-24 h-24 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
                                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="font-bold text-slate-900">{item.product.title}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{item.variant.title}</p>
                                    <div className="text-lg font-bold text-[#0D5A7A]">{item.variant.sale_price_formatted}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-slate-200 rounded-lg">
                                        <button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 hover:bg-slate-50 text-slate-600">-</button>
                                        <span className="px-2 font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="px-3 py-1 hover:bg-slate-50 text-slate-600">+</button>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.variant.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-28">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Payment Details</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>{getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Service Fee</span>
                                    <span>Calculated at next step</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-slate-900">Total</span>
                                    <span className="text-2xl font-bold text-[#0D5A7A]">{getCartTotal()}</span>
                                </div>
                            </div>

                            <Button 
                                className="w-full bg-[#FF9500] hover:bg-[#e08200] text-white py-6 text-lg font-bold mb-4"
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Secure Checkout'} <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                                <Lock className="w-3 h-3" /> Secure SSL Payment via Stripe
                            </div>
                            <div className="mt-4 flex justify-center gap-2 opacity-50 grayscale">
                                {/* Simple icons representation */}
                                <CreditCard className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </div>
    </>
  );
};

export default Checkout;
