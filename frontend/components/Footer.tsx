import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-700 text-white">
      {/* Navigation links */}
      <nav className="flex justify-center space-x-6 py-4">
        <a href="#about" className="hover:text-gray-300">About Us</a>
        <a href="#events" className="hover:text-gray-300">Events</a>
        <a href="#contact" className="hover:text-gray-300">Contact</a>
        <a href="#faq" className="hover:text-gray-300">FAQ</a>
      </nav>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 py-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaInstagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaLinkedin size={24} />
        </a>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-between w-[92%] mx-auto p-5 border-t border-gray-600">
        <div>
          <p>© {new Date().getFullYear()} Aggie Events</p>
        </div>
        <div>
          <p>Created by: Aggie Events Team</p>
        </div>
      </div>
    </footer>
  );
}
