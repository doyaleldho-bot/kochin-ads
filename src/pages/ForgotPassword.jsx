
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } else {
      setSubmitted(true);
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link."
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - Kochin Ads</title>
      </Helmet>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Forgot Password?</h1>
            <p className="text-slate-500 mt-2">No worries, we'll send you reset instructions.</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white h-11" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'} <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
              </div>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="w-full">
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPassword;
