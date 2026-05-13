
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { NotificationService } from '@/api/NotificationService';

const Success = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Record order in Supabase before clearing
    const recordOrder = async () => {
        if (cartItems.length > 0 && user) {
            try {
                const totalAmount = cartItems.reduce((acc, item) => acc + (item.variant.price_in_cents * item.quantity), 0);
                
                // 1. Insert Order
                const { data: orderData, error: orderError } = await supabase.from('orders').insert({
                    user_id: user.id,
                    total_amount: totalAmount, // Storing in cents
                    currency: cartItems[0]?.variant?.currency || 'INR',
                    status: 'Processing',
                    items: cartItems.map(item => ({
                        id: item.product.id,
                        title: item.product.title,
                        quantity: item.quantity,
                        variant: item.variant.title
                    }))
                }).select().single();

                if (orderError) throw orderError;

                // 2. Trigger Notifications
                const formattedAmount = (totalAmount / 100).toFixed(2);
                
                // Email to Customer (Logged as notification)
                await NotificationService.sendOrderConfirmation(
                    orderData.id.slice(0, 8).toUpperCase(), 
                    user.email, 
                    formattedAmount
                );

                // Alert to Admin
                await NotificationService.sendAdminAlert(
                    'New Order Received',
                    `Order #${orderData.id.slice(0, 8)} received from ${user.email} for ${formattedAmount} ${orderData.currency}`
                );

            } catch (err) {
                console.error("Failed to record order", err);
            }
        }
        clearCart();
    };

    recordOrder();
  }, [cartItems, clearCart, user]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-600 mb-8">
          Thank you for your purchase. A confirmation email has been sent to your inbox.
        </p>

        <div className="space-y-3">
          <Link to="/store">
            <Button className="w-full bg-[#0088CC] hover:bg-[#006699]">
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
