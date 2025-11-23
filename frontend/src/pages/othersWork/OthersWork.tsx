import { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./OthersWork.css";

export type TagType = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

interface Post {
    id: string;
    title: string;
    description: string;
    tag?: TagType;
    fileUrl?: string;
    userId: string;
    username?: string;
    hubId?: string | null;
}

const OthersWork = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = localStorage.getItem("userId");
    const currentHubId = localStorage.getItem("hubId");

    useEffect(() => {
        if (!currentHubId) {
            console.error("Hub ID not found in localStorage");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/api/posts/hub/${currentHubId}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load hub posts");
                return res.json();
            })
            .then(data => {
                const filtered = data.filter((p: Post) => p.userId !== currentUserId);
                setPosts(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentHubId, currentUserId]);

    const getTagClass = (tag?: TagType) => {
        if (!tag) return "";
        return `tag-${tag.toLowerCase()}`;
    };

    return (
        <>
            <NavBar />
            <div className="others-work-page">
                <div className="page-header">
                    <div className="header-icon">👥</div>
                    <h1 className="page-title">Community Work</h1>
                    <p className="page-subtitle">
                        Discover what your colleagues are creating
                    </p>
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading posts...</p>
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No posts yet</h3>
                        <p>Be the first to share your work with the community!</p>
                    </div>
                )}

                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-card-header">
                                <div className="author-info">
                                    <div className="author-avatar">
                                        {post.username ? post.username[0].toUpperCase() : "?"}
                                    </div>
                                    <div className="author-details">
                                        <span className="author-name">
                                            {post.username || "Unknown"}
                                        </span>
                                        {post.tag && (
                                            <span className={`post-tag ${getTagClass(post.tag)}`}>
                                                {post.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="post-card-body">
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-description">{post.description}</p>
                            </div>

                            {post.fileUrl && (
                                <div className="post-card-footer">
                                    <a
                                        href={post.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-file-btn"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                        </svg>
                                        View File
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OthersWork;