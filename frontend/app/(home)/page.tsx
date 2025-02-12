import React from "react";
import Image from "next/image";
import TypeAnim from "@/app/(home)/components/typing-anim/TypeAnim";
import { TypingText, TypingTextBase } from "@/config/config";
import Header from "@/components/headers/Header";
import ParallaxBanner from "@/app/(home)/components/ParallaxBanner";
import EventCard from "@/components/cards/EventCard";

/**
 * The Homepage component is the main component for the homepage of the website.
 * It includes the layout and structure of the homepage, such as the header, banner, and featured events section.
 */
export default function Homepage() {
  return (
    <>
      <Header />
      <div className="bg-white text-black">
        {/* How It Works Section */}
        <section className="py-24 px-4 md:px-8 bg-gray-50">
          <h2 className="text-4xl font-light text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                number: "01",
                title: "Create Events",
                desc: "Register your organization and start posting events for the Aggie community",
              },
              {
                number: "02",
                title: "Discover",
                desc: "Find events that match your interests through our smart filtering system",
              },
              {
                number: "03",
                title: "Engage",
                desc: "RSVP to events and connect with other Aggies in your community",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-3xl font-light text-maroon mb-6">
                  {item.number}
                </div>
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add new Event Discovery Section after How It Works */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-light mb-16">Discover Events</h2>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                "All Events",
                "Today",
                "This Week",
                "Free Food",
                "Career Fairs",
                "Sports",
                "Academic",
                "Social",
                "Greek Life",
                "Workshops",
              ].map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full border transition-all duration-300
                    ${
                      index === 0
                        ? "bg-maroon text-white"
                        : "border-gray-200 hover:border-maroon hover:text-maroon"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Search events, organizations, or keywords"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-maroon"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-maroon">
                    <option>Any Location</option>
                    <option>MSC</option>
                    <option>Kyle Field</option>
                    <option>Zachry</option>
                    <option>Evans Library</option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-maroon">
                    <option>Any Date</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This Weekend</option>
                    <option>Next Week</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Event View Toggle */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <button className="text-maroon">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    />
                  </svg>
                </button>
                <button className="text-gray-400">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">Sort by:</span>
                <select className="border-none focus:outline-none text-maroon">
                  <option>Date: Upcoming</option>
                  <option>Most Popular</option>
                  <option>Recently Added</option>
                </select>
              </div>
            </div>

            {/* Featured Events Grid - keep your existing EventCard components */}
          </div>
        </section>

        {/* Add Quick Links Section before Community Stats */}
        <section className="py-24 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-light mb-12">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Free Events",
                  icon: "🎯",
                  links: ["Today's Free Events", "Free Food", "Study Sessions"],
                },
                {
                  title: "Popular Venues",
                  icon: "🏛️",
                  links: ["MSC", "Kyle Field", "Rudder Tower", "Evans Library"],
                },
                {
                  title: "Event Types",
                  icon: "🎪",
                  links: [
                    "Career Fairs",
                    "Workshops",
                    "Social Events",
                    "Sports",
                  ],
                },
                {
                  title: "Organizations",
                  icon: "👥",
                  links: ["Student Orgs", "Greek Life", "Professional Orgs"],
                },
              ].map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-maroon transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Organizations Section */}
        <section className="py-24 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-light mb-8">
                For Student Organizations
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Reach more students and manage your events efficiently
              </p>
              <div className="space-y-6">
                {[
                  "Easy event creation and management",
                  "Track attendance and engagement",
                  "Connect with your target audience",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-maroon"></div>
                    {item}
                  </div>
                ))}
              </div>
              <button className="mt-12 bg-maroon text-white px-8 py-4 rounded-lg hover:bg-darkmaroon transition-all duration-300 hover:shadow-lg">
                Register Your Organization
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/organization-placeholder.jpg"
                  width={600}
                  height={400}
                  alt="Organization features"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats Section */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "1000+", label: "Events Posted" },
              { number: "500+", label: "Organizations" },
              { number: "10k+", label: "Students Engaged" },
              { number: "50+", label: "Event Categories" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl font-light text-maroon mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-maroon to-darkmaroon text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-12 text-white/80">
              Join the largest event discovery platform for Aggies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-maroon px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300">
                Browse Events
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300">
                Post an Event
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
