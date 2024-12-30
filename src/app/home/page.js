'use client'
import "../globals.css";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { Code, ExternalLink } from "lucide-react";
import { Globe, Database, Palette, Brain } from "lucide-react";
import Image from "next/image";
import Hero from "../assets/imgs/hero-section5.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AiOutlineHtml5 } from "react-icons/ai";
import { TbBrandCss3 } from "react-icons/tb";
import { TbBrandJavascript } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { IoLogoFirebase } from "react-icons/io5";
import { RiSupabaseFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const sortedExperiences = experiences.sort((a, b) => parseInt(a.index) - parseInt(b.index));
    const sortedProjects = projects.sort((a, b) => parseInt(a.index) - parseInt(b.index));
    
    const TechStackItem = ({ icon, title, description, skillLevel }) => {
        return (
            <motion.div 
                className="flex flex-col items-center p-4"
                whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                }}
                viewport={{ once: true }}
            >
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                >
                    {icon}
                </motion.div>
                <h3 className="my-3 text-3xl font-semibold">{title}</h3>
                <div className="w-full">
                    <div className="h-2 w-full bg-gray-700 rounded-full">
                        <motion.div 
                            className="h-full bg-gray-200 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ 
                                width: skillLevel === "Advanced" ? "90%" : 
                                       skillLevel === "Intermediate" ? "65%" : "40%"
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                    </div>
                    <p className="text-gray-400 mt-2 text-sm text-center">{skillLevel}</p>
                </div>
            </motion.div>
        );
    }

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
        });

        if (typeof window !== "undefined") {
            const fetchProjects = async () => {
                try {
                    const projectsRef = collection(db, 'projects');
                    const snapshot = await getDocs(projectsRef);
                    const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setProjects(projectsData);
                } catch (error) {
                    console.error('Error fetching projects: ', error);
                }
            };

            const fetchExperiences = async () => {
                try {
                    const experiencesRef = collection(db, 'experiences');
                    const snapshot = await getDocs(experiencesRef);
                    const experiencesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setExperiences(experiencesData);
                } catch (error) {
                    console.error('Error fetching experiences: ', error);
                }
            };
            
            fetchProjects(); 
            fetchExperiences();
        }
    }, []); 
    
    return (
        <div className="bg-black w-full text-white min-h-screen flex justify-center items-center flex-col">
            {/* Hero Section */}
            <div className="container h-screen mt-5 flex flex-col justify-center items-center sm:justify-center sm:items-center">
                <motion.div 
                    className="sm:w-[85vw] flex sm:flex-row flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <p className="sm:mx-1 mx-5">Hey there, Its</p>
                        <h1 className="sm:text-6xl text-5xl font-bold tracking-tight my-2 mx-5 sm:mx-0">
                            Sachin Parihar
                        </h1>
                        <p className="sm:text-3xl text-xl text-neutral-300 mb-2 mx-5 sm:mx-0">
                            Fullstack Developer Based in Pune
                        </p>
                    </div>
                    <p className="sm:text-2xl text-neutral-500 max-w-2xl mx-5 sm:text-end sm:mx-0">
                        Crafting digital experiences that blur the lines between design, technology, and human interaction.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 0.2 }}
                >
                    <Image 
                        src={Hero} 
                        alt="heroImg" 
                        className="h-[58vh] my-9 rounded-md sm:w-[85vw] object-cover object-top w-[90%]"
                    />
                </motion.div>
            </div>

            {/* Tech Stack Section */}
            <div id="techstack" className="h-fit w-full">
                <section className="bg-black py-5 flex flex-col justify-center items-center w-full text-gray-100 h-fit">
                    <motion.div 
                        className="container p-4 space-y-2 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-5xl font-bold">Tech Stack</h2>
                        <p className="text-gray-400">To make me a superhero</p>
                    </motion.div>
                    <div className="container mx-auto grid justify-center gap-7 sm:grid-cols-4">
                        <TechStackItem icon={<AiOutlineHtml5 className="w-12 h-12 text-white"/>} title="HTML" description="The standard markup language for creating web pages." skillLevel="Advanced" />
                        <TechStackItem icon={<TbBrandCss3 className="w-12 h-12 text-white"/>} title="CSS" description="The language used for describing the presentation of web pages." skillLevel="Intermediate" />
                        <TechStackItem icon={<TbBrandJavascript className="w-12 h-12 text-white"/>} title="JavaScript" description="A programming language that enables interactive web pages." skillLevel="Advanced" />
                        <TechStackItem icon={<SiTypescript className="w-12 h-12 text-white"/>} title="TypeScript" description="A superset of JavaScript that adds static typing." skillLevel="Intermediate" />
                        <TechStackItem icon={<FaReact className="w-12 h-12 text-white"/>} title="React.js" description="A JavaScript library for building user interfaces." skillLevel="Advanced" />
                        <TechStackItem icon={<FaBootstrap className="w-12 h-12 text-white"/>} title="Bootstrap" description="A CSS framework for developing responsive and mobile-first websites." skillLevel="Intermediate" />
                        <TechStackItem icon={<SiTailwindcss className="w-12 h-12 text-white"/>} title="Tailwind CSS" description="A utility-first CSS framework for building custom designs." skillLevel="Intermediate" />
                        <TechStackItem icon={<SiNextdotjs className="w-12 h-12 text-white"/>} title="Next.js" description="A React framework for building production-ready applications." skillLevel="Intermediate" />
                        <TechStackItem icon={<DiMongodb className="w-12 h-12 text-white"/>} title="MongoDB" description="A NoSQL database for storing and retrieving data." skillLevel="Intermediate" />
                        <TechStackItem icon={<IoLogoFirebase className="w-12 h-12 text-white"/>} title="Firebase" description="A platform for building web and mobile applications without managing infrastructure." skillLevel="Advanced" />
                        <TechStackItem icon={<RiSupabaseFill className="w-12 h-12 text-white"/>} title="Supabase" description="An open-source alternative to Firebase." skillLevel="Intermediate" />
                        <TechStackItem icon={<FaPython className="w-12 h-12 text-white"/>} title="Python" description="A programming language used for web development, data science, and more." skillLevel="Advanced" />
                    </div>
                </section>
            </div>

            {/* Experience Section */}
            <section id="experience" className="container mx-auto px-6 py-16">
                <h2 className="text-4xl font-light text-center mb-12">
                    Professional Experience
                </h2>
                <div className="relative max-w-2xl mx-auto before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-neutral-800">
                    {sortedExperiences.map((experience, index) => (
                        <div
                            key={index}
                            className="relative pl-16 pb-12 group"
                            data-aos="fade-right"
                            data-aos-delay={index * 200}
                        >
                            <div className="absolute w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-full -left-0 top-0 flex items-center justify-center">
                                <span className="text-neutral-400 text-xs">{experience.index}</span>
                            </div>
                            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-medium text-white">
                                        {experience.jobTitle}
                                    </h3>
                                    <span className="text-sm text-neutral-400">
                                        {experience.jobDuration}
                                    </span>
                                </div>
                                <p className="text-neutral-400 text-sm mb-2">
                                    {experience.companyTitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="work" className="container min-h-screen flex flex-col items-center">
                <h2 className="text-4xl font-light text-center mb-12">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 justify-items-center w-[85vw]">
                    {sortedProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 group overflow-hidden relative w-[95%] max-w-md min-h-[25vh] h-fit"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute top-0 right-0 m-4 flex space-x-2">
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-500 hover:text-white"
                                >
                                    <Code size={20} />
                                </a>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-500 hover:text-white"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-medium text-white mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-400 text-sm">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech && project.tech.map((tech, techIndex) => (
                                    <span 
                                        key={techIndex} 
                                        className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full"
                                    >
                                        {tech.replace(/"/g, '').trim()}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <section className="h-[10vh] w-full" />
        </div>
    )
}

export default Main;