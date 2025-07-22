import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';
import Phoebe from '../assets/Phoebe.png'
import John from '../assets/John.png'

const testimonials = [
  {
    id: 1,
    name: 'Phoebe',
    location: 'Lagos',
    rating: 5,
    text: 'I love how simple it is to scan a QR code and earn points for shopping sustainably!',
    image: Phoebe,
  },
  {
    id: 2,
    name: 'John',
    location: 'Abuja',
    rating: 5,
    text: 'Being on the leaderboard keeps me motivated to go even greener!',
    image: John,
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating) => {
    return Array(rating)
      .fill('⭐')
      .map((star, index) => (
        <span key={index} className={styles.star}>
          {star}
        </span>
      ));
  };

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.title}>HEAR WHAT OUR USERS HAVE TO SAY</h2>
      <div className={styles.sliderContainer}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
        >
          ←
        </button>
        <div className={styles.slider}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${styles.slide} ${
                index === currentSlide ? styles.active : ''
              }`}
            >
              <div className={styles.testimonialCard}>
                <div className={styles.userImage}>
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className={styles.rating}>
                  {renderStars(testimonial.rating)}
                </div>
                <p className={styles.text}>"{testimonial.text}"</p>
                <p className={styles.user}>
                  {testimonial.name}, {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
