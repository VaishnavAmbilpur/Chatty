
import { Link } from 'react-router-dom'
import { ShieldCheck, ChatTeardropDots, LockKey, Sparkle, ArrowRight, GithubLogo } from '@phosphor-icons/react'
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
            icon: <LockKey size={32} weight="duotone" className="text-white" />,
            title: "End-to-End Encryption",
            description: "Your messages are encrypted using your room code. Not even our servers can read your conversations."
        },
        {
            icon: <Sparkle size={32} weight="duotone" className="text-white" />,
            title: "True Ephemeral Chat",
            description: "No accounts, no databases, no logs. Messages exist only for the duration of the session."
        },
        {
            icon: <ChatTeardropDots size={32} weight="duotone" className="text-white" />,
            title: "Markdown Support",
            description: "Express yourself with full Markdown support. Format code, lists, and emphasis with ease."
        },
        {
            icon: <ShieldCheck size={32} weight="duotone" className="text-white" />,
            title: "Privacy First",
            description: "Designed for those who value anonymity. Jump in, chat, and leave without a trace."
        }
    ]

    const githubUrl = "https://github.com/VaishnavAmbilpur/Chatty";

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-zinc-200 selection:bg-white selection:text-zinc-950 overflow-x-hidden relative">
            <div className="fixed inset-0 noise z-50 pointer-events-none"></div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] animate-orbit opacity-60"
                    style={{ transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)` }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px] animate-orbit opacity-60 [animation-direction:reverse]"
                    style={{ transform: `translate(${(mousePos.x - window.innerWidth / 2) * -0.03}px, ${(mousePos.y - window.innerHeight / 2) * -0.03}px)` }}
                ></div>
            </div>

            <nav className="relative z-10 flex justify-between items-center px-6 py-8 md:px-12 max-w-7xl mx-auto backdrop-blur-sm border-b border-white/5 bg-zinc-950/20 sticky top-0">
                <div className="flex items-center gap-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/favicon.png" alt="Chatty Logo" className="w-8 h-8 rounded-lg shadow-lg border border-white/10 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold tracking-tighter text-white font-Josefin">Chatty</span>
                </div>
                <div className="flex items-center gap-x-6">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                        <GithubLogo size={24} weight="fill" />
                    </a>
                    <Link to="/join" className="hidden md:block bg-white text-zinc-950 px-6 py-2.5 rounded-xl font-extrabold text-sm hover:bg-zinc-200 transition-all active:scale-95 font-Josefin shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Launch App
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 md:px-12 text-center md:text-left grid lg:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 hover:border-white/20 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Zero Logs • Zero Footprint</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 font-Josefin">
                        <span className="text-white block">Privacy as a</span>
                        <span className="text-gradient">Standard.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 max-w-xl mb-12 leading-relaxed font-medium">
                        No accounts. No logs. No persistence. Experience truly ephemeral end-to-end encrypted messaging designed for the modern web.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                        <Link to="/join" className="group bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black text-xl hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-x-3 font-Josefin shadow-2xl shadow-white/5">
                            Get Started
                            <ArrowRight size={24} weight="bold" className="group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                        <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-x-2 px-10 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all font-Josefin">
                            <GithubLogo size={24} />
                            Star on GitHub
                        </a>
                    </div>
                </div>

                <div className="relative animate-scale-in hidden lg:block">
                    <div className="relative z-10 glass-chat p-10 rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] animate-float overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-x-3">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-white/20"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-white/20 rounded-full"></div>
                                    <div className="h-2 w-16 bg-white/5 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5"></div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5"></div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-x-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/5 flex-shrink-0"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-10 w-4/5 bg-white/10 rounded-2xl rounded-tl-none"></div>
                                    <div className="h-3 w-16 bg-zinc-800 rounded-full ml-1"></div>
                                </div>
                            </div>
                            <div className="flex gap-x-3 flex-row-reverse">
                                <div className="w-10 h-10 rounded-full bg-white flex-shrink-0"></div>
                                <div className="space-y-2 flex-1 flex flex-col items-end">
                                    <div className="h-12 w-3/4 bg-white rounded-2xl rounded-tr-none"></div>
                                    <div className="h-3 w-16 bg-zinc-800 rounded-full mr-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/5 flex gap-x-4 items-center">
                            <div className="flex-1 h-12 bg-white/5 rounded-2xl border border-white/5 flex items-center px-4">
                                <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center">
                                <div className="w-5 h-5 bg-zinc-950 rounded-sm rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -z-10"></div>
                    <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -z-10"></div>
                </div>
            </main>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-40 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl animate-fade-in-up">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6 font-Josefin">Built for the <br /> <span className="text-zinc-500">Modern Web.</span></h2>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium font-Josefin">Zero compromises on speed, security, or aesthetics. Experience a chat client that values your time as much as your data.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="glass p-10 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group animate-fade-in-up relative overflow-hidden"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all"></div>
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 group-hover:invert text-white">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-Josefin">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40 md:px-12">
                <div className="glass p-12 md:p-24 rounded-[48px] text-center relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/5 noise -z-10"></div>
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-Josefin">Ready to chat secure?</h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">Join thousands of users who trust Chatty for their temporary conversations. No account needed, ever.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/join" className="bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black text-xl hover:bg-zinc-200 transition-all active:scale-95 font-Josefin">
                            Get Started Now
                        </Link>
                        <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-x-2 px-10 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all font-Josefin">
                            View Source
                        </a>
                    </div>
                </div>
            </section>

            <footer className="relative z-10 border-t border-white/5 py-16 px-6 md:px-12 bg-zinc-950">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-x-3">
                            <img src="/favicon.png" alt="Chatty Logo" className="w-8 h-8 rounded-lg shadow-lg" />
                            <span className="text-2xl font-bold tracking-tighter text-white font-Josefin">Chatty</span>
                        </div>
                        <p className="text-zinc-500 max-w-xs font-medium">
                            A minimalist, secure, and ephemeral chat experience for everyone.
                        </p>
                        <div className="flex items-center gap-x-4">
                            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                <GithubLogo size={24} weight="fill" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h4 className="text-white font-bold font-Josefin">Product</h4>
                            <ul className="space-y-2 text-zinc-500 text-sm font-medium">
                                <li><Link to="/join" className="hover:text-white transition-colors">Launch Chat</Link></li>
                                <li><Link to="/" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/join" className="hover:text-white transition-colors">Room Creation</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white font-bold font-Josefin">Community</h4>
                            <ul className="space-y-2 text-zinc-500 text-sm font-medium">
                                <li><a href={githubUrl} className="hover:text-white transition-colors">GitHub</a></li>
                                <li><a href={githubUrl} className="hover:text-white transition-colors">Open Source</a></li>
                                <li><a href={githubUrl} className="hover:text-white transition-colors">Contribute</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest font-Josefin">
                        © 2024 Chatty • Built by <a href="https://github.com/VaishnavAmbilpur" className="text-zinc-500 hover:text-white underline">Vaishnav Ambilpur</a>
                    </p>
                    <div className="flex gap-x-8">
                        <span className="text-zinc-700 text-[10px] font-black uppercase tracking-tighter">Zero Retention</span>
                        <span className="text-zinc-700 text-[10px] font-black uppercase tracking-tighter">End-to-End Encrypted</span>
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default Showcase
