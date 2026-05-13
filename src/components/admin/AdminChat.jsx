
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { MessageSquare, User, Clock, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminChat = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');

  // Fetch active sessions
  useEffect(() => {
    const fetchSessions = async () => {
        const { data } = await supabase.from('chat_sessions').select('*').eq('status', 'open').order('created_at', { ascending: false });
        setSessions(data || []);
    };
    fetchSessions();
    const interval = setInterval(fetchSessions, 10000); // Poll for new sessions
    return () => clearInterval(interval);
  }, []);

  // Fetch messages for active session
  useEffect(() => {
      if (!activeSessionId) return;
      const fetchMessages = async () => {
          const { data } = await supabase.from('chat_messages').select('*').eq('session_id', activeSessionId).order('created_at', { ascending: true });
          setMessages(data || []);
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Poll messages
      return () => clearInterval(interval);
  }, [activeSessionId]);

  const handleReply = async (e) => {
      e.preventDefault();
      if (!replyText.trim() || !activeSessionId) return;

      await supabase.from('chat_messages').insert({
          session_id: activeSessionId,
          sender_type: 'agent',
          message: replyText
      });
      setReplyText('');
      // Force refresh
      const { data } = await supabase.from('chat_messages').select('*').eq('session_id', activeSessionId).order('created_at', { ascending: true });
      setMessages(data || []);
  };

  const closeSession = async (id) => {
      await supabase.from('chat_sessions').update({ status: 'closed' }).eq('id', id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (activeSessionId === id) setActiveSessionId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Session List */}
        <div className="border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-slate-700 flex justify-between">
                <span>Active Chats ({sessions.length})</span>
                <MessageSquare className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-grow overflow-y-auto">
                {sessions.length === 0 ? (
                    <p className="p-4 text-center text-slate-400 text-sm">No active chats.</p>
                ) : (
                    sessions.map(session => (
                        <div 
                            key={session.id} 
                            onClick={() => setActiveSessionId(session.id)}
                            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${activeSessionId === session.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-sm text-slate-800 truncate">Visitor {session.id.slice(0,4)}</h4>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {new Date(session.created_at).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-2 flex flex-col bg-white">
            {activeSessionId ? (
                <>
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <div className="font-bold text-slate-800">Chat Session: {activeSessionId}</div>
                        <Button size="sm" variant="outline" onClick={() => closeSession(activeSessionId)} className="text-red-600 hover:bg-red-50">End Chat</Button>
                    </div>
                    
                    <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender_type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-3 rounded-xl text-sm ${
                                    msg.sender_type === 'agent' 
                                    ? 'bg-blue-600 text-white' 
                                    : msg.sender_type === 'bot' ? 'bg-slate-200 text-slate-600 italic' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                                }`}>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleReply} className="p-4 border-t border-slate-200 bg-white">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type a reply..." 
                                className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <Button type="submit"><Send className="w-4 h-4" /></Button>
                        </div>
                    </form>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                    <p>Select a session to start chatting</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AdminChat;
