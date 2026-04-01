import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Discover Best Deals in Jabalpur',
    subtitle: 'Up to 70% off on Restaurants, Gyms, and Salons',
    image: '/assets/hero-banner.png',
    cta: 'Explore Dining',
    link: '/offers?category=c1'
  },
  {
    id: 2,
    title: 'Transform Yourself',
    subtitle: 'Special Annual Memberships under ₹15,000',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    cta: 'Find Gyms',
    link: '/offers?category=c3'
  },
  {
    id: 3,
    title: 'Pamper Your Senses',
    subtitle: 'Luxury Spa & Salon Packages at 50% Off',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80',
    cta: 'Book Appointment',
    link: '/offers?category=c2'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // changes every 5 seconds
    return () => clearInterval(slideInterval);
  }, [current]);

  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden group shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-start to-orange-end opacity-20 z-10"></div>
      
      {slides.map((slide, index) => {
        return (
          <div
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            key={slide.id}
          >
            {index === current && (
              <>
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/50 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-20">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-card mb-4 transform translate-y-0 opacity-100 transition-all duration-700 ease-out drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-card/90 mb-8 max-w-2xl font-medium drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <a href={slide.link} className="bg-gradient-to-r from-orange-start to-orange-end text-card font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ring-2 ring-transparent hover:ring-white/50">
                    {slide.cta}
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-card/20 text-card hover:bg-card hover:text-primary backdrop-blur-sm transition-all shadow-md opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-card/20 text-card hover:bg-card hover:text-primary backdrop-blur-sm transition-all shadow-md opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              current === index ? 'bg-orange-end w-6' : 'bg-card/50 hover:bg-card/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
