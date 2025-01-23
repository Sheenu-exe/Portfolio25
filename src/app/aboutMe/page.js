'use client'
import { motion } from 'framer-motion';
import Script from 'next/script';
import { Globe, LinkedinIcon, Instagram, Twitter } from 'lucide-react';
import Carousel from "../components/carroussel";
import Slide1 from "../assets/imgs/slide1.jpeg";
import Slide2 from "@/app/assets/imgs/Slide2.jpg"
import Slide3 from "@/app/assets/imgs/Slide3.jpg"
import Slide4 from "@/app/assets/imgs/Slide4.jpg"
import Slide5 from "@/app/assets/imgs/Slide5.jpg"
import Slide6 from "@/app/assets/imgs/Slide6.jpg"
import Slide7 from "@/app/assets/imgs/Slide7.jpg"
import Slide8 from "@/app/assets/imgs/Slide8.jpg"
import Slide9 from "@/app/assets/imgs/Slide9.jpg"

const SocialMediaSection = () => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Globe className="text-blue-500 w-10 h-10" />
                        <h2 className="text-4xl font-bold text-white">My Digital Footprint</h2>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore my latest updates, thoughts, and professional journey across different social platforms.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Twitter Post */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                        <div className="flex items-center mb-4">
                            <Twitter className="text-blue-400 mr-3 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-white">Twitter</h3>
                        </div>
                        <div className="h-[600px] overflow-hidden rounded-lg">
                            <blockquote className="twitter-tweet">
                                <p lang="en" dir="ltr">💼 Sachin Parihar - Fullstack Developer<br />Here's my journey, skills, and projects—packed into one thread. 🧵👇<br />Open for Opportunity!</p>
                                &mdash; Sachin Parihar (@Sheenu_exe) <a href="https://twitter.com/Sheenu_exe/status/1882304497789317206">January 23, 2025</a>
                            </blockquote>
                            <Script 
                                src="https://platform.twitter.com/widgets.js" 
                                strategy="lazyOnload" 
                            />
                        </div>
                    </div>

                    {/* Instagram Post */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                        <div className="flex items-center mb-4">
                            <Instagram className="text-pink-500 mr-3 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-white">Instagram</h3>
                        </div>
                        <div className="h-[600px] overflow-hidden rounded-lg">
                            <blockquote 
                                className="instagram-media" 
                                data-instgrm-captioned 
                                data-instgrm-permalink="https://www.instagram.com/reel/DEmEDIfTvHk/?utm_source=ig_embed&utm_campaign=loading" 
                                data-instgrm-version="14"
                            >
                                <a href="https://www.instagram.com/reel/DEmEDIfTvHk/?utm_source=ig_embed&utm_campaign=loading">View this post on Instagram</a>
                            </blockquote>
                            <Script 
                                src="//www.instagram.com/embed.js" 
                                strategy="lazyOnload" 
                            />
                        </div>
                    </div>

                    {/* LinkedIn Post */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                        <div className="flex items-center mb-4">
                            <LinkedinIcon className="text-blue-600 mr-3 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-white">LinkedIn</h3>
                        </div>
                        <div className="h-[600px] overflow-hidden rounded-lg">
                            <iframe 
                                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7278346219670638593" 
                                height="600" 
                                width="100%" 
                                className="border-none" 
                                allowFullScreen 
                                title="Embedded LinkedIn post"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const AboutMe = () => {
    const slides = [
        { image: Slide1 },
        { image: Slide2 },
        { image: Slide3 },
        { image: Slide4 },
        { image: Slide5 },
        { image: Slide6 },
        { image: Slide7 },
        { image: Slide8 },
        { image: Slide9 },
    ];

    return (
        <div className="bg-black w-full text-white min-h-screen flex justify-center items-center flex-col">
            <div className="container px-4 sm:px-6 py-8 sm:py-12 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 sm:mb-8">
                        About Me
                    </h1>
                    
                    <p className="text-base sm:text-lg font-light text-gray-300 mb-8 sm:mb-10 leading-relaxed">
                        I'm Sachin Parihar, a highly motivated and results-oriented aspiring Front-End Developer 
                        with a passion for building user-friendly and responsive web experiences. I am currently 
                        a 19-year-old BCA student at Manipal University Jaipur and I'm proficient in HTML, CSS, 
                        JavaScript, React, Next.js, Tailwind CSS, and Firebase. Through my internship experience, 
                        I spearheaded the development of a comprehensive web project, taking ownership of the 
                        frontend codebase and delivering seamless user experiences. I am eager to learn and 
                        contribute to a collaborative team environment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full"
                >
                    <Carousel 
                        items={slides} 
                        visibleItems={{
                            mobile: 1,
                            tablet: 2,
                            desktop: 4
                        }}
                        autoPlay 
                        interval={4000} 
                    />
                </motion.div>
            </div>
            
            <SocialMediaSection />
        </div>
    )
}

export default AboutMe;