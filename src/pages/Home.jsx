import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Scissors, Dumbbell, Utensils, ShoppingBag } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import OfferCard from '../components/OfferCard';
import { MOCK_OFFERS, MOCK_CATEGORIES, MOCK_BUSINESSES } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const ICONS = {
  Utensils: <Utensils size={28} className="text-orange-end" />,
  Scissors: <Scissors size={28} className="text-primary" />,
  Dumbbell: <Dumbbell size={28} className="text-success" />,
  ShoppingBag: <ShoppingBag size={28} className="text-accent" />,
  // fallback icon
  default: <Sparkles size={28} className="text-text-secondary" />
};

const SectionHeader = ({ title, link, linkText = "View more" }) => (
  <div className="flex justify-between items-end mb-8 border-b border-border-color pb-4">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
      <TrendingUp className="text-orange-end" /> {title}
    </h2>
    <Link to={link || "/offers"} className="text-accent hover:text-primary font-semibold text-sm flex items-center gap-1 group transition-colors">
      {linkText} <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const Home = () => {
  const { user } = useAppContext();
  // Get featured offers
  const featuredOffers = MOCK_OFFERS.filter(offer => offer.isFeatured).slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="w-full">
        <HeroSlider />
      </section>

      {/* Category Icons Strip */}
      <section className="bg-card py-10 shadow-sm border-y border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {MOCK_CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/offers?category=${category.id}`}
                className="flex flex-col items-center gap-3 min-w-[100px] group"
              >
                <div className="w-16 h-16 rounded-full bg-background border border-border-color flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                  {ICONS[category.icon] || ICONS.default}
                </div>
                <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader 
          title="Trending Deals" 
          link={user ? "/offers" : "/login"} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {featuredOffers.map(offer => {
            const business = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
            return (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                business={business} 
              />
            );
          })}
        </div>
      </section>

      {/* Promotional Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-16 relative overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e40af] to-orange-end opacity-90"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-14">
          <div className="text-card md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight drop-shadow-md">
              Unlock Exclusive VIP Privileges
            </h2>
            <p className="text-lg text-card/90 font-medium max-w-xl">
              Join thousands of members enjoying the best deals in Jabalpur. Sign up to unlock extra 10% off on your first redemption.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-end">
            <Link 
              to={user ? "/offers" : "/signup"} 
              className="px-8 py-4 bg-card text-primary font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out"
            >
              {user ? "Explore Deals" : "Unlock All Offers"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
