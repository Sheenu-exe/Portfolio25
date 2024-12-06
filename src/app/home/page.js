'use client'
import "../globals.css";
import { useState } from "react";
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, ExternalLink, Briefcase } from 'lucide-react';
import { db } from "../firebase.config";
import { collection } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';
import { useEffect } from "react";
import Computer from "../assets/imgs/comp.gif"
import Image from 'next/image';
import { 
   
    Css3, 
    Database, 
    Cloud, 
    Layers, 
    Rocket, 
    type, 
    Chrome, 
    Server, 
    Terminal,
    Braces,
    Palette
} from 'lucide-react';

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const sortedExperiences = experiences.sort((a, b) => parseInt(a.index) - parseInt(b.index));

    
    useEffect(() => {
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
            <div className="container h-screen text-center flex justify-center items-center flex-col">
                <Image className="h-[50vh] w-auto" src={Computer} alt="" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl font-extralight tracking-tight mb-4">
                        Sachin Parihar
                    </h1>
                    <p className="text-3xl text-neutral-400 mb-4">
                        Fullstack Developer Based in Pune
                    </p>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        Crafting digital experiences that blur the lines between design, technology, and human interaction.
                    </p>
                </motion.div>
            </div>
            {/* Tech Stack Section - Add this before the Experience Section */}
<section id="tech-stack" className="container mx-auto px-6 py-16">
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} 
        className="text-4xl font-light text-center mb-12"
    >
        Tech Stack
    </motion.h2>
    <div className="grid md:grid-cols-4 grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[
            'HTML', 'CSS', 'JavaScript', 'React.JS', 
            'Firebase', 'Supabase', 'MongoDB', 
            'Tailwind', 'Bootstrap', 'OpenAI API', 
            'Next.JS', 'Node.JS'
        ].map((tech, index) => (
            <motion.div
                key={index}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: index * 0.1,
                    duration: 0.6
                }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                }}
            >
                <p className="text-neutral-300 font-medium group-hover:text-white transition-colors">
                    {tech}
                </p>
            </motion.div>
        ))}
    </div>
</section>
            {/* Experience Section */}
           

<section id="experience" className="container mx-auto px-6 py-16">
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} 
        className="text-4xl font-light text-center mb-12"
    >
        Professional Experience
    </motion.h2>
    <div className="relative max-w-2xl mx-auto before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-neutral-800">
        {sortedExperiences.map((experience, index) => (
            <motion.div
                key={index}
                className="relative pl-16 pb-12 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: index * 0.2,
                    duration: 0.6
                }}
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
            </motion.div>
        ))}
    </div>
</section>
            {/* Projects Section */}
            <section id="work" className="container mx-auto px-6 py-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} 
                    className="text-4xl font-light text-center mb-12"
                >
                    Projects
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 group overflow-hidden max-h-fit relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.2,
                                duration: 0.6
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="absolute top-0 right-0 m-4 flex space-x-2">
                                <motion.a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }}
                                    className="text-neutral-500 hover:text-white"
                                >
                                    <Code size={20} />
                                </motion.a>
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }}
                                    className="text-neutral-500 hover:text-white"
                                >
                                    <ExternalLink size={20} />
                                </motion.a>
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
        </div>
    )
}

export default Main;