'use client'
import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';

const BlogUploadForm = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(true);
    
    // Blog form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fullContent, setFullContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [error, setError] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Login error:', error);
            setAuthError(getAuthErrorMessage(error.code));
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getAuthErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later';
            default:
                return 'An error occurred during login';
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(prevImages => [...prevImages, ...files]);
            
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        if (currentImageIndex >= index) {
            setCurrentImageIndex(prev => Math.max(0, prev - 1));
        }
    };

    const nextImage = () => {
        setCurrentImageIndex(prev => 
            prev === imagePreviews.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(prev => 
            prev === 0 ? imagePreviews.length - 1 : prev - 1
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        
        setUploadLoading(true);
        setError(null);

        try {
            // Upload all images
            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `blogImages/${uuidv4()}`);
                    const snapshot = await uploadBytes(imageRef, image);
                    return getDownloadURL(snapshot.ref);
                })
            );

            const blogPost = {
                title,
                description,
                fullContent,
                tags: tags.split(',').map(tag => tag.trim()),
                images: imageUrls,
                createdAt: new Date(),
                authorId: user.uid,
                authorEmail: user.email
            };

            await addDoc(collection(db, 'blogPosts'), blogPost);

            // Reset form
            setTitle('');
            setDescription('');
            setFullContent('');
            setTags('');
            setImages([]);
            setImagePreviews([]);
            setCurrentImageIndex(0);

            alert('Blog post uploaded successfully!');
        } catch (err) {
            console.error('Error uploading blog post:', err);
            setError('Failed to upload blog post. Please try again.');
        } finally {
            setUploadLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="max-w-md w-full bg-neutral-900 p-8 rounded-xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-neutral-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-neutral-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                                required
                            />
                        </div>
                        {authError && (
                            <div className="text-red-500 text-sm">{authError}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-center">Upload Blog Post</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-neutral-300">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-neutral-300">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg h-24"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-neutral-300">Full Content</label>
                        <textarea
                            value={fullContent}
                            onChange={(e) => setFullContent(e.target.value)}
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg h-48"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-neutral-300">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                            placeholder="e.g., React, Web Development, JavaScript"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-neutral-300">Images</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                        />
                        
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 relative">
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <img 
                                        src={imagePreviews[currentImageIndex]} 
                                        alt={`Preview ${currentImageIndex + 1}`}
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(currentImageIndex)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                                
                                {imagePreviews.length > 1 && (
                                    <div className="flex justify-between mt-2">
                                        <button
                                            type="button"
                                            onClick={prevImage}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-neutral-300">
                                            {currentImageIndex + 1} / {imagePreviews.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={nextImage}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-900 text-red-300 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploadLoading}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {uploadLoading ? 'Uploading...' : 'Upload Blog Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogUploadForm;