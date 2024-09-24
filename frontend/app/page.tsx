import React from 'react';

export default function Page() {
  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="hero-section">
        <h1 className="hero-title">Aggie Events Homepage!</h1>
        <p className="hero-subtitle">
          Welcome to Aggie Events - Your one-stop destination for all events happening at Aggie!
        </p>
        <button className="cta-button">Explore Events</button>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Discover</h3>
            <p>Find the best events happening in your area.</p>
          </div>
          <div className="feature-item">
            <h3>Connect</h3>
            <p>Meet new people and connect through shared interests.</p>
          </div>
          <div className="feature-item">
            <h3>Enjoy</h3>
            <p>Attend amazing events and create lasting memories.</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <ul className="events-list">
          <li className="event-item">Campus Marathon - October 5th</li>
          <li className="event-item">Tech Conference - October 10th</li>
          <li className="event-item">Music Festival - October 20th</li>
        </ul>
      </section>

    
    </div>
  );
}
