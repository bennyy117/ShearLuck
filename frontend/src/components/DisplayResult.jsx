import React, { useState } from 'react';
import { CheckCircle, Megaphone, Ban, Angry, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DisplayResult() {
    const [review, setReview] = useState('');
    const [result, setResult] = useState('');
    const [sentiment, setSentiment] = useState(null);
    const [relevancy, setRelevancy] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!review.trim()) return;
        setLoading(true);
        setResult("");
        setSentiment(null);
        setRelevancy(null);

        try {
            const response = await fetch("http://localhost:5001/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ review })
            });
            const data = await response.json();
            setResult(data.category);
            setSentiment(data.sentiment);
            setRelevancy(data.relevancy_score);
        } catch (err) {
            console.error(err);
            setResult("Error: Could not classify");
        } finally {
            setLoading(false);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const getIcon = (category) => {
        switch (category) {
            case "VALID":
                return <CheckCircle className="w-6 h-6 text-green-400 inline-block mr-2" />;
            case "AD":
                return <Megaphone className="w-6 h-6 text-yellow-400 inline-block mr-2" />;
            case "IRRELEVANT":
                return <Ban className="w-6 h-6 text-gray-400 inline-block mr-2" />;
            case "NOT VISITED":
                return <Angry className="w-6 h-6 text-red-400 inline-block mr-2" />;
            default:
                return null;
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
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter a review..."
                    className="flex-1 px-4 py-2 rounded-l-xl border-2 border-[var(--tiktok-cyan)] focus:outline-none text-white bg-[var(--tiktok-black)]"
                />
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-[var(--tiktok-pink)] text-[var(--tiktok-white)] rounded-r-xl border-2 border-[var(--tiktok-cyan)] hover:bg-[var(--tiktok-cyan)] hover:text-[var(--tiktok-black)] transition-all"
                >
                    {loading ? 'Classifying...' : 'Submit'}
                </button>
            </div>

            {/* Legend / Chú thích */}
            <div className="flex gap-4 text-xs mb-6 text-white">
                <CheckCircle className="w-4 h-4 text-green-400" /> VALID
                <Megaphone className="w-4 h-4 text-yellow-400" /> ADVERTISEMENT
                <Ban className="w-4 h-4 text-gray-400" /> IRRELEVANT
                <Angry className="w-4 h-4 text-red-400" /> NOT VISITED
            </div>

            {/* Result */}
            {result && (
                <div className="text-xl font-semibold text-white mt-4 flex flex-col items-center">
                    <div className="flex items-center mb-2">
                        {getIcon(result)}
                        <span>This review is classified as: <span className="text-pink-400">{result}</span></span>
                    </div>
                </div>
            )}

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
