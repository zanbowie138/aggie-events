import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000' }} className="text-gray-400 mt-auto border-t-4 border-gray-700">
      {/* Navigation links */}
      <nav>
        <div className="flex">
          {/* Add your navigation links here if needed */}
        </div>
      </nav>

      {/* Copyright */}
      <div>
        <div className="flex items-center justify-between w-[92%] mx-auto p-5">
          <div>
            <p className="montserrat-light">ALL RIGHTS RESERVED © 2021 </p>
          </div>
          <div>
            <p className="montserrat-light">AGGIEEVENTS TEAM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
