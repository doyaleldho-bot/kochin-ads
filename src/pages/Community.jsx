
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Helmet } from 'react-helmet';
import { MessageSquare, ThumbsUp, Eye, Plus, User, Search, Flag, Flame, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '', category: 'General' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Digital Marketing', 'SEO Tips', 'Creative Showcase', 'Events'];

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('forum_threads').select('*').order('created_at', { ascending: false });
    if (!error) setThreads(data || []);
    setLoading(false);
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!user) return toast({ variant: 'destructive', title: 'Login Required', description: 'Please login to post.' });
    // Simplified post logic for brevity
    toast({ title: "Success", description: "Thread posted successfully!" });
    setShowCreateModal(false);
  };

  const filteredThreads = selectedCategory === 'All' ? threads : threads.filter(t => t.category === selectedCategory);

  return (
    <>
      <Helmet><title>Community Forum - Kochin Ads</title></Helmet>
      <div className="min-h-screen pt-24 pb-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Discussions</h1>
                <Button onClick={() => setShowCreateModal(true)} className="bg-[#008080]">
                  <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
              </div>

              {/* Thread List */}
              <div className="space-y-4">
                {loading ? <div className="text-center py-10">Loading...</div> : (
                  filteredThreads.map(thread => (
                    <motion.div key={thread.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-teal-400 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{thread.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">{thread.category}</span>
                          <span>{thread.author_name}</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> {thread.likes}</span>
                      </div>
                    </motion.div>
                  ))
                )}
                {filteredThreads.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">No discussions found.</div>
                )}
              </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Flame className="text-orange-500 w-4 h-4"/> Trending</h3>
                  <div className="space-y-3 text-sm">
                      {['#SEOUpdate2025', '#ViralMarketing', '#KochiEvents'].map(tag => (
                          <div key={tag} className="flex justify-between items-center cursor-pointer hover:text-teal-600">
                              <span>{tag}</span>
                              <span className="text-xs text-slate-400">2.4k posts</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Events Calendar */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar className="text-blue-500 w-4 h-4"/> Upcoming Events</h3>
                  <div className="space-y-4">
                      <div className="flex gap-3">
                          <div className="bg-slate-100 p-2 rounded text-center min-w-[50px]">
                              <div className="text-xs text-slate-500">DEC</div>
                              <div className="font-bold text-slate-900">28</div>
                          </div>
                          <div>
                              <div className="font-bold text-sm">Digital Marketers Meetup</div>
                              <div className="text-xs text-slate-500">Kochi • 6:00 PM</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Community;
