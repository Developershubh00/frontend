import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  Scale,
  AlertTriangle,
  UserCheck,
  Zap,
  Clock,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Info,
  Menu,
  X,
} from "lucide-react";

function TermsConditions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Acceptance of Terms",
      color: "border-blue-300 bg-blue-50",
      textColor: "text-blue-800",
      content: [
        "By accessing and using Believers Consultancy, you accept and agree to be bound by these terms",
        "These terms apply to all users of our platform and services",
        "If you disagree with any part of these terms, please do not use our services",
        "Continued use of our platform constitutes acceptance of any updated terms"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Free Services",
      color: "border-green-300 bg-green-50",
      textColor: "text-green-800",
      content: [
        "All our counselling guidance, tools, and resources are completely free to use",
        "No subscription fees, hidden charges, or premium plans are required",
        "Free access includes: cut-off analysis, college information, choice list builders, and expert guidance",
        "We reserve the right to maintain this free service model and may introduce optional paid features in the future with clear disclosure"
      ]
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      title: "Platform Usage",
      color: "border-purple-300 bg-purple-50",
      textColor: "text-purple-800",
      content: [
        "You must provide accurate information about your academic credentials and counselling details",
        "Use our platform responsibly and in accordance with applicable laws",
        "Do not attempt to access unauthorized areas or interfere with platform functionality",
        "Respect other users and maintain appropriate conduct in all interactions"
      ]
    },
    {
      icon: <Info className="w-8 h-8 text-orange-600" />,
      title: "Information Accuracy",
      color: "border-orange-300 bg-orange-50",
      textColor: "text-orange-800",
      content: [
        "We strive to provide accurate and up-to-date counselling information",
        "All data is sourced from official authorities and verified through multiple channels",
        "However, counselling processes can change rapidly, and users should verify critical information",
        "We are not liable for decisions made based solely on our guidance without official verification"
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-red-600" />,
      title: "Limitation of Liability",
      color: "border-red-300 bg-red-50",
      textColor: "text-red-800",
      content: [
        "Our services are provided 'as is' without warranties of any kind",
        "We are not responsible for counselling outcomes or admission results",
        "Users are solely responsible for their counselling choices and decisions",
        "Our liability is limited to the maximum extent permitted by law"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      title: "User Responsibilities",
      color: "border-yellow-300 bg-yellow-50",
      textColor: "text-yellow-800",
      content: [
        "Verify all information independently before making counselling decisions",
        "Keep your account credentials secure and do not share with others",
        "Report any technical issues or inaccuracies you encounter",
        "Use our guidance as a supplement to, not a replacement for, official counselling procedures"
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: "Intellectual Property",
      color: "border-indigo-300 bg-indigo-50",
      textColor: "text-indigo-800",
      content: [
        "All content on our platform is owned by Believers Destination",
        "You may use our tools and information for personal counselling purposes only",
        "Reproduction, distribution, or commercial use of our content requires written permission",
        "User-generated content remains your property but grants us usage rights for platform improvement"
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-600" />,
      title: "Modifications and Updates",
      color: "border-teal-300 bg-teal-50",
      textColor: "text-teal-800",
      content: [
        "We may update these terms periodically to reflect service improvements or legal requirements",
        "Significant changes will be communicated through email or platform notifications",
        "Continued use after changes constitutes acceptance of the updated terms",
        "You can always access the current version of our terms on our website"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Text */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="/media/logo.png"
                  alt="BD Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  Believers Consultancy
                </span>
                <span className="text-xs italic text-center text-gray-600">
                  Powered by Believers Destination
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
              <button 
                onClick={() => handleNavigation("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Login
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="md:hidden w-6 h-6 text-black" />
              ) : (
                <Menu className="md:hidden w-6 h-6 text-black" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => handleNavigation("/")}
                  className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
                <div className="pt-2">
                  <button 
                    onClick={() => handleNavigation("/login")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl mb-8">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Clear, fair terms that protect both you and us. Everything you need to know about using our platform.
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Effective from: January 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
              <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Always Free</h3>
              <p className="text-green-700 text-sm">No hidden costs or surprise charges</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-blue-800 mb-2">Fair Terms</h3>
              <p className="text-blue-700 text-sm">Clear and reasonable conditions</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
              <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-800 mb-2">Student-First</h3>
              <p className="text-purple-700 text-sm">Terms designed with students in mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 border-2 border-orange-200 shadow-lg">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-12 h-12 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Important: Please Read Carefully
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While our guidance is comprehensive and based on official data, <strong>you are responsible for verifying all information independently before making counselling decisions</strong>. We provide tools and insights, but final choices and their outcomes remain your responsibility.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our service is designed to supplement, not replace, official counselling procedures and your own research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`${section.color} rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    {section.icon}
                  </div>
                  <h2 className={`text-2xl font-bold ${section.textColor}`}>
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12">
            <Info className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              If you need clarification on any of these terms or have concerns about our policies, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="https://wa.me/919211724969?text=Hi%20I%20have%20a%20question%20about%20terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-700"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
                <Mail className="w-5 h-5 mr-2" />
                <span>legal@believersconsultancy.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/media/logo.png"
                alt="BD Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">Believers Consultancy</span>
          </div>
          <p className="text-gray-400 mb-6">
            Powered by Believers Destination - Your trusted partner in NEET counselling guidance
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <button
              onClick={() => handleNavigation("/")}
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/privacy")}
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </button>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-gray-400 text-sm">
              © 2025 Believers Destination. All rights reserved. | Fair terms, transparent service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsConditions;