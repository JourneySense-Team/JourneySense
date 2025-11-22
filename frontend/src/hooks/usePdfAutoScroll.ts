// src/hooks/usePdfAutoScroll.ts
import { useEffect } from 'react';

export const usePdfAutoScroll = (activeId: string | null) => {
    useEffect(() => {
        if (!activeId) return;

        let attempts = 0;
        const maxAttempts = 20; // 20 * 50ms = 1 second max wait time
        
        // Start polling for the element
        const scrollInterval = setInterval(() => {
            attempts++;
            
            // We look for the class that the library (and your component) adds to the active item
            const activeElement = document.querySelector('.Highlight--scrolledTo');

            if (activeElement) {
                // ✅ Element found! Scroll to it.
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
                
                // Stop looking
                clearInterval(scrollInterval);
            } else if (attempts >= maxAttempts) {
                // ❌ Timeout: Element didn't appear after 1 second. Stop looking.
                clearInterval(scrollInterval);
            }
        }, 50); // Check every 50ms

        // Cleanup: If activeId changes quickly, clear the previous interval
        return () => clearInterval(scrollInterval);

    }, [activeId]); // Re-run this logic whenever activeId changes
};