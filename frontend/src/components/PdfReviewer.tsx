import React, { useState, useEffect } from 'react';
import { PdfLoader, PdfHighlighter, Highlight as PdfHighlight, Popup, AreaHighlight } from "react-pdf-highlighter";
import type { IHighlight } from "react-pdf-highlighter";
import * as pdfjs from 'pdfjs-dist';
import 'react-pdf-highlighter/dist/style.css';
// Force worker version to match the library (v2.16.105)
(pdfjs as any).GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

interface Props {
    fileUrl: string;
    highlights: IHighlight[];
    activeId: string | null;
    onNewComment: (h: IHighlight) => void;
    onHighlightClick: (id: string) => void;
}

// --- Sub-Component: The Input Form ---
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
          style={{
              background: '#0a0a0b',
              color: '#fff',
              border: '1px solid #333',
              padding: '8px',
              width: '220px',
              height: '80px',
              borderRadius: '4px',
              resize: 'none',
              outline: 'none'
          }}
      />
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                <button
                    onClick={() => onConfirm(text)}
                    style={{ background: '#00ff88', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontWeight: 600, color: '#000' }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---
const PdfReviewer: React.FC<Props> = ({ fileUrl, highlights, activeId, onNewComment, onHighlightClick }) => {

    // Reset component if URL changes
    const [key, setKey] = useState(0);
    useEffect(() => setKey(k => k + 1), [fileUrl]);

    return (
        <div className="pp-document-viewer">
            {/* 1. The Toolbar (Fixed at top) */}
            <div className="pp-viewer-toolbar" style={{ margin: '0', padding: '1rem 2rem' }}>
                <div className="pp-viewer-controls">
                    <button className="pp-viewer-btn active">Review Mode</button>
                </div>
            </div>

            {/* 2. The PDF Area (Fills the rest) */}
            <div className="pp-pdf-container">
            <PdfLoader url={fileUrl} beforeLoad={<div>Loading PDF...</div>} key={key}>
                {(pdfDocument) => (
                    <PdfHighlighter
                        pdfDocument={pdfDocument}
                        enableAreaSelection={(event) => event.altKey}
                        onScrollChange={() => {}}
                        scrollRef={() => {}}

                        // 1. DATA SOURCE
                        highlights={highlights}

                        // 2. ADDING NEW COMMENTS (Fixing the onConfirm error)
                        onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                            <Popup
                                onConfirm={() => {}} // Required by library, but we handle logic in child
                                onCancel={hideTipAndSelection}
                            >
                                {/* Pass logic DIRECTLY to CommentForm */}
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

                        // 3. RENDERING EXISTING HIGHLIGHTS (Fixing the onMouseOver error)
                        highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
                            const isActive = activeId === highlight.id;

                            return (
                                // We removed the <Popup> wrapper here.
                                // Since comments are in the sidebar, we just render the yellow box.
                                <PdfHighlight
                                    isScrolledTo={isScrolledTo}
                                    position={highlight.position}
                                    comment={highlight.comment}
                                    key={index}
                                    // This connects the click to your Sidebar
                                    onClick={() => onHighlightClick(highlight.id)}
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