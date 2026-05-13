
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import SmmServices from '@/pages/SmmServices'; 
import SmmOrder from '@/pages/SmmOrder'; // NEW
import ApiDocs from '@/pages/ApiDocs'; // NEW
import ServiceDetail from '@/pages/ServiceDetail';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Gallery from '@/pages/Gallery';
import News from '@/pages/News';
import Store from '@/pages/Store';
import ProductDetailPage from '@/pages/ProductDetailPage';
import Success from '@/pages/Success';
import Checkout from '@/pages/Checkout';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import AdminPanel from '@/pages/AdminPanel';
import Booking from '@/pages/Booking';
import BookingConfirmation from '@/pages/BookingConfirmation';
import Community from '@/pages/Community';
import ShoppingCart from '@/components/ShoppingCart';
import LoyaltyDashboard from '@/pages/LoyaltyDashboard';
import AffiliateProgram from '@/pages/AffiliateProgram';
import ChatWidget from '@/components/ChatWidget';
import PageTransition from '@/components/PageTransition';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/smm-services" element={<PageTransition><SmmServices /></PageTransition>} /> 
        <Route path="/smm-order" element={<PageTransition><SmmOrder /></PageTransition>} /> {/* NEW */}
        <Route path="/api-docs" element={<PageTransition><ApiDocs /></PageTransition>} /> {/* NEW */}
        <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
        
        {/* Feature Routes */}
        <Route path="/loyalty" element={<PageTransition><LoyaltyDashboard /></PageTransition>} />
        <Route path="/affiliate" element={<PageTransition><AffiliateProgram /></PageTransition>} />
        
        {/* Booking Routes */}
        <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
        <Route path="/booking-confirmation/:id" element={<PageTransition><BookingConfirmation /></PageTransition>} />

        {/* Store Routes */}
        <Route path="/store" element={<PageTransition><Store /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/success" element={<PageTransition><Success /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem('kochin_affiliate_ref', refCode);
    }
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Helmet>
                <title>Kochin Ads - Professional Advertising Solutions</title>
                <meta name="description" content="Leading advertising agency in Kerala offering comprehensive digital and traditional marketing services." />
              </Helmet>
              <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
                <Navigation setIsCartOpen={setIsCartOpen} />
                <main className="flex-grow relative">
                  <AnimatedRoutes />
                </main>
                <Footer />
                <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <ChatWidget />
                <Toaster />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
