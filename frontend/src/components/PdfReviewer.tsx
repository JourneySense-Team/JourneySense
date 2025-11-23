import React, { useState, useEffect, useRef } from 'react';
import { PdfLoader, PdfHighlighter, Highlight as PdfHighlight, Popup } from "react-pdf-highlighter";
import type { IHighlight } from "react-pdf-highlighter";
import * as pdfjs from 'pdfjs-dist';
import 'react-pdf-highlighter/dist/style.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

interface Props {
    fileUrl: string;
    highlights: IHighlight[];
    activeId: string | null;
    onNewComment: (h: IHighlight) => void;
    onHighlightClick: (id: string) => void;
}

interface CommentFormProps {
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onConfirm, onCancel }) => {
    const [text, setText] = useState("");

    return (
        <div style={{ padding: '12px', background: '#1a1a1f', border: '1px solid #333', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            <textarea
                autoFocus
                placeholder="Add your comment..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey && text.trim()) onConfirm(text);
                }}
                style={{ background: '#0a0a0b', color: '#fff', border: '1px solid #333', padding: '8px', width: '220px', height: '80px', borderRadius: '4px', resize: 'none', outline: 'none' }}
            />
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                <button onClick={() => { if (text.trim()) onConfirm(text); }} style={{ background: '#00ff88', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontWeight: 600, color: '#000' }}>Save</button>
            </div>
        </div>
    );
};

const PdfReviewer: React.FC<Props> = ({ fileUrl, highlights, activeId, onNewComment, onHighlightClick }) => {
    const scrollToHighlightRef = useRef<((highlight: IHighlight) => void) | null>(null);

    useEffect(() => {
        if (activeId && scrollToHighlightRef.current) {
            const highlightToScrollTo = highlights.find(h => h.id === activeId);
            if (highlightToScrollTo) {
                scrollToHighlightRef.current(highlightToScrollTo);
            }
        }
    }, [activeId, highlights]);

    return (
        <div className="pp-document-viewer">
            <div className="pp-pdf-container">
                <PdfLoader
                    url={fileUrl}
                    beforeLoad={<div>Loading PDF...</div>}
                    errorMessage={<div>Error loading PDF</div>}
                >
                    {(pdfDocument) => (
                        <PdfHighlighter
                            pdfDocument={pdfDocument}
                            enableAreaSelection={(event) => event.altKey}
                            onScrollChange={() => {}}

                            // FIX: Set scale to 0.9 (90%) so it looks "zoomed out" and centered
                            pdfScaleValue="0.9"

                            scrollRef={(scrollTo) => {
                                scrollToHighlightRef.current = scrollTo;
                            }}
                            highlights={highlights}

                            onSelectionFinished={(position, content, hideTipAndSelection) => (
                                <Popup
                                    onMouseOver={() => {}}
                                    onMouseOut={() => {}}
                                    popupContent={<></>}
                                >
                                    <CommentForm
                                        onConfirm={(commentText) => {
                                            const newHighlight: IHighlight = {
                                                content,
                                                position,
                                                comment: { text: commentText, emoji: '' },
                                                id: Math.random().toString(36).substring(7),
                                            };
                                            onNewComment(newHighlight);
                                            hideTipAndSelection();
                                        }}
                                        onCancel={hideTipAndSelection}
                                    />
                                </Popup>
                            )}

                            highlightTransform={(highlight, index) => {
                                const isActive = highlight.id === activeId;
                                return (
                                    <PdfHighlight
                                        isScrolledTo={isActive}
                                        position={highlight.position}
                                        comment={highlight.comment}
                                        key={index}
                                        onClick={(event?: React.MouseEvent) => {
                                            // FIX: Removed preventDefault() to see if it fixes the double-click requirement
                                            if (event) {
                                                event.stopPropagation();
                                            }
                                            onHighlightClick(highlight.id);
                                        }}
                                    />
                                );
                            }}
                        />
                    )}
                </PdfLoader>
            </div>
        </div>
    );
};

export default PdfReviewer;