import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import { CheckCircle, Megaphone, Ban, Angry, MapPin } from 'lucide-react';

function DisplayResult() {
    const [query, setQuery] = useState('');
    const [comments, setComments] = useState([]);
    const [currentPlace, setCurrentPlace] = useState('');
    const navigate = useNavigate();

    const placesData = [
        {
            name: 'Coffee Shop A',
            placeId: 'place1',
            comments: [
                { author: 'Alice', rating: 5, text: 'Coffee is excellent!', label: 'GOOD' },
                { author: 'Bob', rating: 4, text: 'Check my site for deals!', label: 'ADVERTISEMENT' },
                { author: 'Charlie', rating: 2, text: 'Too noisy inside', label: 'RANT' },
                { author: 'David', rating: 3, text: 'Not relevant', label: 'IRRELEVANT' },
                { author: 'Ella', rating: 5, text: 'Lovely ambiance, will come back!', label: 'GOOD' },
                { author: 'Frank', rating: 4, text: 'Special promotion this week', label: 'ADVERTISEMENT' },
                { author: 'Grace', rating: 1, text: 'Terrible service', label: 'RANT' },
                { author: 'Hannah', rating: 3, text: 'Random comment', label: 'IRRELEVANT' },
            ],
        },
        {
            name: 'Restaurant B',
            placeId: 'place2',
            comments: [
                { author: 'Eva', rating: 5, text: 'Amazing food!', label: 'GOOD' },
                { author: 'Frank', rating: 4, text: 'Promo check!', label: 'ADVERTISEMENT' },
                { author: 'George', rating: 2, text: 'Slow service', label: 'RANT' },
                { author: 'Helen', rating: 3, text: 'Not relevant', label: 'IRRELEVANT' },
                { author: 'Ian', rating: 5, text: 'Highly recommend the desserts!', label: 'GOOD' },
                { author: 'Jack', rating: 4, text: 'Special offer today', label: 'ADVERTISEMENT' },
                { author: 'Karen', rating: 1, text: 'Waited too long!', label: 'RANT' },
                { author: 'Liam', rating: 3, text: 'Irrelevant review', label: 'IRRELEVANT' },
            ],
        },
    ];

    const handleSearch = () => {
        if (!query) return;

        const match = placesData.find(place =>
            place.name.toLowerCase().includes(query.toLowerCase())
        );

        if (match) {
            setComments(match.comments);
            setCurrentPlace(match.name);
        } else {
            setComments([]);
            setCurrentPlace(query);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-[var(--tiktok-black)] min-h-screen text-center relative">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--tiktok-pink)] to-[var(--tiktok-cyan)] bg-clip-text text-transparent">
                Find Truthful Reviews
            </h1>

            <div className="flex w-full max-w-3xl mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter place name..."
                    className="flex-1 px-4 py-2 rounded-l-xl border-2 border-[var(--tiktok-cyan)] focus:outline-none text-white bg-[var(--tiktok-black)]"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-[var(--tiktok-pink)] text-[var(--tiktok-white)] rounded-r-xl border-2 border-[var(--tiktok-cyan)] hover:bg-[var(--tiktok-cyan)] hover:text-[var(--tiktok-black)] transition-all"
                >
                    Search
                </button>
            </div>

            {comments.length > 0 && (
                <div className="mb-4 text-sm text-white">
                    Showing search results for <span className="font-semibold">{currentPlace}</span>
                </div>
            )}

            <div className="flex gap-2 text-xs mb-4 text-white">
                <CheckCircle className="w-4 h-4 text-green-400" /> GOOD
                <Megaphone className="w-4 h-4 text-yellow-400" /> ADVERTISEMENT
                <Ban className="w-4 h-4 text-gray-400" /> IRRELEVANT
                <Angry className="w-4 h-4 text-red-400" /> RANT
            </div>

            <div className="w-full max-w-3xl text-left">
                <CommentList comments={comments} />
            </div>

            {/* Map icon */}
            <div
                className="fixed bottom-4 right-4 bg-[var(--tiktok-pink)] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[var(--tiktok-cyan)] transition-all z-50"
                onClick={() => navigate('/map')}
            >
                <MapPin className="w-6 h-6 text-white" />
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 w-full text-center py-2 text-xs bg-[var(--tiktok-black)] z-40">
                <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <span className="text-[var(--tiktok-pink)]">@ TikTok </span>
                    <span className="text-[var(--tiktok-cyan)]">TechJam 2025</span>
                </span>
            </div>


        </div>
    );
}

export default DisplayResult;
