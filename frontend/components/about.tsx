import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Discover more about who we are and what we do</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to create amazing products that simplify the lives of our users. We
            believe in innovation, creativity, and customer satisfaction.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            We are a team of passionate developers, designers, and business enthusiasts. Our diverse
            backgrounds allow us to bring unique perspectives to every project we work on.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, we started with a small idea and grew into something much bigger.
            Through hard work and dedication, we've developed products that positively impact
            thousands of users worldwide.
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
