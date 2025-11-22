import React, { useEffect } from 'react'; // 1. Import useEffect
import type { IHighlight } from "react-pdf-highlighter";

interface Props {
    highlights: IHighlight[];
    activeId: string | null;
    onCommentClick: (id: string) => void;
}

export const CommentSidebar: React.FC<Props> = ({ highlights, activeId, onCommentClick }) => {

    // 2. ADD THIS EFFECT: This watches for changes and scrolls the sidebar
    useEffect(() => {
        if (activeId) {
            const element = document.getElementById(`comment-card-${activeId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeId]);

    return (
        <div className="pp-comment-sidebar">
            <div className="pp-comment-sidebar-header">
                <h3>Comments ({highlights.length})</h3>
            </div>

            <div className="pp-comment-list">
                {highlights.length === 0 && (
                    <div style={{padding: '20px', color: '#666', textAlign: 'center'}}>
                        Select text in the document to add a comment.
                    </div>
                )}

                {highlights.map((highlight) => (
                    <div
                        key={highlight.id}
                        
                        // 3. ADD THIS ID: This allows the useEffect to find this specific box
                        id={`comment-card-${highlight.id}`} 
                        
                        onClick={() => onCommentClick(highlight.id)}
                        className={`pp-comment-thread ${activeId === highlight.id ? 'active' : ''}`}
                        style={{ cursor: 'pointer' }}
                    >
                        {/* The Quote from the PDF */}
                        {highlight.content.text && (
                            <div className="pp-thread-context">
                                "{highlight.content.text.slice(0, 80)}..."
                            </div>
                        )}

                        {/* The Image (if they selected an area) */}
                        {highlight.content.image && (
                            <div className="pp-thread-context">
                                [Selected Image Area]
                            </div>
                        )}

                        {/* The User's Comment */}
                        <div className="pp-comment">
                            <div className="pp-comment-author">
                                <div className="pp-comment-avatar">JD</div>
                                <span className="pp-comment-author-name">You</span>
                            </div>
                            <div className="pp-comment-text">{highlight.comment.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};