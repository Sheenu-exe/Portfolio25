'use client'
import "../globals.css";
import { useState } from "react";
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, ExternalLink } from 'lucide-react';
import { db } from "../firebase.config";
import { collection } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';
import { useEffect } from "react";
import Computer from "../assets/imgs/comp.gif"
import Image from 'next/image';
const Main = () => {
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
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

        fetchProjects();
    }, []);
    return (
        <div className="bg-black w-full text-white min-h-screen">
            {/* Hero Section */}
            <div className="container   sm:h-[60vh] h-screen text-center flex justify-center items-center flex-col">
                <Image className="h-[40vh] w-auto" src={Computer} alt="" />
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

            {/* Projects Section */}
            <section id="work" className="container mx-auto px-6 py-16">
                <motion.h2 initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} className="text-4xl font-light text-center mb-12">
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