import React from 'react';
import { CheckCircle, Megaphone, Ban, Angry } from 'lucide-react';

const getLabelIcon = (label) => {
    switch (label) {
        case 'GOOD':
            return <CheckCircle className="text-green-400 w-5 h-5" title="Good comment" />;
        case 'ADVERTISEMENT':
            return <Megaphone className="text-yellow-400 w-5 h-5" title="Advertisement" />;
        case 'IRRELEVANT':
            return <Ban className="text-gray-400 w-5 h-5" title="Irrelevant" />;
        case 'RANT':
            return <Angry className="text-red-400 w-5 h-5" title="Rant" />;
        default:
            return null;
    }
};

function CommentItem({ author, rating, text, label }) {
    return (
        <div className="relative p-4 bg-[var(--tiktok-black)] border-2 border-[var(--tiktok-cyan)] rounded-xl shadow-lg hover:border-[var(--tiktok-pink)] transition-all">
            <div className="absolute top-2 right-2">{getLabelIcon(label)}</div>
            <p className="font-semibold text-[var(--tiktok-white)]">{author}</p>
            <p className="text-sm text-[var(--tiktok-cyan)] mb-1">{rating} ★</p>
            <p className="text-[var(--tiktok-white)]">{text}</p>
        </div>
    );
}

export default CommentItem;
