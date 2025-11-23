import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { IHighlight } from "react-pdf-highlighter";
import PdfReviewer from '../components/PdfReviewer.tsx';
import { CommentSidebar } from '../components/CommentSidebar.tsx';
import NavBar from '../components/NavBar.tsx';
import './PostPage.css';

interface PostDetails {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    username: string;
    tag: string;
    createdAt: string;
}

const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<PostDetails | null>(null);
    const [loading, setLoading] = useState(true);

    // Interaction States
    const [highlights, setHighlights] = useState<IHighlight[]>([]);
    const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

    useEffect(() => {
        if (!postId) return;
        const fetchPost = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 403 || response.status === 401) {
                    navigate('/login');
                    return;
                }
                if (!response.ok) throw new Error('Failed to fetch post details');

                const data: PostDetails = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, navigate]);

    if (loading) return <div className="text-white p-8 text-center">Loading Document...</div>;
    if (!post) return <div className="text-white p-8 text-center">Post not found</div>;

    const absoluteFileUrl = `http://localhost:8080${post.fileUrl}`;

    return (
        <div className="flex flex-column h-screen">
            <NavBar />

            <div className="pp-wrapper">
                {/* TOOLBAR */}
                <div className="pp-toolbar">
                    <div className="flex align-items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 border-circle hover:bg-white-alpha-10 text-gray-400 border-none bg-transparent cursor-pointer flex align-items-center justify-content-center mr-3"
                        >
                            <i className="pi pi-arrow-left text-xl" />
                        </button>
                    </div>

                    <div className="pp-meta-center">
                        <h1 className="pp-post-title">{post.title}</h1>
                        <span className="text-sm text-gray-400">{post.description}</span>
                    </div>

                    <div className="flex align-items-center gap-3">
                        <div className="flex align-items-center gap-2 bg-white-alpha-5 px-3 py-1 border-round-2xl border-1 border-gray-800">
                            <i className="pi pi-user text-xs text-indigo-400" />
                            <span className="text-sm text-gray-300 font-medium">{post.username}</span>
                        </div>
                    </div>
                </div>

                {/* WORKSPACE */}
                <div className="pp-workspace">

                    {/* PDF AREA */}
                    <div className="pp-pdf-area">
                        <PdfReviewer
                            fileUrl={absoluteFileUrl}
                            highlights={highlights}
                            activeId={activeHighlightId}
                            onNewComment={(newHighlight) => {
                                setHighlights(prev => [...prev, newHighlight]);
                                setActiveHighlightId(newHighlight.id);
                            }}
                            onHighlightClick={(id) => setActiveHighlightId(id)}
                        />
                    </div>

                    {/* SIDEBAR */}
                    <CommentSidebar
                        highlights={highlights}
                        activeId={activeHighlightId}
                        onCommentClick={setActiveHighlightId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostPage;