'use client'
import "../globals.css";
import { useState, useEffect } from "react";
import { motion, useScroll } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { Code, ExternalLink, ChevronDown, Search, Activity, Server, Layers, GitCommit, Terminal } from "lucide-react"; 
import Image from "next/image";
import Hero from "../assets/imgs/hero-section5.jpg"
import HeroMob from "../assets/imgs/hero-section.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../components/footer";

// Icons
import { AiOutlineHtml5 } from "react-icons/ai";
import { TbBrandCss3, TbBrandJavascript } from "react-icons/tb";
import { FaReact, FaBootstrap, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { IoLogoFirebase } from "react-icons/io5";
import { RiSupabaseFill } from "react-icons/ri";

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [activeSection, setActiveSection] = useState("home");
    const { scrollYProgress } = useScroll();
    
    const sortedExperiences = experiences.sort((a, b) => parseInt(a.index) - parseInt(b.index));
    const sortedProjects = projects.sort((a, b) => parseInt(a.index) - parseInt(b.index));

    const getRoleDescription = (title = "", company = "") => {
        const t = title.toLowerCase();
        if (t.includes('front')) return "Optimized render cycles and argued with designers about sub-pixel rendering. Made sure the button actually clicks on mobile.";
        if (t.includes('back')) return "Built APIs robust enough to survive a Reddit hug of death. Spent weekends optimizing database queries so you don't have to.";
        if (t.includes('full') || t.includes('stack')) return "Bridged the gap between 'it looks pretty' and 'it actually scales'. Handled the chaos of the entire stack.";
        if (t.includes('intern')) return "Pushed code to production without taking down the server. Learned that 'temporary fix' usually means 'permanent feature'.";
        if (t.includes('lead') || t.includes('senior')) return "Code reviews, architecture decisions, and protecting the main branch from rogue commits.";
        return `Contributed to ${company}. Focused on clean architecture, maintainability, and deleting more code than I wrote.`;
    };
    
    const NavLink = ({ section, title, icon }) => (
        <motion.a 
            href={`#${section}`}
            className={`whitespace-nowrap px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                activeSection === section 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            onClick={() => setActiveSection(section)}
            whileTap={{ scale: 0.95 }}
        >
            {icon && <span className="text-[10px] md:text-xs">{icon}</span>}
            {title}
        </motion.a>
    );

    const TechItem = ({ icon, title, description }) => (
        <motion.div 
            className="group relative bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 backdrop-blur-sm overflow-hidden active:border-white/30 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className="absolute top-0 right-0 p-2 opacity-10 md:opacity-0 md:group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-3 text-3xl md:text-4xl text-neutral-200 md:group-hover:text-white md:group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="font-bold text-white mb-1 text-sm md:text-base">{title}</h3>
                <p className="text-[10px] md:text-xs text-neutral-500">{description}</p>
            </div>
        </motion.div>
    );

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

        if (typeof window !== "undefined") {
            const fetchData = async () => {
                try {
                    const pRef = collection(db, 'projects');
                    const eRef = collection(db, 'experiences');
                    const [pSnap, eSnap] = await Promise.all([getDocs(pRef), getDocs(eRef)]);
                    
                    setProjects(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    setExperiences(eSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchData();

            const handleScroll = () => {
                const sections = ["home", "techstack", "experience", "work"];
                const currentPosition = window.scrollY + 200;
                sections.forEach(sec => {
                    const el = document.getElementById(sec);
                    if (el && currentPosition >= el.offsetTop && currentPosition < el.offsetTop + el.offsetHeight) {
                        setActiveSection(sec);
                    }
                });
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []); 

    return (
        <div className="bg-[#050505] text-neutral-200 min-h-screen selection:bg-white selection:text-black relative overflow-x-hidden w-full max-w-[100vw]">
            
            {/* 1. BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            {/* 2. FLOATING NAVIGATION */}
            <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
                <motion.nav 
                    className="pointer-events-auto flex items-center space-x-1 px-3 py-2 bg-neutral-900/90 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl overflow-x-auto max-w-full no-scrollbar"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <div className="hidden sm:block px-4 font-bold text-white tracking-tighter mr-2">SP.</div>
                    <NavLink section="home" title="Start" />
                    <NavLink section="techstack" title="Stack" />
                    <NavLink section="experience" title="Lore" />
                    <NavLink section="work" title="Drops" />
                </motion.nav>
            </div>

            {/* 3. MAIN CONTENT */}
            <div className="relative z-10 w-full">
                
                {/* HERO SECTION - RESTRUCTURED FOR MOBILE */}
                <section id="home" className="min-h-screen relative flex items-center pt-24 md:pt-20 pb-10 overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            
                            {/* TEXT BLOCK: Order-1 on Mobile (Shows First) */}
                            <motion.div 
                                className="lg:col-span-7 space-y-6 order-1 lg:order-1 text-center lg:text-left mt-8 md:mt-0"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex justify-center lg:justify-start">
                                    <motion.div 
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Fueled by CI/CD & sheer will
                                    </motion.div>
                                </div>
                                
                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[0.9]">
                                    I turn "it works on my machine" into <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">
                                        global scale.
                                    </span>
                                </h1>
                                
                                <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    Hi, I'm <span className="text-white font-semibold">Sachin</span>. A Fullstack Dev. 
                                    I architect systems that handle the chaos so you don't have to.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                    <a 
                                        href="#work"
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors active:scale-95"
                                    >
                                        View The Code <Code size={18} />
                                    </a>
                                    <a 
                                        href="https://linkedin.com" target="_blank"
                                        className="px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        Hire Me <ExternalLink size={18} />
                                    </a>
                                </div>
                            </motion.div>

                            {/* IMAGE BLOCK: Order-2 on Mobile (Shows Second) */}
                            <motion.div 
                                className="lg:col-span-5 relative order-2 lg:order-2 mb-0 lg:mb-0"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl mx-auto w-full max-w-md lg:max-w-full">
                                    {/* Desktop Image */}
                                    <Image 
                                        src={Hero} 
                                        alt="Sachin Parihar" 
                                        className="hidden md:block object-cover w-full h-[600px] grayscale hover:grayscale-0 transition-all duration-500" 
                                        priority
                                    />
                                    {/* Mobile Image - Shorter height, nice card look */}
                                    <Image 
                                        src={HeroMob} 
                                        alt="Sachin Parihar" 
                                        className="block md:hidden object-cover w-full h-[260px] grayscale hover:grayscale-0 transition-all duration-500" 
                                        priority
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                                    
                                    {/* Status Card - Pinned bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-black/50 rounded-lg text-white border border-white/10"><Terminal size={16}/></div>
                                            <div>
                                                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Current State</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                                    <p className="font-mono text-xs text-white truncate">Refactoring legacy code</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative Blobs - HIDDEN on mobile */}
                                <div className="hidden md:block absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                                <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                            </motion.div>
                        </div>
                    </div>
                    
                    <motion.div 
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-500 hidden md:block"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </section>

                {/* TECH STACK SECTION */}
                <section id="techstack" className="py-20 relative">
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">My Arsenal</h2>
                            <p className="text-lg text-neutral-400 max-w-2xl mx-auto md:mx-0">
                                My preferred weapons for fighting entropy and spaghetti code.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                            <TechItem icon={<AiOutlineHtml5 />} title="HTML5" description="Semantic" />
                            <TechItem icon={<TbBrandCss3 />} title="CSS3" description="Pixel Perfect" />
                            <TechItem icon={<TbBrandJavascript />} title="JavaScript" description="The Engine" />
                            <TechItem icon={<SiTypescript />} title="TypeScript" description="Strict Mode" />
                            <TechItem icon={<FaReact />} title="React" description="Component Era" />
                            <TechItem icon={<SiNextdotjs />} title="Next.js" description="Full Power" />
                            <TechItem icon={<SiTailwindcss />} title="Tailwind" description="Rapid UI" />
                            <TechItem icon={<IoLogoFirebase />} title="Firebase" description="Serverless" />
                            <TechItem icon={<DiMongodb />} title="MongoDB" description="NoSQL" />
                            <TechItem icon={<FaPython />} title="Python" description="Automation" />
                            <TechItem icon={<RiSupabaseFill />} title="Supabase" description="Postgres" />
                            <TechItem icon={<FaBootstrap />} title="Bootstrap" description="Legacy Support" />
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="py-20 bg-neutral-900/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                            
                            {/* Title & Stats */}
                            <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-center lg:text-left">The Log</h2>
                                <p className="text-neutral-400 text-lg text-center lg:text-left mb-8 lg:mb-0">
                                    A history of problems solved and servers kept alive.
                                </p>
                                
                                {/* Pro Stats Card */}
                                <div className="mt-8 p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-white/10 rounded-full"><Activity size={20} /></div>
                                        <div>
                                            <p className="text-xs text-neutral-400">Context Switches</p>
                                            <div className="w-full sm:w-32 h-2 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-yellow-500 w-[90%]"></div>
                                            </div>
                                            <p className="text-[10px] text-yellow-400 mt-1">Dangerously High</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/10 rounded-full"><Server size={20} /></div>
                                        <div>
                                            <p className="text-xs text-neutral-400">Technical Debt</p>
                                            <div className="w-full sm:w-32 h-2 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-green-500 w-[10%]"></div>
                                            </div>
                                            <p className="text-[10px] text-green-400 mt-1">Manageable levels</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="lg:w-2/3 space-y-10">
                                {sortedExperiences.map((exp, index) => (
                                    <motion.div 
                                        key={index}
                                        className="group relative pl-6 md:pl-8 border-l-2 border-neutral-800 hover:border-white transition-colors duration-300"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <span className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-black border-2 border-neutral-600 group-hover:border-white group-hover:bg-white transition-all"></span>
                                        
                                        <div className="mb-2 flex flex-wrap items-center gap-2 md:gap-3">
                                            <h3 className="text-xl md:text-2xl font-bold text-white">{exp.jobTitle}</h3>
                                            <span className="text-[10px] md:text-xs font-mono py-1 px-2 rounded bg-neutral-800 text-neutral-400">
                                                {exp.jobDuration}
                                            </span>
                                        </div>
                                        
                                        <div className="text-sm md:text-lg text-neutral-300 font-medium mb-3">{exp.companyTitle}</div>
                                        
                                        <div className="p-4 md:p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 group-hover:bg-neutral-800/50 transition-colors">
                                            <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                                {exp.description || getRoleDescription(exp.jobTitle, exp.companyTitle)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="work" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="text-center md:text-left w-full">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Shipped Code</h2>
                                <p className="text-neutral-400 text-lg">Projects that survived the "delete later" folder.</p>
                            </div>
                            <a href="https://github.com" target="_blank" className="hidden md:flex items-center gap-2 text-white border-b border-white pb-1 hover:opacity-70 transition-opacity whitespace-nowrap">
                                View Source <ExternalLink size={16} />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {sortedProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-auto"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="h-48 sm:h-56 bg-neutral-800 relative overflow-hidden shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center">
                                            <Code size={48} className="text-neutral-700" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <a href={project.link} target="_blank" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><ExternalLink size={20}/></a>
                                            <a href={project.repoLink} target="_blank" className="p-3 bg-neutral-800 text-white rounded-full hover:scale-110 transition-transform"><Code size={20}/></a>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-neutral-400 text-sm line-clamp-3 mb-6 flex-grow">
                                            {project.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech && project.tech.map((tech, i) => (
                                                <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-neutral-800 rounded-full text-neutral-300">
                                                    {tech.replace(/"/g, '')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Mobile Only Footer Button */}
                        <div className="mt-12 flex justify-center md:hidden">
                             <a href="https://github.com" target="_blank" className="flex items-center gap-2 text-white border-b border-white pb-1 hover:opacity-70 transition-opacity">
                                View Source <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <Footer/>
            </div>
        </div>
    )
}

export default Main;