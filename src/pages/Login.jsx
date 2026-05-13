
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, User, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Captcha from '@/components/Captcha';

const Login = () => {
  const [activeTab, setActiveTab] = useState('user'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const captchaRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
        toast({
            variant: "destructive",
            title: "Security Check Failed",
            description: "Please complete the CAPTCHA correctly."
        });
        return;
    }

    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setLoading(false);
        if(captchaRef.current) captchaRef.current.reset(); // Reset captcha on failure
        return; 
      }

      if (data?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const role = profile?.role;
        const isPrivileged = role === 'admin' || role === 'super_admin';

        if (activeTab === 'admin') {
          if (isPrivileged) {
            toast({ title: "Welcome Administrator", description: "Accessing secure admin portal..." });
            navigate('/admin');
          } else {
            await signOut(); 
            toast({ variant: "destructive", title: "Access Denied", description: "Account lacks administrative privileges." });
            if(captchaRef.current) captchaRef.current.reset();
          }
        } else {
          toast({ title: "Welcome Back", description: "Signed in successfully." });
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast({ variant: "destructive", title: "Error", description: "Something went wrong." });
      if(captchaRef.current) captchaRef.current.reset();
    } finally {
      setLoading(false);
    }
  };

  const isAdminTab = activeTab === 'admin';

  return (
    <>
      <Helmet>
        <title>{isAdminTab ? 'Admin Login' : 'User Login'} - Kochin Ads</title>
      </Helmet>
      
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className={`absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-700 ${isAdminTab ? 'bg-blue-600' : 'bg-violet-600'}`}></div>
           <div className={`absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-700 ${isAdminTab ? 'bg-indigo-600' : 'bg-pink-600'}`}></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 relative z-10 overflow-hidden"
        >
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex gap-1">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'user' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" /> User Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'admin' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">{isAdminTab ? 'Admin Access' : 'Welcome Back'}</h1>
                <p className="text-slate-500 mt-2 text-sm">{isAdminTab ? 'Secure login for administrators' : 'Sign in to your account'}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={isAdminTab ? "admin@kochinads.com" : "name@company.com"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  {!isAdminTab && <Link to="/forgot-password" className="text-xs text-blue-600 font-medium">Forgot password?</Link>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Security Check</label>
                 <Captcha ref={captchaRef} onVerify={setIsCaptchaVerified} />
              </div>

              <Button 
                type="submit" 
                className={`w-full h-11 transition-all ${isAdminTab ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-600 hover:bg-blue-700'} text-white`} 
                disabled={loading}
              >
                {loading ? 'Processing...' : (
                  <span className="flex items-center gap-2">{isAdminTab ? 'Access Portal' : 'Sign In'} <ArrowRight className="w-4 h-4" /></span>
                )}
              </Button>
            </form>

            {!isAdminTab && (
              <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">Create one</Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
