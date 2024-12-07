'use client'
import { motion } from 'framer-motion';
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
            <div className="container h-screen flex mt-12 flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl font-semibold tracking-tight mb-4 mx-5">
                        About Me
                    </h1>
                    
                    <p className="text-lg font-light text-gray-300 mb-5 mx-5">
                    I'm Sachin Parihar, a highly motivated and results-oriented aspiring Front-End Developer with a passion for building user-friendly and responsive web experiences. I am currently a 19-year-old BCA student at Manipal University Jaipur and I'm proficient in HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, and Firebase. Through my internship experience, I spearheaded the development of a comprehensive web project, taking ownership of the frontend codebase and delivering seamless user experiences. I am eager to learn and contribute to a collaborative team environment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Carousel 
                        items={slides} 
                        visibleItems={4} 
                        autoPlay 
                        interval={4000} 
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default AboutMe;