import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import CommentList from './CommentList'
import { CheckCircle, Megaphone, Ban, Angry, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Custom TikTok-colored marker icon
const tikTokIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" viewBox="0 0 30 45">
      <!-- Circle top -->
      <circle cx="15" cy="15" r="15" fill="#FE2C55"/> <!-- pink -->
      <circle cx="15" cy="15" r="7" fill="#25F4EE"/> <!-- cyan -->
      <!-- Short thin black line as marker stem -->
      <line x1="15" y1="30" x2="15" y2="40" stroke="black" stroke-width="2"/>
    </svg>
  `)}`,
  iconSize: [30, 45],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})


function MapScreen() {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [comments, setComments] = useState([])
  const navigate = useNavigate()

  const places = [
    { id: 1, name: 'Park Plaza County Hall London', position: [1.2834, 103.8607], placeId: 'place1' },
    { id: 2, name: 'Restaurant B', position: [1.2905, 103.8520], placeId: 'place2' },
  ]

  const fetchCommentsForPlace = (placeId) => {
    const data = {
      place1: [
        { author: 'Bob', rating: 5, text: 'Rooms very comfortable Good location', label: 'VALID' },
        { author: 'Alice', rating: 2, text: 'Stayed in same room several months ago reported bed was lumpy and extremely uncomfortable obviously the same mattress still Housekeeping was poor bits on floor lampshade still stained no bath robes', label: 'VALID' },
        { author: 'Bob', rating: 5, text: 'Amazing promotion! Come and join us now!', label: 'ADVERTISEMENT' },
        { author: 'Charlie', rating: 5, text: 'Go to www.parkplaza.com to get best price!', label: 'ADVERTISEMENT' },
        { author: 'David', rating: 5, text: 'The location', label: 'IRRELEVANT' },
        { author: 'Ella', rating: 3, text: 'Maybe', label: 'IRRELEVANT' },
        { author: 'Frank', rating: 5, text: 'I havent been there but my friend told me it was good', label: 'RANT WITHOUT VISIT' },
        { author: 'Grace', rating: 4, text: 'Maybe it is beautiful', label: 'RANT WITHOUT VISIT' },
      ],
      place2: [
        { author: 'Eva', rating: 5, text: 'Amazing food!', label: 'GOOD' },
        { author: 'Frank', rating: 4, text: 'Promo check!', label: 'ADVERTISEMENT' },
        { author: 'George', rating: 2, text: 'Slow service', label: 'RANT' },
        { author: 'Helen', rating: 3, text: 'Not relevant', label: 'IRRELEVANT' },
        { author: 'Ian', rating: 5, text: 'Highly recommend the desserts!', label: 'GOOD' },
        { author: 'Jack', rating: 4, text: 'Special offer today', label: 'ADVERTISEMENT' },
        { author: 'Karen', rating: 1, text: 'Waited too long!', label: 'RANT' },
        { author: 'Liam', rating: 3, text: 'Irrelevant review', label: 'IRRELEVANT' },
      ],
    }
    return data[placeId] || []
  }

  const handleMarkerClick = (place) => {
    const placeComments = fetchCommentsForPlace(place.placeId)
    setComments(placeComments)
    setSelectedPlace(place)
  }

  return (
    <div className="relative min-h-screen">
      {/* Map */}
      <MapContainer
        center={[1.3521, 103.8198]}
        zoom={13}
        style={{ height: '100vh', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={tikTokIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place),
            }}
          />
        ))}
      </MapContainer>

      {/* Overlay comment */}
      {selectedPlace && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-[var(--tiktok-black)] p-8 rounded-3xl border-4 border-[var(--tiktok-pink)] shadow-2xl max-w-4xl w-full">
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute -top-4 -right-4 text-[var(--tiktok-white)] bg-[var(--tiktok-pink)] rounded-full w-10 h-10 flex items-center justify-center border-2 border-[var(--tiktok-cyan)] hover:bg-[var(--tiktok-cyan)] hover:text-[var(--tiktok-black)] transition-all duration-200 transform hover:scale-110"
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-6 text-[var(--tiktok-pink)] tracking-tight">{selectedPlace.name}</h2>
              <div className="flex gap-2 text-xs mb-4 text-white">
                <CheckCircle className="w-4 h-4 text-green-400" /> GOOD
                <Megaphone className="w-4 h-4 text-yellow-400" /> ADVERTISEMENT
                <Ban className="w-4 h-4 text-gray-400" /> IRRELEVANT
                <Angry className="w-4 h-4 text-red-400" /> RANT
              </div>
              <CommentList comments={comments} />
            </div>
          </div>
        </>
      )}

      {/* Search icon */}
      <div
        className="fixed bottom-4 right-4 bg-[var(--tiktok-pink)] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[var(--tiktok-cyan)] transition-all"
        onClick={() => navigate('/display-result')}
      >
        <Search className="w-6 h-6 text-white" />
      </div>
    </div>
  )
}

export default MapScreen
