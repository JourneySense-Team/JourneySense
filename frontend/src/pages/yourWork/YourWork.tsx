import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import NewPostModal from "../../components/NewPostModal.tsx";
import NavBar from "../../components/navbar/NavBar.tsx";

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

    // FIX 1: Retrieve the 'user' object and parse the ID from it
    const userStr = localStorage.getItem("user");
    const userData = userStr ? JSON.parse(userStr) : null;
    const currentUserId = userData?.userId;

    useEffect(() => {
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
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [currentUserId]);

    const handleNewPost = (formData: FormData) => {
        // FIX 2: Ensure we get the ID correctly here as well
        const userStr = localStorage.getItem("user");
        const userData = userStr ? JSON.parse(userStr) : null;
        const currentUserId = userData?.userId;

        const token = localStorage.getItem("token");

        if (!currentUserId) {
            alert("User not logged in");
            return;
        }

        formData.append("userId", currentUserId);

        fetch("http://localhost:8080/api/posts/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to upload post");
                return res.json();
            })
            .then(newPost => setPosts([...posts, newPost]))
            .catch(err => console.error(err));
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
            />

            <div className="p-grid">
                {posts.length === 0 && (
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
                                <a
                                    href={`http://localhost:8080${post.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    View File
                                </a>
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