
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { CheckCircle, Calendar, MapPin, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooking = async () => {
        const { data } = await supabase.from('bookings').select('*').eq('id', id).single();
        setBooking(data);
        setLoading(false);
    };
    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
      setPaymentProcessing(true);
      // Simulate Payment Processing
      setTimeout(async () => {
          // Update booking status
          await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', id);
          
          // Log payment
          await supabase.from('payments').insert({
              booking_id: id,
              amount: 500000, // example 5000 INR in cents
              payment_method: paymentMethod,
              payment_status: 'completed',
              user_id: booking.user_id
          });

          setIsPaid(true);
          setPaymentProcessing(false);
          toast({ title: "Payment Successful", description: "Your booking is now confirmed!" });
      }, 2000);
  };

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading details...</div>;

  if (isPaid) {
      return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
                <p className="text-slate-500 mb-6">Ref: {id.slice(0,8).toUpperCase()}</p>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" /> Download Invoice
                    </Button>
                    <Link to="/dashboard">
                        <Button className="w-full bg-[#008080]">Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h1 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CreditCard className="text-[#008080]" /> Complete Payment
                </h1>
                
                <div className="bg-slate-50 p-6 rounded-xl mb-8 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Service</span>
                        <span className="font-medium">{booking?.service_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Date</span>
                        <span className="font-medium">{booking?.booking_date} at {booking?.booking_time}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-3 mt-3">
                        <span className="font-bold text-slate-900">Total Payable</span>
                        <span className="font-bold text-[#008080] text-xl">₹5,000.00</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h3 className="font-medium text-slate-900">Select Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Credit Card', 'UPI / QR', 'Net Banking', 'Debit Card'].map(m => (
                            <div 
                                key={m}
                                onClick={() => setPaymentMethod(m)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all text-center text-sm font-medium ${paymentMethod === m ? 'border-[#008080] bg-[#008080]/5 text-[#008080]' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                </div>

                <Button 
                    className="w-full bg-[#008080] hover:bg-[#006666] h-12 text-lg" 
                    onClick={handlePayment}
                    disabled={paymentProcessing}
                >
                    {paymentProcessing ? 'Processing Payment...' : 'Pay ₹5,000 & Confirm'}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4">Secure payment processed via Stripe</p>
            </div>
        </div>
    </div>
  );
};

export default BookingConfirmation;
