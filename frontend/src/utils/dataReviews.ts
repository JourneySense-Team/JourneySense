
export interface Review {
    id: number;
    author: string;
    text: string;
}

export const REVIEW_DATA: Review[] = [
    { id: 1, author: 'Alex', text: 'The new feature documentation is clear and helpful.' },
    { id: 2, author: 'Maya', text: 'We should consider optimizing the image loading on the dashboard. It feels sluggish.' },
    { id: 3, author: 'Chris', text: 'Great work on the Q3 performance summary. Very detailed!' },
    { id: 4, author: 'Ben', text: 'The bug fix for the login screen has been deployed successfully.' },
    { id: 5, author: 'Liam', text: 'Need to schedule a follow-up meeting on the Q4 budgeting plan.' }
];