import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 h-18 transition-all duration-250 ease-out ${
        isScrolled 
          ? 'bg-white shadow-card border-b border-neutral-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="h-9 w-9 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-200"
            >
              Features
            </button>
            <Link
              to="/courses"
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-200"
            >
              Courses
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-button font-semibold text-base transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-105 shadow-button"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-button font-semibold text-base transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-105 shadow-button"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-700 hover:text-neutral-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-neutral-700 hover:text-neutral-900 font-medium text-left"
              >
                Features
              </button>
              <Link
                to="/courses"
                className="text-neutral-700 hover:text-neutral-900 font-medium text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-button font-semibold text-base w-full transition-all duration-200 ease-out text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-neutral-700 hover:text-neutral-900 font-medium text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-button font-semibold text-base w-full transition-all duration-200 ease-out text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
