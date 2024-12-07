'use client'
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';

const BlogUploadForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fullContent, setFullContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Upload image to Firebase Storage
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `blogImages/${uuidv4()}`);
                const snapshot = await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            // Prepare blog post data
            const blogPost = {
                title,
                description,
                fullContent,
                tags: tags.split(',').map(tag => tag.trim()),
                image: imageUrl,
                createdAt: new Date()
            };

            // Add to Firestore
            const docRef = await addDoc(collection(db, 'blogPosts'), blogPost);

            // Reset form
            setTitle('');
            setDescription('');
            setFullContent('');
            setTags('');
            setImage(null);
            setImagePreview(null);

            alert('Blog post uploaded successfully!');
        } catch (err) {
            console.error('Error uploading blog post:', err);
            setError('Failed to upload blog post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-xl">
                <h1 className="text-4xl font-bold mb-8 text-center">Upload Blog Post</h1>
                
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
                        <label className="block mb-2 text-neutral-300">Featured Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full bg-neutral-800 text-white p-3 rounded-lg"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="max-w-full h-auto rounded-lg"
                                />
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
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Uploading...' : 'Upload Blog Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogUploadForm;