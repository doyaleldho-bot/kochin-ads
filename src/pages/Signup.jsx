
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Captcha from '@/components/Captcha';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    company_name: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const captchaRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      toast({ variant: "destructive", title: "Mismatch", description: "Passwords don't match." });
      return;
    }

    if (!isCaptchaVerified) {
        toast({ variant: "destructive", title: "Security Check Failed", description: "Please complete the CAPTCHA." });
        return;
    }

    setLoading(true);
    const { error } = await signUp(formData);
    setLoading(false);

    if (!error) {
      navigate('/login');
    } else {
      if(captchaRef.current) captchaRef.current.reset();
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account - Kochin Ads</title>
      </Helmet>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2">Join Kerala's premier advertising network</p>
          </div>

          <form onSubmit={handleSignup} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 9876543210" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="confirm_password" type="password" required value={formData.confirm_password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
                 <label className="text-sm font-medium text-slate-700">Security Check</label>
                 <Captcha ref={captchaRef} onVerify={setIsCaptchaVerified} />
            </div>

            <Button type="submit" className="w-full md:col-span-2 bg-[#0F172A] hover:bg-[#1E293B] text-white h-11 mt-4" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
