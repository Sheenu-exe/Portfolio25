'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- 3D TILT CARD COMPONENT ---
const Card3D = ({ item, index }) => {
    const ref = useRef(null);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement using springs
    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 15 });

    // Calculate rotation based on mouse position relative to card center
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
    
    // Parallax for the image (moves opposite to card tilt)
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

    // Glare/Sheen effect position
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate percentage (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[400px] rounded-3xl bg-neutral-900/80 border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing group perspective-1000"
        >
            {/* Moving Image Layer (Parallax) */}
            <motion.div 
                style={{ x: imageX, y: imageY, scale: 1.1 }}
                className="absolute inset-0 w-full h-full"
            >
                <Image 
                    src={item.image} 
                    alt={item.content || "Gallery Image"} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-500"
                    priority={index < 2}
                />
            </motion.div>

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

            {/* Content Caption */}
            {item.content && (
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <p className="text-white font-bold text-lg drop-shadow-md">{item.content}</p>
                </div>
            )}

            {/* --- THE CRAZY STUFF: LIGHTING EFFECTS --- */}
            
            {/* 1. Dynamic Glare (The shiny reflection) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"
                 style={{
                     background: `radial-gradient(circle at ${glareX.get() || '50%'} ${glareY.get() || '50%'}, rgba(255,255,255,0.15), transparent 60%)`
                 }}
            />

            {/* 2. Neon Border Glow on Hover */}
            <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-colors duration-300 pointer-events-none z-40 ring-0 group-hover:ring-1 group-hover:ring-white/10" />
            
            {/* 3. Noise Texture Overlay (Aesthetic) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-10" />

        </motion.div>
    );
};

const Carousel = ({ items = [], autoPlay = false, interval = 3000, className = '' }) => {
    const [visibleItems, setVisibleItems] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleItems(1); 
            } else if (window.innerWidth < 1024) {
                setVisibleItems(2); 
            } else {
                setVisibleItems(3); // 3 large items for better 3D effect
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ensure itemsPerSlide never exceeds the total number of items
    const itemsPerSlide = Math.min(visibleItems, items.length || 1);

    const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
        items: items.map((item, index) => ({
            id: `card-${index}`,
            renderItem: (
                <div className="w-full h-full px-3 py-4" style={{ perspective: "1000px" }}>
                    <Card3D item={item} index={index} />
                </div>
            ),
        })),
        itemsPerSlide: itemsPerSlide,
        withLoop: true,
    });

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            slideToNextItem();
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, slideToNextItem]);

    return (
        <div className={`relative w-full ${className}`}>
            
            {/* The Carousel Track */}
            <div className="overflow-visible -mx-4">
                {carouselFragment}
            </div>

            {/* Navigation Buttons - Floating, Glass, & Magnetic Hover */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-0 z-50">
                <button
                    onClick={slideToPrevItem}
                    className="pointer-events-auto group h-14 w-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-white hover:text-black hover:border-white shadow-2xl -ml-2 sm:-ml-6"
                >
                    <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
                </button>
                
                <button
                    onClick={slideToNextItem}
                    className="pointer-events-auto group h-14 w-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-white hover:text-black hover:border-white shadow-2xl -mr-2 sm:-mr-6"
                >
                    <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;