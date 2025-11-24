'use client'
import "../globals.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { ExternalLink, BookOpen, X, Calendar, Clock, Search, Hash, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
// --- STYLES ---
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
  
  /* Prose Styles for the Blog Content */
  .prose-invert h1, .prose-invert h2, .prose-invert h3 { color: #fff; font-weight: 700; letter-spacing: -0.025em; }
  .prose-invert p { color: #a3a3a3; line-height: 1.8; }
  .prose-invert a { color: #3b82f6; text-decoration: none; border-bottom: 1px solid rgba(59, 130, 246, 0.3); transition: border-color 0.2s; }
  .prose-invert a:hover { border-bottom-color: #3b82f6; }
  .prose-invert code { background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 0.25em; color: #e2e8f0; font-family: monospace; }
  .prose-invert pre { background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; }
  .prose-invert img { border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1); }
`;

// --- COMPONENT: BLOG DETAIL MODAL ---
const BlogDetail = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>

            {/* Modal Content */}
            <motion.div 
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header / Actions */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                    <div className="pointer-events-auto">
                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="overflow-y-auto custom-scrollbar h-full">
                    {/* Hero Image */}
                    {post.image && (
                        <div className="relative w-full h-[40vh] sm:h-[50vh]">
                            <Image 
                                src={post.image} 
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                        </div>
                    )}

                    <div className="px-6 sm:px-10 pb-20 -mt-20 relative z-10">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags && post.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
                                    #{tag.replace(/"/g, '').trim()}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        {/* Metadata */}
                        <div className="flex items-center gap-6 text-neutral-400 text-sm font-mono mb-10 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                <span>{new Date().toLocaleDateString()}</span> {/* Replace with real date if available */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <span>5 min read</span> {/* You can calc this based on word count */}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE ---
const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const fetchBlogPosts = async () => {
                try {
                    const blogPostsRef = collection(db, 'blogPosts');
                    const snapshot = await getDocs(blogPostsRef);
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setBlogPosts(data);
                    setFilteredPosts(data);
                } catch (error) {
                    console.error('Error fetching blog posts: ', error);
                }
            };
            fetchBlogPosts(); 
        }
    }, []); 

    // Search Logic
    useEffect(() => {
        const filtered = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        );
        setFilteredPosts(filtered);
    }, [searchQuery, blogPosts]);

    const handlePostClick = async (postId) => {
        try {
            const postRef = doc(db, 'blogPosts', postId);
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                setSelectedPost({ id: postSnap.id, ...postSnap.data() });
                // Disable background scroll
                document.body.style.overflow = 'hidden';
            }
        } catch (error) { console.error(error); }
    };

    const closePost = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'unset';
    }
    
    return (
        <div className="bg-[#050505] w-full text-white min-h-screen relative overflow-hidden selection:bg-purple-500/30">
            <style>{scrollbarStyles}</style>

            {/* Background Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400 mb-6">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        <span>System Logs & Rants</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.9]">
                        The Brain <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                            Dump.
                        </span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-xl mx-auto">
                        I write things down so I don't have to remember them. Tutorials, hot takes, and documentation of my struggles.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-md"></div>
                        <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center p-2">
                            <div className="p-3 text-neutral-500">
                                <Search size={20} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search for 'React', 'Bugs', or 'Regrets'..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white placeholder-neutral-600 h-full py-2"
                            />
                            <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-xs text-neutral-500 font-mono">
                                <span>CTRL</span><span>+</span><span>K</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => handlePostClick(post.id)}
                            >
                                <div className="relative h-[420px] bg-neutral-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col">
                                    
                                    {/* Image Area */}
                                    <div className="relative h-1/2 w-full overflow-hidden">
                                        {post.image ? (
                                            <Image 
                                                src={post.image} 
                                                alt={post.title} 
                                                fill 
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                                                <Hash size={40} className="text-neutral-700" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        
                                        {/* Date Badge */}
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white">
                                            {new Date().toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col justify-between h-1/2">
                                        <div>
                                            <div className="flex gap-2 mb-3">
                                                {post.tags && post.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                                                        {tag.replace(/"/g, '')}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-neutral-400 line-clamp-2">
                                                {post.description || "Click to read more about this topic..."}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                                                <Clock size={12} /> 5 min read
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                            <Search size={32} className="text-neutral-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No Results Found</h3>
                        <p className="text-neutral-400">Try searching for something less specific.</p>
                    </div>
                )}
            </div>
            
            {/* Blog Post Detail Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <BlogDetail 
                        post={selectedPost} 
                        onClose={closePost} 
                    />
                )}
            </AnimatePresence>

            <section className="h-[10vh] w-full"></section>
        </div>
    )
}

export default Blog;