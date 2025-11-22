import React, { useState } from 'react';
import type { IHighlight } from "react-pdf-highlighter";
import PdfReviewer from '../components/PdfReviewer.tsx'; // Import component from Step 3
import { CommentSidebar } from '../components/CommentSidebar.tsx'; // Import component from Step 2
import './PostPage.css';

const PostPage: React.FC = () => {
    // 1. Central State for all comments
    const [highlights, setHighlights] = useState<IHighlight[]>([]);

    // 2. State for which comment is currently selected
    const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

    // Mock File
    const pdfUrl = "/Laborator2.pdf"; // Ensure this exists in /public

    return (
        <div className="pp-wrapper">
            <div className="pp-container">

                {/* Left Sidebar (Hubs) - Kept simpler for this example */}
                <div className="pp-hub-sidebar">Hubs...</div>

                {/* CENTER: The Viewer */}
                <main className="pp-main-content">
                    <div className="pp-post-header">
                        <h1>Document Review</h1>
                    </div>

                    <PdfReviewer
                        fileUrl={pdfUrl}
                        highlights={highlights}
                        activeId={activeHighlightId} // Pass down active ID

                        // When a new comment is made in PDF, add to list
                        onNewComment={(newHighlight) => {
                            setHighlights(prev => [...prev, newHighlight]);
                            setActiveHighlightId(newHighlight.id); // Auto-select the new one
                        }}

                        // When a yellow box is clicked in PDF, activate sidebar card
                        onHighlightClick={(id) => setActiveHighlightId(id)}
                    />
                </main>

                {/* RIGHT: The Comments */}
                <CommentSidebar
                    highlights={highlights}
                    activeId={activeHighlightId}
                    // When sidebar card is clicked, scroll PDF to that spot
                    onCommentClick={(id) => {
                        setActiveHighlightId(id);
                        // We force a hash update to ensure the library catches the scroll event if needed
                        window.location.hash = `#highlight-${id}`;
                    }}
                />

            </div>
        </div>
    );
};

export default PostPage;