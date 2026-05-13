
import React from 'react';
import { Helmet } from 'react-helmet';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Shield, User, Globe, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { profile } = useAuth();

  return (
    <>
      <Helmet>
        <title>Settings - Kochin Ads</title>
      </Helmet>
      <div className="min-h-screen pt-24 pb-12 bg-background">
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            
            <div className="space-y-8">
                {/* Theme Settings */}
                <motion.section 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="text-xl font-bold flex items-center gap-2"><Moon className="w-5 h-5"/> Appearance</h2>
                    <ThemeSwitcher />
                </motion.section>

                {/* Profile Settings */}
                <motion.section 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6"
                >
                    <h2 className="text-xl font-bold flex items-center gap-2"><User className="w-5 h-5"/> Personal Info</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input disabled value={profile?.full_name || ''} className="w-full p-2 rounded border bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input disabled value={'Protected'} className="w-full p-2 rounded border bg-muted" />
                        </div>
                    </div>
                    <Button variant="outline">Edit Profile Details</Button>
                </motion.section>

                {/* Preferences */}
                <motion.section 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6"
                >
                    <h2 className="text-xl font-bold flex items-center gap-2"><Bell className="w-5 h-5"/> Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <div className="font-medium">Marketing Emails</div>
                                <div className="text-xs text-muted-foreground">Receive offers and newsletters</div>
                            </div>
                            <div className="w-10 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-primary rounded-full absolute top-1 left-5 transition-all"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <div className="font-medium">Browser Notifications</div>
                                <div className="text-xs text-muted-foreground">Get notified about order updates</div>
                            </div>
                             <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
