import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments }) {
    const order = { GOOD: 1, ADVERTISEMENT: 2, IRRELEVANT: 3, RANT: 4 };
    const sorted = [...comments].sort((a, b) => order[a.label] - order[b.label]);

    return (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {sorted.length > 0 ? (
                sorted.map((c, i) => <CommentItem key={i} {...c} />)
            ) : (
                <p className="text-[var(--tiktok-white)] text-center">No comments available.</p>
            )}
        </div>
    );
}

export default CommentList;
