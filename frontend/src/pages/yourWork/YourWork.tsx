import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import NewPostModal from "../../components/NewPostModal.tsx";
import NavBar from "../../components/navbar/NavBar.tsx";
import { useNavigate } from "react-router-dom";

import "./YourWork.css";

interface Post {
    id: string;
    title: string;
    description: string;
    tag?: TagType;
    fileUrl?: string;
    userId: string;
    hubId?: string | null;
}

export type TagType = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

const YourWork = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to fetch posts
    const fetchPosts = () => {
        const userStr = localStorage.getItem("user");
        const userData = userStr ? JSON.parse(userStr) : null;
        const currentUserId = userData?.userId;

        if (!currentUserId) {
            console.error("User ID not found. Are you logged in?");
            return;
        }

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/posts/user/${currentUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch posts");
                return res.json();
            })
            .then(data => {
                console.log("Fetched posts:", data);
                setPosts(data);
            })
            .catch(err => console.error("Error fetching posts:", err));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleNewPost = (formData: FormData) => {
        const userStr = localStorage.getItem("user");
        const userData = userStr ? JSON.parse(userStr) : null;
        const currentUserId = userData?.userId;
        const token = localStorage.getItem("token");

        if (!currentUserId) {
            alert("User not logged in");
            return;
        }

        if (!token) {
            alert("No authentication token found");
            return;
        }

        formData.append("userId", currentUserId);
        setLoading(true);

        console.log("Uploading post for user:", currentUserId);

        fetch("http://localhost:8080/api/posts/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
                // DO NOT set Content-Type when sending FormData
            },
            body: formData
        })
            .then(res => {
                console.log("Upload response status:", res.status);
                if (!res.ok) {
                    return res.text().then(text => {
                        console.error("Upload failed with response:", text);
                        throw new Error(text || "Failed to upload post");
                    });
                }
                return res.json();
            })
            .then(newPost => {
                console.log("Post created successfully:", newPost);
                setShowModal(false);
                // Refresh the posts list after a short delay to ensure backend has processed
                setTimeout(() => {
                    fetchPosts();
                }, 500);
            })
            .catch(err => {
                console.error("Error creating post:", err);
                alert("Failed to create post: " + err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <NavBar/>
            <div className="glass-panel p-4">
                <h1 className="text-2xl text-white mb-4">My Work</h1>

                <Button
                    label="New Post"
                    className="btn-gradient mb-4"
                    onClick={() => setShowModal(true)}
                    disabled={loading}
                />

                {loading && (
                    <div className="text-white mb-3">
                        <i className="pi pi-spin pi-spinner mr-2"></i>
                        Uploading post...
                    </div>
                )}

                <div className="p-grid posts-list">
                    {posts.length === 0 && !loading && (
                        <p className="text-white">No posts yet. Create your first post!</p>
                    )}
                    {posts.map(post => (
                        <div key={post.id} className="p-col-12 p-md-4">
                            <Card
                                title={post.title}
                                subTitle={post.tag ?? ""}
                                className="glass-panel card mb-3"
                            >
                                <p className="text-white">{post.description}</p>
                                {post.fileUrl && (
                                    <Button
                                        label="View & Review"
                                        icon="pi pi-file-pdf"
                                        className="p-button-text p-button-plain text-blue-400"
                                        onClick={() => navigate(`/post/${post.id}`)}
                                    />
                                )}
                            </Card>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <NewPostModal
                        onClose={() => setShowModal(false)}
                        onSave={handleNewPost}
                    />
                )}
            </div>
        </>

    );
};

export default YourWork;