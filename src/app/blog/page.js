'use client'
import "../globals.css";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { ExternalLink, BookOpen } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";

const BlogDetail = ({ post, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-white text-2xl hover:text-neutral-400"
                >
                    ✕
                </button>
                
                {/* Blog Post Image */}
                {post.image && (
                    <div className="mb-10 relative w-full h-[60vh]">
                        <Image 
                            src={post.image} 
                            alt={post.title}
                            fill
                            className="object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                )}

                <h1 className="text-5xl font-bold text-white mb-5 leading-tight">{post.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags && post.tags.map((tag, tagIndex) => (
                        <span 
                            key={tagIndex} 
                            className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1.5 rounded-full"
                        >
                            {tag.replace(/"/g, '').trim()}
                        </span>
                    ))}
                </div>
                <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
                </div>
            </div>
        </div>
    );
};

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
        });

        if (typeof window !== "undefined") {
            const fetchBlogPosts = async () => {
                try {
                    const blogPostsRef = collection(db, 'blogPosts');
                    const snapshot = await getDocs(blogPostsRef);
                    const blogPostsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setBlogPosts(blogPostsData);
                } catch (error) {
                    console.error('Error fetching blog posts: ', error);
                }
            };
            
            fetchBlogPosts(); 
        }
    }, []); 

    const handlePostClick = async (postId) => {
        try {
            const postRef = doc(db, 'blogPosts', postId);
            const postSnap = await getDoc(postRef);
            
            if (postSnap.exists()) {
                setSelectedPost({ id: postSnap.id, ...postSnap.data() });
            }
        } catch (error) {
            console.error('Error fetching post details: ', error);
        }
    };
    
    return (
        <div className="bg-black w-full text-white min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                        Crafting Digital Narratives
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                        Exploring the intersections of technology, creativity, and innovation through thoughtful writing and deep insights.
                    </p>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1 
                            }}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                            onClick={() => handlePostClick(post.id)}
                        >
                            {post.image && (
                                <div className="relative w-full h-48">
                                    <Image 
                                        src={post.image} 
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-semibold text-white">
                                        {post.title}
                                    </h2>
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 hover:text-white"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                                <p className="text-neutral-400 mb-4">
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags && post.tags.map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex} 
                                            className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag.replace(/"/g, '').trim()}
                                        </span>
                                    ))}
                                </div>
                                <button 
                                    className="mt-4 flex items-center text-neutral-400 hover:text-white transition"
                                    onClick={() => handlePostClick(post.id)}
                                >
                                    <BookOpen size={16} className="mr-2" />
                                    Read Full Post
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Blog Post Detail Modal */}
            {selectedPost && (
                <BlogDetail 
                    post={selectedPost} 
                    onClose={() => setSelectedPost(null)} 
                />
            )}

<section className="h-[10vh] w-full">

</section>
        </div>
    )
}

export default Blog;