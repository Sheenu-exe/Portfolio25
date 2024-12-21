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

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const sortedExperiences = experiences.sort((a, b) => parseInt(a.index) - parseInt(b.index));
    
    const techCategories = [
        {
            title: "Frontend",
            icon: <Globe className="w-6 h-6 mb-2" />,
            technologies: [
                { name: "HTML", level: "Advanced" },
                { name: "CSS", level: "Advanced" },
                { name: "JavaScript", level: "Advanced" },
                { name: "React.JS", level: "Advanced" },
                { name: "Next.JS", level: "Advanced" }
            ],
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "Backend & Database",
            icon: <Database className="w-6 h-6 mb-2" />,
            technologies: [
                { name: "Firebase", level: "Advanced" },
                { name: "Supabase", level: "Intermediate" },
                { name: "MongoDB", level: "Advanced" },
                { name: "Node.JS", level: "Advanced" }
            ],
            color: "from-green-500/20 to-emerald-500/20"
        },
        {
            title: "Styling",
            icon: <Palette className="w-6 h-6 mb-2" />,
            technologies: [
                { name: "Tailwind", level: "Advanced" },
                { name: "Bootstrap", level: "Advanced" }
            ],
            color: "from-purple-500/20 to-pink-500/20"
        },
        {
            title: "AI Integration",
            icon: <Brain className="w-6 h-6 mb-2" />,
            technologies: [
                { name: "OpenAI API", level: "Intermediate" }
            ],
            color: "from-orange-500/20 to-red-500/20"
        }
    ];

    useEffect(() => {
        // Initialize AOS
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
            <div 
                className="container h-screen mt-5 flex flex-col justify-center items-center sm:justify-center sm:items-center"
            >
                <div className="sm:w-[85vw] flex sm:flex-row flex-col">
                    <div>
                    <p className="sm:mx-1 mx-5">Hey there, Its</p>
                    <h1 
                        className="sm:text-6xl text-5xl font-bold tracking-tight my-2 mx-5 sm:mx-0"
                    >
                        Sachin Parihar
                    </h1>
                    <p 
                        className="sm:text-3xl text-xl text-neutral-300 mb-2 mx-5 sm:mx-0"
                    >
                        Fullstack Developer Based in Pune
                    </p>
                    </div>
                    <p 
                        className="sm:text-2xl text-neutral-500 max-w-2xl mx-5 sm:text-end sm:mx-0"
                    >
                        Crafting digital experiences that blur the lines between design, technology, and human interaction.
                    </p>
                </div>
                <Image 
                    src={Hero} 
                    alt="heroImg" 
                    className="h-[58vh] my-9 rounded-md sm:w-[85vw] object-cover object-top w-[90%]"
                />
            </div>

            {/* Tech Stack Section */}
            <section id="tech-stack" className="container w-full min-h-screen flex justify-center items-center flex-col py-8 sm:py-16 px-3 sm:px-4">
                <div className="max-w-6xl w-full">
                    <h2 className="text-4xl sm:text-5xl font-light text-center mb-8 sm:mb-16" data-aos="fade-up">
                        Tech Stack
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {techCategories.map((category, index) => (
                            <div
                                key={index}
                                className="relative group"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.color} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative bg-neutral-900/80 border border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full backdrop-blur-sm">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                        {category.icon}
                                        <h3 className="text-xl sm:text-2xl font-medium">{category.title}</h3>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4">
                                        {category.technologies.map((tech, techIndex) => (
                                            <div
                                                key={techIndex}
                                                className="group/tech flex justify-between items-center p-2 sm:p-3 rounded-lg hover:bg-neutral-800/50 transition-colors"
                                            >
                                                <span className="text-base sm:text-lg text-neutral-300 group-hover/tech:text-white">
                                                    {tech.name}
                                                </span>
                                                <span className="text-xs sm:text-sm text-neutral-500 group-hover/tech:text-neutral-300">
                                                    {tech.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section 
                id="experience" 
                className="container mx-auto px-6 py-16"
                data-aos="fade-up"
            >
                <h2 
                    className="text-4xl font-light text-center mb-12"
                    data-aos="fade-down"
                >
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
            <section 
                id="work" 
                className="container min-h-screen flex flex-col items-center"
                data-aos="fade-up"
            >
                <h2 
                    className="text-4xl font-light text-center mb-12"
                    data-aos="fade-down"
                >
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 justify-items-center w-[85vw]">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 group overflow-hidden relative w-[95%] max-w-md min-h-[25vh] h-fit"
                            data-aos="zoom-in"
                            data-aos-delay={index * 200}
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
                        </div>
                    ))}
                </div>
            </section>
            <section className="h-[10vh] w-full">

            </section>
        </div>
    )
}

export default Main;