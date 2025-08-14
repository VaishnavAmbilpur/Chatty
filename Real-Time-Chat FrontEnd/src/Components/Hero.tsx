import {ChatIcon} from '@phosphor-icons/react'
import "../App.css"
import "../index.css"
import { CopyIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useGlobalContext } from './Mycontext'
const Hero = () => {
  //@ts-ignore
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [alert,setalert] = useState(null);
  const { code, setcode } = useGlobalContext();
  const letters : string[] = ['A','B','C','D','E','F','G','H',"I","J","K",'L',"M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  function random(): void{
    let st :string  = "";
       while(st.length<6){
        st+=letters[Math.floor(Math.random()*26)];
         }
    let ans = st.toString();
    console.log(ans);
    //@ts-ignore
    setalert("D");
    setcode(st);
  }
  function handle():void{
      navigator.clipboard.writeText(code);
      toast.success("Copied to Clipboard");
  }
  function handleJoin():void{
    if(nameRef.current?.value!=='' && codeRef.current?.value!==''){
            // @ts-ignore
            setcode(codeRef.current?.value)
             navigate("/chat");
    }
  
  }
  return (
    <div className='font-Josefin bg-zinc-950 border-1 border-zinc-700 my-auto min-w-auto max-h-auto md:min-w-auto md:max-h-auto rounded-md text-white'>
        <div className='text-3xl tracking-tighter p-4 font-semibold flex items-start flex-wrap gap-x-4 gap-y-2 flex-col'>
         <div className='flex items-center gap-x-3'><ChatIcon/>
          Real-Time-Chat</div> 
          <div className='text-sm text-zinc-500 tracking-normal'>Temperory Chat Room</div>
        </div>
        <div className='m-3 font-Josefin hover:bg-slate-100 rounded-md p-2 text-zinc-950 font-bold flex  cursor-pointer justify-center bg-white' onClick={()=>{random()}}>
             Create Room
        </div>
        <div>
          <div className='m-3'>
            <div>  <input placeholder='Enter your name' className=' rounded-md focus:border-white placeholder-zinc-500 w-full p-3 border-1 border-zinc-700' ref={nameRef}></input>
        </div>
          </div>
           <div className='m-3 flex flex-row gap-x-2.5 h-fit'>
            <input placeholder='Enter Room code' className=' rounded-md h-fit focus:border-white placeholder-zinc-500 w-62 p-3 border-1 border-zinc-700 ' ref={codeRef}></input>
           <Link to="/chat"><div className=' w-full  overflow-hidden items-center font-Josefin h-fit hover:bg-slate-100 rounded-md p-3 text-zinc-950 font-bold flex justify-evenly bg-white' onClick={()=>{handleJoin()}}>
             JoinRoom</div></Link> 
          </div>
        </div>
        {alert && <>
        <div className='min-h-fit min-w-full'>
            <div className='m-3 bg-zinc-800 p-4 flex justify-between items-center'>
              <div className='flex justify-start gap-x-4'><div>Room Code:</div>
              <div className='text-white'>{code}</div></div>
              <div ><CopyIcon size={22} className='cursor-pointer' onClick={()=>{handle()}}/></div>
            </div>
        </div>
        </>}
    </div>
  )
}

export default Hero