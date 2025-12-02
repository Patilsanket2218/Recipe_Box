import React, { useEffect, useState } from 'react';
import './Home.css';
import {
  frontimage1,
  frontimage2,
  frontimage3,
  album1,
  album2,
  album3,
  album4,
  album5,
  album6,
  breakfast,
  lunch,
  dinner,

} from '../ImageGallery';

const slides = [
  {
    url: frontimage1,
    text: 'Explore Delicious Recipes',
  },
  {
    url: frontimage2,
    text: 'Cook with Passion',
  },
  {
    url: frontimage3,
    text: 'Taste the Difference',
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    const handleScroll = () => {
      const section = document.querySelector('.feature-section');
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Meal Data
  const meals = [
    {
      title: 'Super Easy Egg and Green Bowl Salad',
      category: 'Breakfast',
      image: breakfast,
      date: 'August 23, 2021',
      author: 'Alex Misty',
      rating: 5,
    },
    {
      title: 'Chicken Tikka Kebabs With Basmati Rice',
      category: 'Lunch',
      image: lunch,
      date: 'August 23, 2021',
      author: 'Alex Misty',
      rating: 5,
    },
    {
      title: 'Buddha Bowl or Nourish Bowl',
      category: 'Dinner',
      image: dinner,
      date: 'August 23, 2021',
      author: 'Alex Misty',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Carousel Section */}
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="slide-text">{slide.text}</div>
          </div>
        ))}
      </div>

      {/* Content + Image Grid Section */}
      <div className={`feature-section ${isVisible ? 'fade-in' : ''}`}>
        <div className="feature-text">
          <p className="feature-subtitle">FEATURED</p>
          <h2 className="feature-title">RECIPE BOX EXPERIENCE</h2>
          <p className="feature-description">
            Discover a world of delightful recipes, personalized collections, and cooking tips.
            Whether you're a seasoned chef or a home cook, Recipe Box offers a curated journey
            of culinary inspiration. Browse our top dishes and start your flavorful adventure today.
          </p>
          <a href="/recipes" className="feature-link">VIEW RECIPES →</a>
        </div>
        <div className="feature-images">
          <div className="feature-image tall" style={{ backgroundImage: `url(${album1})` }}></div>
          <div className="feature-image small" style={{ backgroundImage: `url(${album2})` }}></div>
          <div className="feature-image small" style={{ backgroundImage: `url(${album3})` }}></div>
          <div className="feature-image tall" style={{ backgroundImage: `url(${album4})` }}></div>
          <div className="feature-image small" style={{ backgroundImage: `url(${album5})` }}></div>
          <div className="feature-image small" style={{ backgroundImage: `url(${album6})` }}></div>
        </div>
      </div>

      {/* Meal Picks Section */}
      <section className="meal-section">
        <h2>Today's Meal Picks</h2>
        <div className="meal-grid">
          {meals.map((meal, index) => (
            <div key={index} className="meal-card">
              <img src={meal.image} alt={meal.title} />
              <div className="meal-content">
                <span className="meal-tag">{meal.category}</span>
                <h3 className="meal-title">{meal.title}</h3>
                <p className="meal-meta">By {meal.author} · {meal.date}</p>
                <div className="meal-rating">
                  {[...Array(meal.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
