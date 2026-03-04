
import './App.css'
import Chat from './Components/Chat'
import Hero from './Components/Hero'
import Showcase from './Components/Showcase'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Showcase />}
          />
          <Route
            path="/join"
            element={
              <div className="min-h-screen min-w-screen flex items-center justify-center bg-zinc-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-zinc-900/50">
                <Hero />
              </div>
            }
          />
          <Route
            path="/chat"
            element={
              <div className="min-h-screen min-w-screen flex items-center justify-center bg-zinc-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-zinc-900/50 p-4">
                <Chat />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
