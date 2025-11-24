'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config'; 
import { 
  Twitter, Linkedin, Instagram, 
  Terminal, Zap, MapPin, GraduationCap, 
  ArrowUpRight, Sword, Navigation, 
  Dumbbell, Film, Footprints, Plane, 
  Monitor, Keyboard, Disc, 
  Settings, PenTool, Send, Cpu
} from 'lucide-react';
import Carousel from "../components/carroussel"; 
import { Code2 } from 'lucide-react';
// --- IMAGE IMPORTS ---
import Slide1 from "../assets/imgs/slide1.jpeg";
import Slide2 from "@/app/assets/imgs/Slide2.jpg"
import Slide3 from "@/app/assets/imgs/Slide3.jpg"
import Slide4 from "@/app/assets/imgs/Slide4.jpg"
import Slide5 from "@/app/assets/imgs/Slide5.jpg"
import Slide6 from "@/app/assets/imgs/Slide6.jpg"
import Slide7 from "@/app/assets/imgs/Slide7.jpg"
import Slide8 from "@/app/assets/imgs/Slide8.jpg"
import Slide9 from "@/app/assets/imgs/Slide9.jpg"

// --- PLACEHOLDERS ---
import ZoroImg from "@/app/assets/imgs/zoro.jpg" 
import SetupImg from "@/app/assets/imgs/setup.jpg" 
import AnimeImg from "@/app/assets/imgs/csm-rezearc.jpg"

// --- DYNAMIC IMPORTS ---
const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    { ssr: false, loading: () => <div className="h-32 w-full bg-white/5 animate-pulse rounded-xl"></div> }
);

// --- STYLES ---
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
  .map-grayscale { filter: grayscale(100%) invert(95%) contrast(85%); }
