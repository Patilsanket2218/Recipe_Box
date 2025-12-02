import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>🍽️ About Recipe Box</h1>
        <p>Your Personal Space to Discover, Create & Share Amazing Recipes</p>
      </div>

      {/* Mission Section */}
      <div className="about-sections">
        <div className="about-card full-width">
          <h2>🌟 Our Mission</h2>
          <p>
            At <strong>Recipe Box</strong>, our mission is to bring food lovers together.
            Whether you're a beginner or a professional chef, we provide a simple and
            beautiful platform to explore recipes, share your cooking creativity,
            and connect with a vibrant community.
          </p>
        </div>

        {/* What is Recipe Box */}
        <div className="about-card">
          <h2>📖 What is Recipe Box?</h2>
          <p>
            Recipe Box is a modern recipe-sharing web app where users can create,
            save, and discover delicious dishes from around the world. Every recipe
            includes images, ingredients, steps, and more—making cooking easier than ever.
          </p>
        </div>

        {/* User Features */}
        <div className="about-card">
          <h2>👥 Features for Users</h2>
          <ul>
            <li>📚 Create and manage your personal recipe collection</li>
            <li>📸 Upload recipe photos and detailed ingredients</li>
            <li>🧑‍🍳 Explore global cuisines in one place</li>
            <li>💬 Edit your profile with name, bio, and profile image</li>
            <li>🤝 Connect with food lovers in the community</li>
          </ul>
        </div>

        {/* Admin Panel */}
        <div className="about-card">
          <h2>🛠️ Admin Panel</h2>
          <ul>
            <li>👥 Manage users and registrations</li>
            <li>📂 Review and curate recipe content</li>
            <li>📬 View and reply to contact messages</li>
            <li>📊 Monitor activity through dashboard tools</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="about-card">
          <h2>🧠 Why Choose Recipe Box?</h2>
          <p>
            We focus on simplicity, speed, and a beautiful design. Unlike other
            cluttered recipe apps, Recipe Box gives you a clean and personalized experience
            with everything you need in one place—without the distractions.
          </p>
        </div>

        {/* Community Feedback */}
        <div className="about-card">
          <h2>💬 What Our Users Say</h2>
          <p>
            “Amazing platform for home cooks. My dinner ideas improved!” — <i>Aarti S.</i><br />
            “Beautiful UI and very easy to use. Love it!” — <i>Ravi M.</i>
          </p>
        </div>

        {/* Contact Section */}
        <div className="about-card">
          <h2>📞 Contact Us</h2>
          <p>
            Have suggestions or questions? Our team is always happy to help.
            Head over to the contact page and send us a message anytime.
          </p>
        </div>

        {/* CTA */}
        <div className="about-card start-card">
          <h2>🥘 Start Exploring</h2>
          <p>
            Ready to cook something new?
            <br />
            <a href="/recipes" className="cta-link">
              Browse Recipes →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
