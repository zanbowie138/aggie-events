// pages/events.tsx
"use client";

import React from 'react';
import Carousel from "@/components/Carousel";

const EventsPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-[#FAF3E0]  py-8 font-sans overflow-hidden">
      {/* Search Bar */}
      <div className="max-w-5xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Discover events that inspire..."
          className="w-full p-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-maroon placeholder-gray-500"
        />
      </div>

      {/* Hero Section for Featured Event */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="relative bg-[#FFF8E8] rounded-lg shadow-lg p-10 overflow-hidden">
          <div className="absolute top-4 right-4 text-xs text-gray-600 italic">Sponsored</div>
          <h2 className="text-4xl md:text-5xl font-serif text-maroon mb-4">Aggie Events Presents...</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Release of New App Welcome Party</h3>
          <p className="text-lg font-light text-gray-800 mb-8">Join us on Nov 12th, 2024 at the Texas A&M Campus for an evening of celebration and networking.</p>
          <img
            src="/event.jpg"
            alt="Main Featured Event"
            className="w-full h-64 object-cover rounded-lg shadow-md transform md:-rotate-3"
          />
          <button className="mt-6 px-5 py-3 bg-maroon text-white rounded-full font-semibold text-lg shadow-md transform hover:scale-105 transition">RSVP Now</button>
        </div>
      </section>

      {/* Carousel */}
      <Carousel />

      {/* Asymmetrical Featured Events Section */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-serif text-maroon pb-4">Featured Events</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Large Feature Card */}
          <div className="col-span-2 row-span-2 relative p-6 bg-white rounded-lg shadow-md border-l-4 border-maroon flex flex-col">
            <img src="/event1.webp" alt="Featured Event 1" className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Aggie Gala Night</h3>
            <p className="text-gray-600 mb-4">Date: Nov 14th, 2024 · Location: Texas A&M Main Hall</p>
            <p className="text-gray-700 flex-grow">Celebrate the achievements of our Aggie community. Formal attire, and an evening full of elegance.</p>
          </div>

          {/* Small Feature Cards */}
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="relative p-5 bg-[#FFF8E8] rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
              <img src={`/event${idx + 2}.jpg`} alt={`Event ${idx + 2}`} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Event {idx + 2}</h3>
              <p className="text-gray-600">Nov {12 + idx}th, 2024 · TAMU Campus</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Events Section */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-serif text-maroon pb-4">More Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
            <div key={idx} className="p-5 bg-white rounded-lg shadow-md border-l-4 border-maroon transform hover:scale-105 transition">
              <img src={`/event${idx + 5}.jpg`} alt={`Event ${idx + 5}`} className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Event {idx + 5}</h3>
              <p className="text-gray-600 text-sm mb-2">Nov {20 + idx}th, 2024</p>
              <p className="text-gray-700">Exciting event details for all Aggies...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
