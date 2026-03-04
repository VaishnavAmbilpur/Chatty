

import { Users, Info, Smiley, Clock, PaperPlaneRight, SignOut } from '@phosphor-icons/react'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userNameStore } from '../store'
import { useUserCodeStore } from '../store'
import ReactMarkdown from 'react-markdown'
import { encryptMessage, decryptMessage } from '../utils/cryptoUtils'


interface Message {
  sender: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [showUsers, setShowUsers] = useState(false)
  const name = useUserCodeStore((state) => state.code);
  const code = userNameStore((state) => state.user);
  const { roomUsers, setRoomUsers, typingUsers, setTypingUsers } = useUserCodeStore();
  const navigate = useNavigate();

  const [showEmojis, setShowEmojis] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

  const mesRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const emojis = ['😊', '😂', '🔥', '🚀', '👍', '👋', '❤️', '✨', '🤔', '😎'];


  const scrollToBottomDiv = () => {
    if (mesRef.current) {
      mesRef.current.scrollTop = mesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const defaultWsUrl = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const backendUrl = import.meta.env.VITE_WS_URL || 'localhost:8080';

    // Ensure the URL has the correct protocol prefix if it's just a hostname/port
    const finalWsUrl = backendUrl.startsWith('ws://') || backendUrl.startsWith('wss://')
      ? backendUrl
      : `${defaultWsUrl}${backendUrl}`;

    console.log(`Connecting to WebSocket at: ${finalWsUrl}`);
    const ws = new WebSocket(finalWsUrl);
    wsRef.current = ws;

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "chat") {
          const decrypted = await decryptMessage(data.payload.message, code);
          setMessages(m => [...m, { ...data.payload, message: decrypted }]);
          if (data.payload.sender !== name) {
            audioRef.current?.play().catch(() => { });
          }
        } else if (data.type === "history") {
          const decryptedMessages = await Promise.all(
            data.payload.messages.map(async (msg: any) => ({
              ...msg,
              message: await decryptMessage(msg.message, code)
            }))
          );
          setMessages(decryptedMessages);
        } else if (data.type === "presence") {

          setRoomUsers(data.payload.users);
        } else if (data.type === "typing") {
          const { name: typingName, isTyping } = data.payload;
          if (typingName !== name) {
            setTypingUsers(prev => isTyping
              ? Array.from(new Set([...prev, typingName]))
              : prev.filter(n => n !== typingName)
            );
          }
        }
      } catch (e) {
        // Fallback for old simple messages during transition
        setMessages(m => [...m, {
          sender: "System",
          message: event.data,
          timestamp: new Date().toISOString(),
          isAdmin: false
        }]);
      }
    }

    ws.onopen = () => {
      console.log("WebSocket connected successfully");
      ws.send(JSON.stringify({
        type: "join",
        payload: { roomId: code, name: name }
      }));
      setLoading(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket connection error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };


    return () => {
      ws.close();
    }
  }, [code, name, setRoomUsers, setTypingUsers]);

  useEffect(() => {
    scrollToBottomDiv();
  }, [messages, typingUsers]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "typing",
        payload: { isTyping: e.target.value.length > 0 }
      }));
    }
  };

  async function sendMessage() {
    const message = inputRef.current?.value;
    if (message && wsRef.current) {
      try {
        const encrypted = await encryptMessage(message, code);
        wsRef.current.send(JSON.stringify({
          type: "chat",
          payload: { message: encrypted }
        }));
        wsRef.current.send(JSON.stringify({
          type: "typing",
          payload: { isTyping: false }
        }));
        if (inputRef.current) inputRef.current.value = '';
      } catch (error) {
        console.error("Failed to encrypt message:", error);
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const addEmoji = (emoji: string) => {
    if (inputRef.current) {
      inputRef.current.value += emoji;
      inputRef.current.focus();
    }
    setShowEmojis(false);
  }

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const getInitials = (n: string) => (n || "A").split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2);

  const handleLeaveRoom = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    navigate('/');
  };


  return (
    <div className='flex gap-x-4 max-w-5xl w-full h-[600px] items-center justify-center'>
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3" />

      {/* Main Chat Area */}
      <div className='font-Josefin glass-chat animate-fade-in-up shadow-2xl flex-1 max-w-[500px] h-full overflow-hidden rounded-2xl text-white flex flex-col relative'>
        <div className='text-3xl tracking-tighter p-6 font-semibold flex items-start flex-wrap gap-x-4 gap-y-2 flex-col bg-white/5'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-x-3'>
              <img src="/favicon.png" alt="Chatty Logo" className="w-8 h-8 rounded-lg shadow-lg border border-white/10" />
              Chatty
            </div>
            <div className='flex gap-x-2'>
              <div className='flex items-center gap-x-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-white/5'>
                <Clock size={14} className='text-zinc-500' />
                <span className='text-xs font-mono text-zinc-400'>{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => setShowUsers(!showUsers)}
                className={`p-2 rounded-lg transition-all ${showUsers ? 'bg-white text-zinc-950' : 'hover:bg-white/10'}`}
              >
                <Users size={20} />
              </button>
              <button
                onClick={handleLeaveRoom}
                className="p-2 rounded-lg transition-all hover:bg-white/10 text-zinc-400 hover:text-red-400"
                title="Leave Room"
              >
                <SignOut size={20} />
              </button>
            </div>
          </div>
          <div className='text-[10px] text-zinc-500 tracking-widest uppercase font-bold mt-1'>Temporary Room • {roomUsers.length} Online</div>
        </div>

        <div className='px-6 py-3 bg-zinc-900/30 flex justify-between items-center border-b border-white/5'>
          <span className='text-sm text-zinc-400 font-medium'>Room Code: <span className='text-white font-mono'>{code}</span></span>
          <div className='flex items-center gap-x-2'>
            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
            <span className='text-[10px] text-zinc-500 uppercase font-bold text-green-500'>E2EE Protected</span>
          </div>
        </div>

        <div className='flex-1 overflow-hidden flex flex-col p-4'>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-t-2 border-white animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-white/10"></div>
              </div>
              <span className="mt-6 text-zinc-400 font-medium animate-pulse-slow">Initiating E2EE Protocol...</span>
            </div>
          ) : (
            <div ref={mesRef} className='flex-1 flex flex-col gap-y-4 overflow-y-auto scrollbar-hide pr-2'>
              {messages.map((m, idx) => {
                const isMe = m.sender === name;
                return (
                  <div key={idx} className={`flex gap-x-3 animate-scale-in ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className='flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-400'>
                      {getInitials(m.sender)}
                    </div>
                    <div className={`max-w-[85%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && (
                        <div className='flex items-center gap-x-2 mb-1 px-1'>
                          <span className='text-[10px] text-zinc-500 font-bold uppercase'>{m.sender}</span>
                          {m.isAdmin && <span className='text-[8px] bg-white/10 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter'>Admin</span>}
                        </div>
                      )}
                      <div className={`p-3 px-4 rounded-2xl text-sm ${isMe
                        ? 'bg-white text-zinc-950 font-medium rounded-tr-none shadow-lg shadow-white/5'
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5'
                        }`}>
                        <div
                          className={`prose prose-sm max-w-none break-words ${isMe ? '' : 'prose-invert'}`}
                          style={{ color: isMe ? '#09090b' : '#e4e4e7' }}
                        >
                          <ReactMarkdown>
                            {m.message}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <span className='text-[8px] text-zinc-600 font-medium mt-1 px-1'>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })}
              {typingUsers.length > 0 && (
                <div className='flex items-center gap-x-2 text-zinc-500 text-[10px] font-bold animate-pulse px-2 italic'>
                  <div className='flex gap-x-0.5'>
                    <div className='w-1 h-1 bg-zinc-500 rounded-full animate-bounce'></div>
                    <div className='w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]'></div>
                    <div className='w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]'></div>
                  </div>
                  {typingUsers[0]}{typingUsers.length > 1 ? ` and ${typingUsers.length - 1} others` : ''} is typing...
                </div>
              )}
            </div>
          )}
        </div>

        <div className='p-6 pt-2 bg-white/5 relative'>
          {showEmojis && (
            <div className='absolute bottom-full left-6 mb-2 bg-zinc-900 border border-white/10 p-2 rounded-xl flex gap-x-2 animate-scale-in flex-wrap max-w-[200px] shadow-2xl z-50'>
              {emojis.map(e => (
                <button key={e} onClick={() => addEmoji(e)} className='hover:bg-white/10 p-1.5 rounded transition-all text-lg'>
                  {e}
                </button>
              ))}
            </div>
          )}

          <div className='flex flex-row gap-x-3 items-center bg-zinc-900/50 p-1.5 rounded-xl border border-white/10 focus-within:border-white/30 transition-all'>
            <button
              onClick={() => setShowEmojis(!showEmojis)}
              className={`p-2 rounded-lg transition-all ${showEmojis ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              <Smiley size={22} />
            </button>
            <input
              placeholder='Type a message...'
              className='flex-1 bg-transparent outline-none placeholder-zinc-600 p-3 text-sm'
              ref={inputRef}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
            />
            <button
              className='bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2.5 rounded-lg active:scale-95 transition-all text-sm flex items-center gap-x-2'
              onClick={() => sendMessage()}
            >
              <PaperPlaneRight size={18} weight="fill" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel for Users */}
      {showUsers && (
        <div className='w-64 glass-chat h-full rounded-2xl p-6 flex flex-col animate-scale-in'>
          <div className='flex items-center gap-x-2 mb-6 text-zinc-400 font-bold uppercase text-xs tracking-widest'>
            <Users size={16} />
            Participants ({roomUsers.length})
          </div>
          <div className='flex-1 overflow-y-auto space-y-4 pr-2'>
            {roomUsers.map((user, i) => (
              <div key={i} className='flex items-center gap-x-3 group animate-fade-in-up' style={{ animationDelay: `${i * 100}ms` }}>
                <div className='relative'>
                  <div className='w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:border-white/20 transition-all'>
                    {getInitials(user.name)}
                  </div>
                  <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full'></div>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-bold text-zinc-200'>{user.name}</span>
                  <span className='text-[10px] text-zinc-500 font-bold uppercase'>{user.isAdmin ? 'Owner' : 'Member'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 p-4 bg-white/5 rounded-xl border border-white/5'>
            <div className='flex items-center gap-x-2 text-zinc-500 mb-2'>
              <Info size={14} />
              <span className='text-[10px] font-bold uppercase'>Security Info</span>
            </div>
            <p className='text-[10px] text-zinc-600 leading-relaxed font-medium'>
              • Messages are End-to-End Encrypted using your Room Code. No one, not even the server, can read them.<br />
              • Recent chat history (last 50 messages) is securely stored and available when you join.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


export default Chat