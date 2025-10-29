import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../SEO/SEOHead';
import { Home, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export const NotFound: React.FC = () => {
  useEffect(() => {
    // Track 404 in analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 Not Found',
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <>
      <SEOHead 
        title="404 - Page Not Found | Believers Consultancy"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 px-4">
        <div className="max-w-3xl w-full text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              404
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have taken a study break. 
              Let's get you back to preparing for your medical career!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            
            <Link 
              to="/neet-pg"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl border-2 border-blue-600 transform hover:-translate-y-0.5"
            >
              Explore NEET PG
            </Link>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help? We're Here!
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with us for NEET PG counselling and guidance
            </p>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <a 
                href="tel:8447540715"
                className="flex items-center justify-center gap-3 bg-green-50 text-green-700 px-6 py-4 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Call: 8447540715</span>
              </a>
              
              <a 
                href="mailto:info@believersconsultancy.com"
                className="flex items-center justify-center gap-3 bg-blue-50 text-blue-700 px-6 py-4 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email Us</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.instagram.com/believers.medcounselling/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              
              <a 
                href="https://www.youtube.com/@BelieversConsultancy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-gray-500 text-sm mt-8">
            Looking for something specific? Try our{' '}
            <Link to="/medical-colleges" className="text-blue-600 hover:underline font-semibold">
              Medical Colleges
            </Link>
            {' '}or{' '}
            <Link to="/predictor/pg" className="text-blue-600 hover:underline font-semibold">
              Rank Predictor
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};