import { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar.tsx";
import "./ReviewPage.css";

interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    postId: string;
    reviewerId: string;
    postTitle?: string;
    postAuthor?: string;
}

const ReviewPage = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Get current user ID
    const userStr = localStorage.getItem("user");
    const userData = userStr ? JSON.parse(userStr) : null;
    const currentUserId = userData?.userId;

    useEffect(() => {
        if (!currentUserId) {
            console.error("User ID not found. Are you logged in?");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/reviews/reviewer/${currentUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch reviews");
                return res.json();
            })
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentUserId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "star filled" : "star empty"}>
                ★
            </span>
        ));
    };

    return (
        <>
            <NavBar />
            <div className="review-page">
                <div className="review-header">
                    <p className="review-subtitle">
                        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} given
                    </p>
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading reviews...</p>
                    </div>
                )}

                {!loading && reviews.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3>No reviews yet</h3>
                        <p>Start reviewing posts to see them here!</p>
                    </div>
                )}

                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-card-header">
                                <div className="post-info">
                                    <h3 className="post-title">{review.postTitle || "Untitled Post"}</h3>
                                    {review.postAuthor && (
                                        <p className="post-author">by {review.postAuthor}</p>
                                    )}
                                </div>
                                <div className="rating-display">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            
                            <div className="review-card-body">
                                <p className="review-comment">{review.comment}</p>
                            </div>
                            
                            <div className="review-card-footer">
                                <span className="review-date">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                    {formatDate(review.createdAt)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ReviewPage;