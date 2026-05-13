
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = ({ setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'SMM', path: '/smm-services', isNew: true },
    { name: 'Booking', path: '/booking' },
    { name: 'Store', path: '/store' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-slate-900">
                <img 
                    src="https://horizons-cdn.hostinger.com/7ec1cf53-4f51-44ad-ac86-4813f22a6038/468da3ae0bed8e53719c3ab97e40c208.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none text-slate-900">
                    KOCHIN<span className="text-[#008080]">ADS</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Advertising Agency</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.path) 
                    ? 'text-[#008080] bg-teal-50' 
                    : 'text-slate-600 hover:text-[#008080] hover:bg-slate-50'
                }`}
              >
                {link.name}
                {link.isNew && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
            </button>

            {user ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full pl-2 pr-4 gap-2 hover:bg-slate-100 border border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                            {profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="max-w-[100px] truncate text-slate-700">{profile?.full_name || 'User'}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                    </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem asChild>
                            <Link to="/admin" className="cursor-pointer font-bold text-blue-600">Admin Panel</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                        <Link to="/loyalty" className="cursor-pointer">My Rewards</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                        Log Out
                    </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            ) : (
                <div className="flex gap-2">
                    <Link to="/login"><Button variant="ghost" className="text-slate-600 hover:text-slate-900">Login</Button></Link>
                    <Link to="/signup"><Button className="bg-[#008080] hover:bg-[#006666] text-white shadow-lg shadow-teal-500/20">Sign Up</Button></Link>
                </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 absolute w-full h-screen overflow-y-auto pb-20">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                    isActive(link.path) ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-4"></div>
            {user ? (
                <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-slate-600">Dashboard</Link>
                    {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-blue-600 font-bold">Admin Panel</Link>}
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-red-600">Log Out</button>
                </>
            ) : (
                <div className="grid grid-cols-2 gap-4 px-4 pt-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}><Button className="w-full bg-[#008080]">Sign Up</Button></Link>
                </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