`;

// --- PREMIUM BENTO CARD COMPONENT ---
const BentoCard = ({ children, className = "", delay = 0, noPadding = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`
            group relative overflow-hidden
            bg-neutral-900/60 backdrop-blur-xl
            border border-white/10 border-t-white/20
            shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            rounded-[2rem]
            hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:-translate-y-1
            transition-all duration-500
            flex flex-col
            ${className}
        `}
    >
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        
        {/* Hover Highlight Blob */}
        <div className="absolute -inset-px bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Content Container */}
        <div className={`relative z-10 h-full w-full ${noPadding ? '' : 'p-6 md:p-8'}`}>
            {children}
        </div>
    </motion.div>
);

// --- COMPONENT: GUESTBOOK ---
const Guestbook = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Limit increased to 50 to show scrolling history
        const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"), limit(50));
        const unsubscribe = onSnapshot(q, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message || !name) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "guestbook"), { name, message, createdAt: new Date() });
            setMessage(''); setName('');
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col w-full">
            <div className="mb-4 flex items-center gap-2 flex-shrink-0">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><PenTool size={18}/></div>
                <div>
                    <h3 className="text-sm font-bold text-white">Guestbook</h3>
                    <p className="text-[10px] text-neutral-400">Sign the wall</p>
                </div>
            </div>
            
            {/* SCROLLABLE AREA */}
            <div className="flex-grow overflow-y-auto custom-scrollbar mb-4 pr-2 space-y-2 min-h-0">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-white/5 border border-white/5 p-3 rounded-xl text-xs">
                        <span className="font-bold text-purple-300 block mb-1">{msg.name}</span>
                        <span className="text-neutral-300 leading-relaxed break-words">{msg.message}</span>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="text-neutral-500 text-xs text-center italic py-4">Be the first to sign!</div>
                )}
            </div>

            {/* FORM AREA */}
            <form onSubmit={handleSubmit} className="space-y-2 mt-auto flex-shrink-0">
                <input type="text" placeholder="Name / Alias" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 transition-colors"/>
                <div className="flex gap-2">
                    <input type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 transition-colors"/>
                    <button type="submit" disabled={loading} className="bg-white text-black p-2 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 flex-shrink-0"><Send size={14} /></button>
                </div>
            </form>
        </div>
    );
};

const AboutMe = () => {
    const slides = [
        { image: Slide1 }, { image: Slide2 }, { image: Slide3 }, 
        { image: Slide4 }, { image: Slide5 }, { image: Slide6 }, 
        { image: Slide7 }, { image: Slide8 }, { image: Slide9 },
    ];

    return (
        <div className="bg-[#050505] text-white min-h-screen relative overflow-hidden pb-40 selection:bg-green-500/30">
            <style>{scrollbarStyles}</style>
            
            {/* Background Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-20 relative z-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400 mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Online & Operating</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                        The Man.<br/>
                        The Myth.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                            The Lost Swordsman.
                        </span>
                    </h1>
                </motion.div>

                {/* --- BENTO GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 mb-20">
                    
                    {/* 1. Main Bio */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 min-h-[400px]">
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div>
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                                    <Terminal size={24} className="text-green-400" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4 tracking-tight">I'm Sachin Parihar.</h2>
                                <p className="text-lg text-neutral-400 leading-relaxed font-light max-w-2xl">
                                    A 19-year-old Fullstack Developer who decided sleep was optional. 
                                    Currently aiming to survive my BCA at <strong className="text-white font-medium">Manipal University Jaipur</strong>.
                                </p>
                                <p className="text-lg text-neutral-400 leading-relaxed font-light mt-4 max-w-2xl">
                                    Like my code, I am constantly evolving. I build pixel-perfect interfaces and backends that handle heavy traffic without breaking a sweat.
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mt-8">
                                <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/5 text-neutral-300 font-mono">React Specialist</span>
                                <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/5 text-neutral-300 font-mono">CSS Whisperer</span>
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
                            <Terminal size={300} />
                        </div>
                    </BentoCard>

                    {/* 2. Zoro Card */}
                    <BentoCard className="md:col-span-3 lg:col-span-4 group min-h-[400px]" noPadding>
                        <div className="absolute inset-0 bg-neutral-800">
                             <Image src={ZoroImg} alt="Roronoa Zoro" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <Sword size={16} />
                                <span className="text-xs font-mono uppercase tracking-wider">Spirit Animal</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white italic mb-1">"I'm not lost."</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                I get lost in code just like Zoro gets lost in a straight line. But I always cut through the bugs.
                            </p>
                        </div>
                    </BentoCard>

                    {/* 3. Battle Station */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 min-h-[350px] group" noPadding>
                        <div className="absolute inset-0 bg-neutral-800">
                            <Image src={SetupImg} alt="Desk Setup" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        </div>
                        <div className="absolute top-[30%] left-[50%] group/spot">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black relative cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.6)]"></div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition-all duration-300 translate-x-2 group-hover/spot:translate-x-0">
                                <div className="flex items-center gap-2 font-medium text-neutral-200"><Monitor size={12}/> Primary Display</div>
                            </div>
                        </div>
                        <div className="absolute bottom-[30%] left-[45%] group/spot">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-black relative cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition-all duration-300 translate-x-2 group-hover/spot:translate-x-0">
                                <div className="flex items-center gap-2 font-medium text-neutral-200"><Keyboard size={12}/> Mechanical Keeb</div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-8">
                            <h3 className="text-2xl font-bold text-white mb-1">The Battle Station</h3>
                            <p className="text-neutral-400 text-sm">Where the bugs are created (and destroyed).</p>
                        </div>
                    </BentoCard>

                    {/* 4. Anime Card */}
                    <BentoCard className="md:col-span-3 lg:col-span-4 min-h-[350px] group" noPadding>
                        <div className="absolute inset-0">
                            <Image src={AnimeImg} alt="Anime" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-white/10 tracking-wider">
                            Last Watched
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight">Chainsaw Man: <br/>Reze Arc</h3>
                            <div className="w-full bg-white/20 h-1 rounded-full mb-3 overflow-hidden">
                                <div className="bg-orange-500 h-full w-[85%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-neutral-300 font-medium">
                                <span>Movie</span>
                                <span>85% Complete</span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* 5. Spotify (RapCaviar) */}
                    <BentoCard className="md:col-span-4 lg:col-span-4 min-h-[220px]" noPadding delay={0.3}>
                        <div className="w-full h-full bg-[#121212] relative overflow-hidden rounded-[2rem]">
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: '12px' }}
                                src="https://open.spotify.com/embed/playlist/76ixDaNumvGhEwGkISg19O?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </BentoCard>

                    {/* 6. Config Card */}
                    <BentoCard className="md:col-span-4 lg:col-span-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-6 text-blue-400">
                            <div className="p-2 bg-blue-500/20 rounded-lg"><Code2 size={16} /></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Skill Tree</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Frontend Arch", level: 92, color: "bg-blue-500" },
                                { label: "Backend / API", level: 75, color: "bg-green-500" },
                                { label: "UI/UX Design", level: 88, color: "bg-purple-500" }
                            ].map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-neutral-300">{skill.label}</span>
                                        <span className="text-neutral-500 font-mono">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            whileInView={{ width: `${skill.level}%` }} 
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className={`h-full ${skill.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* 7. Hobbies Card */}
                    <BentoCard className="md:col-span-4 lg:col-span-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-6 text-neutral-200">
                            <div className="p-2 bg-white/5 rounded-lg"><Footprints size={16} /></div>
                            <span className="text-xs font-bold uppercase tracking-wider">AFK Activities</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: Dumbbell, color: "text-yellow-400", label: "Lifting Heavy", sub: "Carrying the team" },
                                { icon: Film, color: "text-purple-400", label: "Cinema", sub: "Judging CGI" },
                                { icon: Plane, color: "text-blue-400", label: "Travel", sub: "Wallet permitting" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 group/item cursor-default">
                                    <div className={`p-2 bg-white/5 rounded-lg group-hover/item:bg-white/10 transition-colors ${item.color}`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <span className="text-sm text-white font-medium block">{item.label}</span>
                                        <span className="text-[10px] text-neutral-500">{item.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* 8. Guestbook - FIXED HEIGHT */}
                    <BentoCard className="md:col-span-6 lg:col-span-6 h-[400px]">
                        <Guestbook />
                    </BentoCard>

                    {/* 9. Map Card */}
                    <BentoCard className="md:col-span-6 lg:col-span-6 h-[400px] relative group overflow-hidden" noPadding>
                        <div className="absolute inset-0 bg-neutral-800">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.23456789!2d73.79!3d18.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM1JzIyLjgiTiA3M8KwNDcnMzEuMiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                                width="100%" height="100%" style={{ border: 0 }} 
                                allowFullScreen="" loading="lazy" 
                                className="map-grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            ></iframe>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold">Base</span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="flex items-center gap-2 text-white">
                                <MapPin size={18} className="text-red-500" />
                                <h3 className="font-bold text-sm">Rahatani, Pune</h3>
                            </div>
                        </div>
                    </BentoCard>

                    {/* 10. GitHub Calendar */}
                    <BentoCard className="md:col-span-12 lg:col-span-12 p-8 flex flex-col justify-center items-center bg-neutral-900/80 border-t-white/10">
                        <div className="w-full flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Cpu size={20} className="text-green-500"/>
                                Commit Crimes
                            </h3>
                            <span className="text-xs text-neutral-500 font-mono bg-white/5 px-2 py-1 rounded">Last 365 Days</span>
                        </div>
                        <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex justify-center">
                            <GitHubCalendar 
                                username="Sheenu-exe" 
                                colorScheme="dark"
                                fontSize={12}
                                blockSize={13}
                                blockMargin={4}
                                theme={{
                                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                }}
                            />
                        </div>
                    </BentoCard>

                    {/* 11. Tech Stack Scrolling */}
                    <BentoCard className="md:col-span-12 lg:col-span-12 relative flex items-center overflow-hidden h-[120px]" noPadding>
                        <div className="absolute inset-0 bg-neutral-900/50 z-0"></div>
                        <motion.div 
                            className="flex gap-12 py-8 whitespace-nowrap min-w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        >
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex gap-12 text-neutral-700 font-black text-6xl uppercase opacity-50 select-none tracking-tighter">
                                    <span>Next.js</span><span>React</span><span>Tailwind</span><span>Firebase</span><span>TypeScript</span><span>Figma</span>
                                </div>
                            ))}
                        </motion.div>
                    </BentoCard>

                </div>

                {/* Visual Evidence */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-10 px-2">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Visual Evidence</h2>
                            <p className="text-neutral-500 text-sm">Photos taken between debugging sessions.</p>
                        </div>
                    </div>
                    <Carousel items={slides} visibleItems={{ mobile: 1, tablet: 2, desktop: 3 }} autoPlay={true} interval={4000} />
                </div>

                {/* Socials Grid */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 px-2">
                        Social Feeds <span className="text-sm font-normal text-neutral-500 bg-white/5 px-3 py-1 rounded-full">Live Updates</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Twitter */}
                        <BentoCard className="border-blue-500/20 h-[500px]" noPadding>
                            <div className="p-4 border-b border-white/5 bg-blue-500/5 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-blue-500 rounded-md text-white"><Twitter size={14}/></div>
                                    <span className="font-bold text-sm">@Sheenu_exe</span>
                                </div>
                                <a href="https://twitter.com/Sheenu_exe" target="_blank" className="text-[10px] uppercase tracking-wider opacity-50 hover:opacity-100 flex items-center gap-1">Yap Session <ArrowUpRight size={10} /></a>
                            </div>
                            <div className="p-4 h-[calc(100%-60px)] overflow-y-scroll custom-scrollbar">
                                <blockquote className="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">💼 Sachin Parihar - Fullstack Developer<br />Open for Opportunity!</p>— Sachin Parihar (@Sheenu_exe) <a href="https://twitter.com/Sheenu_exe/status/1882304497789317206">January 23, 2025</a></blockquote>
                                <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
                            </div>
                        </BentoCard>

                        {/* LinkedIn */}
                        <BentoCard className="border-blue-700/20 h-[500px]" noPadding>
                            <div className="p-4 border-b border-white/5 bg-blue-700/5 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-[#0077b5] rounded-md text-white"><Linkedin size={14}/></div>
                                    <span className="font-bold text-sm">Sachin Parihar</span>
                                </div>
                                <a href="https://linkedin.com" target="_blank" className="text-[10px] uppercase tracking-wider opacity-50 hover:opacity-100 flex items-center gap-1">Professional <ArrowUpRight size={10} /></a>
                            </div>
                            <div className="h-[calc(100%-60px)] bg-white">
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7278346219670638593" className="w-full h-full border-none" title="LinkedIn"></iframe>
                            </div>
                        </BentoCard>

                        {/* Instagram */}
                        <BentoCard className="border-pink-500/20 h-[500px]" noPadding>
                             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-orange-900/20 pointer-events-none"></div>
                             <div className="p-4 border-b border-white/5 relative z-10 flex justify-between items-center bg-black/20 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-md text-white"><Instagram size={14}/></div>
                                    <span className="font-bold text-sm">@sachinn.code</span>
                                </div>
                                <a href="https://www.instagram.com/sachinn.code/" target="_blank" className="text-[10px] uppercase tracking-wider opacity-50 hover:opacity-100 flex items-center gap-1">Touch Grass <ArrowUpRight size={10} /></a>
                            </div>
                            <div className="relative z-10 h-[calc(100%-60px)] overflow-y-scroll custom-scrollbar bg-black/20">
                                 <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DEmEDIfTvHk/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: 'none', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%', width: '-webkit-calc(100% - 2px)', width: 'calc(100% - 2px)' }}></blockquote>
                                <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
                            </div>
                        </BentoCard>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutMe;