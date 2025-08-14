import {useState,} from 'react'
import './App.css'
import Chat from './Components/Chat'
import Hero from './Components/Hero'
import { MyGlobalContext } from './Components/Mycontext'

import { BrowserRouter,Route,Routes } from 'react-router'

function App() {
  const [code, setcode] = useState<string>("")
  const [users,setUser] = useState<string>("");
  return (
    <>
      <MyGlobalContext.Provider value={{code,setcode}}>
 <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className='min-h-screen min-w-screen flex justify-around bg-zinc-950'>
        <Hero/>
      </div>}/>
       <Route path='/chat' element={<div className='min-h-screen min-w-screen flex justify-around bg-zinc-950 p-4'>
        <Chat/>
      </div>}/>
      </Routes>   
      </BrowserRouter>
     </MyGlobalContext.Provider>
      

   
    </>
  )
}

export default App
