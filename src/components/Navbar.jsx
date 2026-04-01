import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, User, Menu, Bell, LogOut, ChevronDown, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_CATEGORIES } from '../data/mockData';

const Navbar = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Sync search input with URL when it changes (for back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/offers?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/offers');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border-color shadow-sm w-full">
      {/* Layer 1: Top Strip */}
      <div className="bg-primary text-card text-xs py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> Jabalpur, MP
            </span>
            <span className="text-gray-300">|</span>
            <span>Download App</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/business/join" className="hover:text-orange-start transition-colors">Sell on JBP Deals</Link>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              Support <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-start to-orange-end rounded-xl flex items-center justify-center text-card font-bold text-xl shadow-lg transform group-hover:scale-105 transition-transform">
              JD
            </div>
            <span className="font-bold text-2xl tracking-tight hidden sm:block text-primary">
              JBP <span className="text-orange-end">Deals</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-32 py-3 border border-border-color rounded-full leading-5 bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
              placeholder="Search for restaurants, spas, gyms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute inset-y-1 right-1 px-6 bg-primary hover:bg-accent text-card text-sm font-medium rounded-full transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors">
              <Search className="w-6 h-6" />
            </button>
            
            <button className="p-2 text-text-secondary hover:text-primary transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-discount rounded-full border-2 border-card"></span>
            </button>

            {user ? (
              <div className="relative group cursor-pointer hidden sm:block">
                <div className="flex items-center gap-2 p-1 border border-border-color rounded-full hover:shadow-md transition-shadow">
                  <img src={user.avatar} alt="User avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-text-primary px-1 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-text-secondary mr-2" />
                </div>
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg border border-border-color py-1 hidden group-hover:block z-50">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">Dashboard</Link>
                  <Link to="/dashboard?tab=saved" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">Saved Offers</Link>
                  <hr className="my-1 border-border-color" />
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-discount hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-primary px-3 py-2 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="text-sm font-medium bg-primary text-card px-5 py-2 rounded-full hover:bg-accent hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile Menu */}
            <button className="p-2 md:hidden text-text-secondary hover:text-primary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Layer 3: Category Strip */}
      <div className="border-t border-border-color bg-card relative shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto hide-scrollbar py-3 gap-6">
            <Link to="/offers" className="flex items-center gap-2 text-text-secondary hover:text-primary font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0">
              <Menu size={16} /> All Categories
            </Link>
            <div className="h-4 w-px bg-border-color flex-shrink-0"></div>
            {MOCK_CATEGORIES.map(category => (
              <Link 
                key={category.id} 
                to={`/offers?category=${category.id}`}
                className="text-text-secondary hover:text-accent font-medium text-sm whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
