'use client'
import "../globals.css";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { Code } from "lucide-react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Hero from "../assets/imgs/hero-section5.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const sortedExperiences = experiences.sort((a, b) => parseInt(a.index) - parseInt(b.index));
    
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
                <div className="sm:w-[85vw]">
                    <h1 
                        className="sm:text-6xl text-4xl font-extralight tracking-tight mb-2 mx-5 sm:mx-0"
                    >
                        Sachin Parihar
                    </h1>
                    <p 
                        className="sm:text-3xl text-xl text-neutral-300 mb-2 mx-5 sm:mx-0"
                    >
                        Fullstack Developer Based in Pune
                    </p>
                    <p 
                        className="sm:text-xl text-neutral-500 max-w-2xl mx-5 sm:mx-0"
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
            <section 
                id="tech-stack" 
                className="container w-full min-h-screen flex justify-center items-center flex-col py-16"
            >
                <h2 
                    className="text-5xl font-light text-center mb-16"
                    data-aos="fade-up"
                >
                    Tech Stack
                </h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {[
                        'HTML', 'CSS', 'JavaScript', 'React.JS', 
                        'Firebase', 'Supabase', 'MongoDB', 
                        'Tailwind', 'Bootstrap', 'OpenAI API', 
                        'Next.JS', 'Node.JS'
                    ].map((tech, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center group"
                            data-aos="flip-left"
                            data-aos-delay={index * 100}
                        >
                            <p className="text-xl text-neutral-300 font-medium group-hover:text-white transition-colors">
                                {tech}
                            </p>
                        </div>
                    ))}
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