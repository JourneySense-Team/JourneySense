// Inside src/components/HubCard.tsx
import React from "react";
import type { Hub } from "../utils/dataHubs";

export const HubCard: React.FC<{ hub: Hub }> = ({ hub }) => {
    return (
        <div
            className="
                p-6 rounded-xl shadow-lg
                transition duration-300
                border border-indigo-700/40
                hover:shadow-indigo-500/20 hover:scale-[1.02]
            "
            style={{
                backgroundColor: "#26263b",
                color: "white"
            }}
        >
            <div className="flex items-center mb-4">
                <div
                    className="
                        w-11 h-11 rounded-full flex items-center justify-center
                        bg-indigo-500/20 text-indigo-400 border border-indigo-400
                        mr-3
                    "
                >
                    <i className={`${hub.iconClass} text-xl`} />
                </div>

                <h3 className="font-bold text-lg">{hub.label}</h3>
            </div>

            <p className="text-sm text-indigo-200/80 mb-4">
                {hub.description}
            </p>

            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-indigo-300 hover:text-white text-sm font-semibold flex items-center transition-colors"
            >
                <i className="pi pi-arrow-right mr-1 text-xs" />
                Enter Hub
            </a>
        </div>
    );
};