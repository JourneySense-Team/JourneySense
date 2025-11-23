import React, { useEffect, useRef } from 'react';
import type { IHighlight } from "react-pdf-highlighter";

interface Props {
    highlights: IHighlight[];
    activeId: string | null;
    onCommentClick: (id: string) => void;
}

export const CommentSidebar: React.FC<Props> = ({ highlights, activeId, onCommentClick }) => {
    // Use a Map to store refs to all comment items
    const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);

    function getMap() {
        if (!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    useEffect(() => {
        if (activeId) {
            const node = getMap().get(activeId);
            if (node) {
                node.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }, [activeId]);

    return (
        <div className="pp-sidebar">
            <div className="pp-sidebar-header">
                <h3 className="text-white text-lg font-semibold m-0">
                    Comments ({highlights.length})
                </h3>
            </div>

            <div className="pp-comments-scroll">
                {highlights.length === 0 ? (
                    <div className="flex flex-column align-items-center justify-content-center h-full text-gray-500 p-4 text-center">
                        <i className="pi pi-pencil text-4xl mb-3 opacity-50" />
                        <p className="m-0">No comments yet.</p>
                        <small className="mt-2 text-sm">Hold <strong>Alt</strong> and drag to comment.</small>
                    </div>
                ) : (
                    highlights.map((highlight) => (
                        <div
                            key={highlight.id}
                            // Store the ref in our Map
                            ref={(node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(highlight.id, node);
                                } else {
                                    map.delete(highlight.id);
                                }
                            }}
                            className={`pp-comment-card ${activeId === highlight.id ? 'active' : ''}`}
                            onClick={() => onCommentClick(highlight.id)}
                        >
                            {highlight.content.text && (
                                <div className="text-sm text-gray-400 mb-2 italic border-left-2 border-indigo-500 pl-2 bg-black-alpha-20 p-1 border-round-right">
                                    "{highlight.content.text.slice(0, 90)}..."
                                </div>
                            )}

                            <div className="flex align-items-start gap-2">
                                <div className="w-2rem h-2rem border-circle bg-indigo-600 flex align-items-center justify-content-center text-white text-xs font-bold flex-shrink-0">
                                    U
                                </div>
                                <p className="text-gray-200 text-sm m-0 line-height-3">
                                    {highlight.comment.text}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};