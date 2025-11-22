// Inside src/pages/HomePage.tsx
import React from 'react';
import { HubCard } from "../components/HubCard";
import { HUB_DATA } from "../utils/dataHubs";
import { ReviewCard } from "../components/ReviewCard";
import { REVIEW_DATA } from "../utils/dataReviews";

const HomePage: React.FC = () => {
    return (
        <div className="w-full text-left">
            <div
                className="min-h-screen w-full p-10"
                style={{
                    background: "linear-gradient(180deg, #1c1c1c, #0f0f0f) !important"
                }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-10">

                    {/* LEFT TWO COLUMNS (Workspace Hubs) */}
                    <div className="col-span-2">
                        <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
                            <i
                                className="pi pi-sitemap text-3xl mr-3"
                                style={{ color: '#4c51bf' }}
                            />
                            Workspace Hubs
                        </h2>

                        <div className="grid gap-8"
                             style={{
                                 gridTemplateColumns:
                                     'repeat(auto-fit, minmax(300px, 1fr))'
                             }}
                        >
                            {HUB_DATA.map(hub => (
                                <HubCard key={hub.key} hub={hub} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN — REVIEWS */}
                    <div className="col-span-1">
                        <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
                            <i
                                className="pi pi-comments text-3xl mr-3"
                                style={{ color: '#4c51bf' }}
                            />
                            Team Reviews
                        </h2>

                        <div className="flex flex-col gap-6">
                            {REVIEW_DATA.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;