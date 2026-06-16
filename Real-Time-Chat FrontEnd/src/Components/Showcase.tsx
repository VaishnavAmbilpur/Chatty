import { Link } from 'react-router-dom'
import { ShieldCheck, LockKey, Sparkle, ArrowRight, GithubLogo } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

const Showcase = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: <LockKey size={24} weight="duotone" className="text-white" />,
            title: "End-to-End Encryption",
            description: "Your messages are encrypted using your room code. Not even our servers can read your conversations."
        },
        {
            icon: <Sparkle size={24} weight="duotone" className="text-white" />,
            title: "True Ephemeral Chat",
            description: "No accounts, no databases, no logs. Messages exist only for the duration of the session."
        },
        {
            icon: <ShieldCheck size={24} weight="duotone" className="text-white" />,
            title: "Privacy First",
            description: "Designed for those who value anonymity. Jump in, chat, and leave without a trace."
        }
    ]

    const githubUrl = "https://github.com/VaishnavAmbilpur/Chatty";

    return (
        <div className="min-h-screen w-full bg-[#030303] text-zinc-400 font-geist-sans flex flex-col justify-between selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
            {/* Ambient Background Grid and Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60"></div>
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-50"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.015), transparent 80%)`
                }}
            />

            {/* Navbar */}
            <nav className="border-b border-zinc-900/60 px-6 py-5 md:px-12 flex justify-between items-center max-w-6xl w-full mx-auto backdrop-blur-[2px] sticky top-0 z-50 bg-[#030303]/80">
                <div className="flex items-center gap-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/favicon.png" alt="Chatty Logo" className="w-7 h-7 rounded-md shadow-md border border-zinc-850 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-bold tracking-tighter text-white font-geist-sans">chatty</span>
                </div>
                <div className="flex items-center gap-x-5">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                        <GithubLogo size={22} weight="fill" />
                    </a>
                    <Link to="/join" className="border border-zinc-800 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs bg-zinc-950 hover:bg-zinc-900 transition-all font-geist-mono">
                        [ launch_app ]
                    </Link>
                </div>
            </nav>

            {/* Centered Hero Section */}
            <main className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center justify-center w-full">
                <div className="animate-fade-in-up space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight">
                            Privacy as a <span className="text-gradient">Standard.</span>
                        </h1>
                        <p className="text-sm md:text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
                            No accounts. No logs. No persistence. Experience truly ephemeral end-to-end encrypted messaging designed for the modern web.
                        </p>
                    </div>
                    <div className="flex flex-row gap-4 justify-center pt-2">
                        <Link to="/join" className="group bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-x-2 font-geist-mono">
                            Get Started
                            <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-x-2 px-6 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-bold hover:bg-white/5 transition-all text-xs font-geist-mono">
                            <GithubLogo size={16} />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </main>

            {/* Features specifications list section */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:px-12 w-full border-t border-zinc-900/60">
                <div className="mb-12 text-left space-y-1">
                    <span className="text-[10px] text-zinc-650 tracking-widest uppercase font-bold block font-geist-mono">// specifications</span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Built for the Modern Web.</h2>
                    <p className="text-zinc-500 text-xs md:text-sm font-medium">Zero compromises on speed, security, or aesthetics.</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-[#070709] border border-zinc-900/60 p-6 md:p-8 rounded-2xl hover:border-zinc-800 transition-all group relative overflow-hidden text-left"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-all"></div>
                            <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-500 relative">
                                <div className="relative z-10 group-hover:invert text-white flex items-center justify-center">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-zinc-550 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ready to Chat CTA */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:px-12 w-full">
                <div className="border border-zinc-900 bg-[#070709] p-10 md:p-16 rounded-3xl text-center relative overflow-hidden">
                    <div className="space-y-4 max-w-md mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Ready to chat secure?</h2>
                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">Join thousands of users who trust Chatty for their temporary conversations. No account needed, ever.</p>
                        <div className="flex flex-row gap-4 justify-center pt-2">
                            <Link to="/join" className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-all active:scale-95 font-geist-mono">
                                Get Started Now
                            </Link>
                            <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-x-2 px-6 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-bold hover:bg-white/5 transition-all text-xs font-geist-mono">
                                <GithubLogo size={16} />
                                Star on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (Plain, Centered Name only) */}
            <footer className="relative z-10 border-t border-zinc-900/60 py-12 px-6 text-center w-full font-geist-mono text-xs text-zinc-650 bg-[#030303]">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Vaishnav Ambilpur
                </a>
            </footer>
        </div>
    )
}

export default Showcase
