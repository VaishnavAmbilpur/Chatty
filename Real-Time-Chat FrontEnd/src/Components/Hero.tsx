
import "../App.css"
import "../index.css"
import { CopyIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

import { userNameStore, useUserCodeStore } from '../store'
const Hero = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [alert, setalert] = useState<string | null>(null);
  const code = userNameStore((state) => state.user);
  const setcode = userNameStore((state) => state.setuser);

  const setname = useUserCodeStore((state) => state.setcode);
  const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', "I", "J", "K", 'L', "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  function random(): void {
    let st: string = "";
    while (st.length < 6) {
      st += letters[Math.floor(Math.random() * 26)];
    }
    setcode(st);
    if (codeRef.current) {
      codeRef.current.value = st;
    }
    setalert("D");
  }
  function handle(): void {
    navigator.clipboard.writeText(code);
    toast.success("Copied to Clipboard");
  }
  function handleJoin(): void {
    const name = nameRef.current?.value.trim();
    const roomCode = codeRef.current?.value.trim();

    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    if (!roomCode) {
      toast.error("Please enter Room Code");
      return;
    }

    setcode(roomCode);
    setname(name);
    navigate("/chat");
  }

  return (
    <div className='font-Josefin glass animate-fade-in-up shadow-2xl my-auto min-w-[320px] md:min-w-[360px] rounded-xl text-white overflow-hidden'>
      <div className='text-2xl tracking-tighter p-5 font-semibold flex items-start flex-wrap gap-x-3 gap-y-1.5 flex-col bg-white/5'>
        <div className='flex items-center gap-x-2.5'>
          <img src="/favicon.png" alt="Chatty Logo" className="w-7 h-7 rounded-lg shadow-md border border-white/10" />
          Chatty
        </div>
        <div className='text-[10px] text-zinc-500 tracking-wider uppercase font-bold mt-0.5'>Temporary Chat Room</div>
      </div>

      <div className='p-5 flex flex-col gap-y-3.5'>
        <div className='font-Josefin hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98] rounded-lg py-2.5 px-4 text-zinc-950 font-bold flex cursor-pointer justify-center bg-white shadow-md text-sm' onClick={() => { random() }}>
          Create New Room
        </div>

        <div className='flex flex-col gap-y-2.5'>
          <input
            placeholder='Enter your name'
            className='rounded-lg focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder-zinc-500 w-full py-2.5 px-4 bg-zinc-900/50 border border-zinc-700/50 focus:border-white/40 text-sm'
            ref={nameRef}
          />

          <div className='flex flex-row gap-x-2'>
            <input
              placeholder='Room code'
              className='rounded-lg focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder-zinc-500 flex-1 py-2.5 px-4 bg-zinc-900/50 border border-zinc-700/50 focus:border-white/40 text-sm'
              ref={codeRef}
            />
            <button
              className='flex-1 items-center font-Josefin hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98] rounded-lg py-2.5 px-4 text-zinc-950 font-bold flex justify-center bg-white shadow-md text-sm'
              onClick={() => { handleJoin() }}
            >
              Join Room
            </button>
          </div>
        </div>

        {alert && (
          <div className='animate-scale-in'>
            <div className='bg-zinc-900/80 border border-zinc-800 rounded-lg py-2.5 px-4 flex justify-between items-center group'>
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase text-zinc-500 font-bold'>Room Code</span>
                <div className='text-white text-lg font-mono tracking-widest'>{code}</div>
              </div>
              <div className='p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer' onClick={() => { handle() }}>
                <CopyIcon size={20} className='text-zinc-400 group-hover:text-white transition-colors' />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default Hero