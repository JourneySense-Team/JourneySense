// Inside src/components/ReviewCard.tsx
import React from "react";
import type { Review } from "../utils/dataReviews";

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div
            className="
                p-5 rounded-xl shadow-md
                border border-gray-600/40
                transition duration-200
                hover:shadow-xl
            "
            style={{
                backgroundColor: "#2a2a2a"
            }}
        >
            <p className="text-sm text-indigo-300 mb-2 font-semibold">
                {review.author}
            </p>

            <p className="text-base text-white italic leading-relaxed">
                "{review.text}"
            </p>
        </div>
    );
};