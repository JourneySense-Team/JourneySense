// Imports
import React, { useState } from 'react';
import { PdfLoader, PdfHighlighter, Highlight as PdfHighlight, Popup, AreaHighlight } from "react-pdf-highlighter";
import type { IHighlight, NewHighlight } from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css"
// --- 1. The Input Form (The Popup) ---
// This appears right over the selected text
const CommentForm = ({ onConfirm, onCancel }: { onConfirm: (text: string) => void, onCancel: () => void }) => {
    const [text, setText] = useState("");
    return (
        <div style={{ padding: '10px', background: '#222', border: '1px solid #444', borderRadius: '8px', zIndex: 100 }}>
      <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '200px', height: '80px', background: '#111', color: '#fff', border: '1px solid #333', padding: '5px' }}
      />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px', gap: '5px' }}>
                <button onClick={onCancel} style={{ fontSize: '12px' }}>Cancel</button>
                <button onClick={() => onConfirm(text)} style={{ background: '#00ff88', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    Post
                </button>
            </div>
        </div>
    );
};

// --- 2. The Main Component ---
interface PdfReviewerProps {
    fileUrl: string;
    activeThreadId: number | null;
    onHighlightClick: (id: number) => void;
    // New Prop: Function to send data back to the parent
    onNewComment: (highlight: IHighlight) => void;
    // New Prop: Existing highlights to render
    highlights: IHighlight[];
}

const PdfReviewer: React.FC<PdfReviewerProps> = ({ fileUrl, activeThreadId, onHighlightClick, onNewComment, highlights }) => {

    return (
        <div className="pp-document-viewer" style={{ padding: 0, overflow: 'hidden', height: '80vh', display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div className="pp-viewer-toolbar" style={{ margin: '1rem 2rem' }}>
                <div className="pp-viewer-controls">
                    <button className="pp-viewer-btn active">Review Mode</button>
                </div>
            </div>

            <div style={{ flex: 1, position: "relative", overflow: 'hidden' }}>
                <PdfLoader url={fileUrl} beforeLoad={<div>Loading PDF...</div>}>
                    {(pdfDocument) => (
                        <PdfHighlighter
                            pdfDocument={pdfDocument}
                            enableAreaSelection={(event) => event.altKey}
                            onScrollChange={() => {}}
                            scrollRef={() => {}}

                            // A. EXISTING HIGHLIGHTS
                            // This draws the yellow boxes from your state
                            highlights={highlights}

                            // B. CREATING A NEW HIGHLIGHT
                            // This triggers when user releases the mouse button
                            onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                                <Popup
                                    onConfirm={(commentText) => {
                                        // 1. Create the new data object
                                        const newHighlight: IHighlight = {
                                            content,
                                            position,
                                            comment: { text: commentText, emoji: "" }, // You can add emoji support later
                                            id: Math.random().toString(36).substring(7), // Generate a Temp ID
                                        };

                                        // 2. Send it up to the parent component
                                        onNewComment(newHighlight);

                                        // 3. Close the popup
                                        hideTipAndSelection();
                                    }}
                                    onCancel={hideTipAndSelection}
                                >
                                    {/* The form defined above */}
                                    <CommentForm />
                                </Popup>
                            )}

                            // C. RENDERING THE YELLOW BOXES
                            highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
                                const isSelected = activeThreadId === Number(highlight.id);

                                return (
                                    <Popup
                                        popupContent={<div style={{padding: '5px', background: '#333'}}>{highlight.comment.text}</div>}
                                        onMouseOver={(popupContent) => setTip(highlight, (highlight) => popupContent)}
                                        onMouseOut={hideTip}
                                        key={index}
                                        children={
                                            <PdfHighlight
                                                isScrolledTo={isScrolledTo}
                                                position={highlight.position}
                                                comment={highlight.comment}
                                            />
                                        }
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