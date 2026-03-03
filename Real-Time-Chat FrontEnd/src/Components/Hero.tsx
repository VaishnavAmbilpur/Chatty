import { ChatIcon } from '@phosphor-icons/react'
import "../App.css"
import "../index.css"
import { CopyIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

import { userNameStore, useUserCodeStore } from '../store'
const Hero = () => {
  //@ts-ignore
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [alert, setalert] = useState(null);
  const code = userNameStore((state) => state.user);
  const setcode = userNameStore((state) => state.setuser);

  const setname = useUserCodeStore((state) => state.setcode);
  const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', "I", "J", "K", 'L', "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  function random(): void {
    let st: string = "";
    while (st.length < 6) {
      st += letters[Math.floor(Math.random() * 26)];
    }
    let ans = st.toString();
    console.log(ans);
    //@ts-ignore
    setalert("D");
    setcode(st);
  }
  function handle(): void {
    navigator.clipboard.writeText(code);
    toast.success("Copied to Clipboard");
  }
  function handleJoin(): void {
    if (nameRef.current?.value !== '' && codeRef.current?.value !== '') {
      // @ts-ignore
      setcode(codeRef.current?.value)
      if (nameRef.current?.value)
        setname(nameRef.current?.value);
      navigate("/chat");
    }

  }
  return (
    <div className='font-Josefin glass animate-fade-in-up shadow-2xl my-auto min-w-[350px] md:min-w-[400px] rounded-2xl text-white overflow-hidden'>
      <div className='text-3xl tracking-tighter p-6 font-semibold flex items-start flex-wrap gap-x-4 gap-y-2 flex-col bg-white/5'>
        <div className='flex items-center gap-x-3'><ChatIcon weight="fill" className='text-zinc-400' />
          Chatty</div>
        <div className='text-xs text-zinc-500 tracking-wider uppercase font-bold mt-1'>Temporary Chat Room</div>
      </div>

      <div className='p-6 flex flex-col gap-y-4'>
        <div className='font-Josefin hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98] rounded-xl p-4 text-zinc-950 font-bold flex cursor-pointer justify-center bg-white shadow-lg' onClick={() => { random() }}>
          Create New Room
        </div>

        <div className='flex flex-col gap-y-3'>
          <input
            placeholder='Enter your name'
            className='rounded-xl focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder-zinc-500 w-full p-4 bg-zinc-900/50 border border-zinc-700/50 focus:border-white/40'
            ref={nameRef}
          />

          <div className='flex flex-row gap-x-2'>
            <input
              placeholder='Room code'
              className='rounded-xl focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder-zinc-500 flex-1 p-4 bg-zinc-900/50 border border-zinc-700/50 focus:border-white/40'
              ref={codeRef}
            />
            <Link to="/chat" className='flex-1'>
              <button
                className='w-full h-full items-center font-Josefin hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98] rounded-xl p-4 text-zinc-950 font-bold flex justify-center bg-white shadow-lg'
                onClick={() => { handleJoin() }}
              >
                Join Room
              </button>
            </Link>
          </div>
        </div>

        {alert && (
          <div className='animate-scale-in'>
            <div className='bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex justify-between items-center group'>
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase text-zinc-500 font-bold'>Room Code</span>
                <div className='text-white text-xl font-mono tracking-widest'>{code}</div>
              </div>
              <div className='p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer' onClick={() => { handle() }}>
                <CopyIcon size={24} className='text-zinc-400 group-hover:text-white transition-colors' />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default Hero