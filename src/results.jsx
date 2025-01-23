import React, { useState, useEffect } from "react";
import { Heart, Baby, MessageSquare, User, Sparkles } from "lucide-react";
import backgroundImage from "../src/assets/backgroundimage.jpg";

export default function BabyAnnouncementsTable() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_ENDPOINT;

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setAnnouncements(data.duaList);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
            <Sparkles className="absolute top-4 left-4 w-16 h-16 text-white" />
            <Sparkles className="absolute bottom-4 right-4 w-16 h-16 text-white" />
          </div>
          <div className="relative z-10 flex items-center justify-center">
            <Heart className="w-12 sm:w-16 h-12 sm:h-16 text-white animate-pulse mr-4" />
            <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-md">
              Guess the Baby Name Hall of Fame
            </h2>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6 sm:p-8">
          <div className="overflow-auto max-h-[60vh] custom-scrollbar">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-50 border-b-2 border-pink-200">
                  <th className="p-4 text-center text-pink-600 font-semibold">
                    <User className="inline-block mr-2 text-pink-500" />
                    Shared By
                  </th>
                  <th className="p-4 text-center text-purple-600 font-semibold">
                    <Baby className="inline-block mr-2 text-purple-500" />
                    Baby's Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement, index) => (
                  <tr
                    key={announcement.id}
                    className={`
                      hover:bg-pink-50 transition-all duration-300 
                      ${index % 2 === 0 ? "bg-white" : "bg-pink-25"}
                    `}
                  >
                    <td className="p-4 border-b border-pink-100 text-gray-700">
                      <span className="font-medium text-pink-600">
                        {announcement.your_name}
                      </span>
                    </td>
                    <td className="p-4 border-b border-purple-100 text-gray-700">
                      <span className="font-medium text-purple-600">
                        {announcement.baby_name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
