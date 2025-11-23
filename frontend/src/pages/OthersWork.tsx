import { useState, useEffect } from "react";
import { Card } from "primereact/card";

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
    const currentUserId = localStorage.getItem("userId");
    const currentHubId = localStorage.getItem("hubId");

    useEffect(() => {
        if (!currentHubId) {
            console.error("Hub ID not found in localStorage");
            return;
        }

        fetch(`http://localhost:8080/api/posts/hub/${currentHubId}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load hub posts");
                return res.json();
            })
            .then(data => {
                // Remove my own posts
                const filtered = data.filter((p: Post) => p.userId !== currentUserId);
                setPosts(filtered);
            })
            .catch(err => console.error(err));
    }, [currentHubId, currentUserId]);

    return (
        <>
        <div className="glass-panel p-4">
            <h1 className="text-2xl text-white mb-4">Others' Work</h1>

            <div className="p-grid">
                {posts.length === 0 && (
                    <p className="text-white">
                        No posts from your colleagues yet.
                    </p>
                )}

                {posts.map(post => (
                    <div key={post.id} className="p-col-12 p-md-4">
                        <Card
                            title={post.title}
                            subTitle={`${post.tag ?? ""} • by ${post.username ?? "Unknown"}`}
                            className="glass-panel card mb-3"
                        >
                            <p className="text-white">{post.description}</p>

                            {post.fileUrl && (
                                <a
                                    href={post.fileUrl}
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
        </div>
        </>

    );
};

export default OthersWork;
