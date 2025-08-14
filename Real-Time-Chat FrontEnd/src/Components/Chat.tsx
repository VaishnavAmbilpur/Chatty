
import { ChatIcon } from '@phosphor-icons/react'
import React, { useState,useRef,useEffect } from 'react'
import { useGlobalContext } from './Mycontext'
const Chat = () => {
  const [messages, setMessages] = useState(["Hello From Server"])
   const { code } = useGlobalContext()
 // Refs to store WebSocket connection and input element
 //@ts-ignore
 const wsRef = useRef(); // WebSocket connection reference
 //@ts-ignore
 const inputRef = React.createRef<HTMLInputEelement>(); // Input field reference
 let count :number =0;
 useEffect(() => {
   // Create new WebSocket connection to local server
   const ws = new WebSocket('ws://localhost:8080');
   try{
   // Handle incoming messages from server
   ws.onmessage = (event) => {
     setMessages(m => [...m, event.data]) // Add new message to messages array
   }

   // Store WebSocket connection in ref for later use
   //@ts-ignore
   wsRef.current = ws;
   let id : string = code;
   // When connection opens, send join room message
   ws.onopen = () => {
     ws.send(JSON.stringify({
       type:"join",
       payload:{
         roomId: `${id}` 
       }
     }))
     count++;
   }
   }catch(e){
    console.log(e);
   }

  return () => {

                ws.close();
        }
 }, []) // Empty depende
  return (
    <div className='font-Josefin bg-zinc-950 border-1 border-zinc-700 my-auto min-w-auto max-h-auto md:min-w-auto md:max-h-auto overflow-hidden rounded-md text-white m-10 overflow-x-hidden overflow-y-hidden'>
        <div className='text-3xl tracking-tighter p-4 font-semibold flex items-start flex-wrap gap-x-4 gap-y-2 flex-col'>
         <div className='flex items-center gap-x-3'><ChatIcon/>
          Real-Time-Chat</div> 
          <div className='text-sm text-zinc-600 tracking-normal'>Temperory Chat Room which is deleted after you left</div>
        </div>
        <div className='m-3 font-Josefin hover:bg-zinc-700 rounded-md p-2 text-zinc-500 font-bold flex justify-between bg-zinc-800'>
            <span>Room Code : {code}</span>
        </div>
        <div className='p-2 rounded-lg'>
          <div className='h-[400px] overflow-y-scroll'>
       {/* Display all messages */}
       {messages.map(message => <div className='m-8'> 
         <span className='bg-white text-black rounded p-4 '>            
           {message} 
         </span>
       </div>)}
     </div>
          </div>
           <div className='m-3 flex flex-row gap-x-2.5 h-fit'>
            <input placeholder='Enter Room code' className=' rounded-md h-fit focus:border-white placeholder-zinc-600 w-62 p-3 border-1 border-zinc-700 ' ref={inputRef}></input>
           <button className=' w-full  items-center font-Josefin h-fit hover:bg-slate-100 rounded-md p-3 text-zinc-950 font-bold flex justify-evenly bg-white cursor-pointer' onClick={()=>{
              // @ts-ignore
            const message = inputRef.current?.value;
            console.log(message);
            // @ts-ignore
            wsRef.current.send(JSON.stringify({
               type: "chat",
           payload: {
             message: message
           }
           }))
           }}>
             Send</button> 
        </div>
    </div>
  )
}

export default Chat