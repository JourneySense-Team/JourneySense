import React, { useState, useRef, useEffect } from 'react';
import './PostPage.css';
import PdfReviewer from "./PdfReviewer.tsx"; // Import the CSS file created above

// --- Types ---
interface Hub {
    id: string;
    name: string;
    code: string;
    members: number;
    activeCount: number;
}

interface User {
    initials: string;
    name: string;
}

interface Comment {
    id: string;
    user: User;
    text: string;
    timeAgo: string;
}

interface CommentThread {
    id: number;
    context: string;
    comments: Comment[];
    status: 'resolved' | 'pending';
}

// --- Mock Data ---
const HUBS: Hub[] = [
    { id: '1', name: 'Computer Science', code: 'CS', members: 1200, activeCount: 45 },
    { id: '2', name: 'Mathematics', code: 'MA', members: 856, activeCount: 23 },
    { id: '3', name: 'Physics', code: 'PH', members: 642, activeCount: 18 },
    { id: '4', name: 'Engineering', code: 'EN', members: 1500, activeCount: 67 },
];

const THREADS: CommentThread[] = [
    {
        id: 1,
        context: "...comprehensive analysis of breadth-first search (BFS) and depth-first search (DFS)...",
        status: 'pending',
        comments: [
            { id: 'c1', user: { initials: 'RT', name: 'Rachel Thompson' }, text: 'Consider including A* algorithm comparison as well, especially for weighted graphs.', timeAgo: '1h ago' },
            { id: 'c2', user: { initials: 'MK', name: 'Mike Kumar' }, text: 'Agreed. Also, Dijkstra would be relevant here.', timeAgo: '45m ago' }
        ]
    },
    {
        id: 2,
        context: "...choice of traversal algorithm significantly impacts both performance and resource...",
        status: 'pending',
        comments: [
            { id: 'c3', user: { initials: 'SL', name: 'Sarah Lee' }, text: 'This claim needs supporting data. Can you provide specific benchmarks?', timeAgo: '2h ago' }
        ]
    },
    {
        id: 3,
        context: "...Performance metrics included execution time, memory consumption, and cache...",
        status: 'resolved',
        comments: [
            { id: 'c4', user: { initials: 'JW', name: 'James Wilson' }, text: 'Excellent methodology section!', timeAgo: '30m ago' },
            { id: 'c5', user: { initials: 'DP', name: 'David Park' }, text: 'What about measuring graph representation impact?', timeAgo: '10m ago' }
        ]
    }
];

// --- Sub-Components ---

const HubSidebar: React.FC<{ activeHub: string; setActiveHub: (id: string) => void }> = ({ activeHub, setActiveHub }) => (
    <aside className="pp-hub-sidebar">
        <h3>Educational Hubs</h3>
        {HUBS.map((hub) => (
            <div
                key={hub.id}
                className={`pp-hub-item ${activeHub === hub.id ? 'active' : ''}`}
                onClick={() => setActiveHub(hub.id)}
            >
                <div className="pp-hub-icon">{hub.code}</div>
                <div className="pp-hub-info">
                    <div className="pp-hub-name">{hub.name}</div>
                    <div className="pp-hub-meta">{hub.members} members • {hub.activeCount} active</div>
                </div>
            </div>
        ))}
    </aside>
);

const CommentSidebar: React.FC<{
    threads: CommentThread[];
    activeThreadId: number | null;
    activeFilter: string;
    setActiveFilter: (f: string) => void;
}> = ({ threads, activeThreadId, activeFilter, setActiveFilter }) => {

    // Filter logic
    const filteredThreads = threads.filter(t => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Resolved') return t.status === 'resolved';
        if (activeFilter === 'Pending') return t.status === 'pending';
        return true;
    });

    // Ref for auto-scrolling
    const threadRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // Effect to scroll to active thread
    useEffect(() => {
        if (activeThreadId && threadRefs.current[activeThreadId]) {
            threadRefs.current[activeThreadId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeThreadId]);

    return (
        <aside className="pp-comment-sidebar">
            <div className="pp-comment-sidebar-header">
                <h3 className="pp-comment-sidebar-title">Peer Reviews</h3>
                <div className="pp-comment-filter">
                    {['All', 'Resolved', 'Pending'].map(filter => (
                        <div
                            key={filter}
                            className={`pp-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </div>
                    ))}
                </div>
            </div>

            {filteredThreads.map((thread) => (
                <div
                    key={thread.id}
                    ref={(el) => {threadRefs.current[thread.id] = el;}}
                    className={`pp-comment-thread ${activeThreadId === thread.id ? 'active' : ''}`}
                >
                    <div className="pp-thread-context">{thread.context}</div>
                    {thread.comments.map(comment => (
                        <div key={comment.id} className="pp-comment">
                            <div className="pp-comment-author">
                                <div className="pp-comment-avatar">{comment.user.initials}</div>
                                <span className="pp-comment-author-name">{comment.user.name}</span>
                                <span className="pp-comment-time">• {comment.timeAgo}</span>
                            </div>
                            <div className="pp-comment-text">{comment.text}</div>
                        </div>
                    ))}
                </div>
            ))}
        </aside>
    );
};

const PostPage: React.FC = () => {
    const [activeHub, setActiveHub] = useState('1');
    const [activeThreadId, setActiveThreadId] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [highlights, setHighlights] = useState<Array<any>>([]);
    // Mock PDF URL - replace with your real fileUrl from props/state later
    const pdfUrl = "/Laborator2.pdf";
    return (
        <div className="pp-wrapper">
            <div className="pp-background-fx"></div>

            <div className="pp-container">
                {/* Left Column */}
                <HubSidebar activeHub={activeHub} setActiveHub={setActiveHub} />

                {/* Center Column */}
                <main className="pp-main-content">
                    {/* Header */}
                    <div className="pp-post-header">
                        <div className="pp-post-meta">
                            <div className="pp-author-avatar">JD</div>
                            <div className="pp-author-info">
                                <div className="pp-author-name">Jane Doe</div>
                                <div className="pp-post-timestamp">Submitted 2 hours ago</div>
                            </div>
                            <div className="pp-post-tag">Algorithm Design</div>
                        </div>
                        <h1 className="pp-post-title">Implementing Efficient Graph Traversal Algorithms</h1>
                        <p className="pp-post-description">
                            This paper explores various approaches to graph traversal, comparing BFS and DFS implementations
                            with focus on time complexity optimization and practical applications in network analysis.
                        </p>
                    </div>

                    <PdfReviewer
                        fileUrl={pdfUrl}
                        activeThreadId={activeThreadId}
                        highlights={highlights}
                        onHighlightClick={(id) => setActiveThreadId(id)}
                        onNewComment={(newHighlight) => setHighlights(prev => [...prev, newHighlight])}
                    />

                    {/* Demo Area (Optional) */}
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <h2 style={{ color: 'var(--accent-review)', marginBottom: '1rem', textAlign: 'center' }}>
                            Interactive Demo Notes
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Clicking the highlighted text in the document above activates the corresponding thread in the right sidebar.
                        </p>
                    </div>
                </main>

                {/* Right Column */}
                <CommentSidebar
                    threads={THREADS}
                    activeThreadId={activeThreadId}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </div>
        </div>
    );
};

export default PostPage;