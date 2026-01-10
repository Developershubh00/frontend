import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Users, TrendingUp, Award, Heart, Zap, Globe, ArrowRight, Menu, X,
  Target, BookOpen, CheckCircle, Mail, Phone, Youtube, Instagram, Star, Lightbulb,
  Rocket, Shield, LucideIcon
} from 'lucide-react';

interface CoreValue {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  borderColor: string;
}

interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

interface ImpactArea {
  title: string;
  description: string;
  icon: JSX.Element;
  gradient: string;
}

const CareersPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [valuesVisible, setValuesVisible] = useState<boolean>(false);
  const [benefitsVisible, setBenefitsVisible] = useState<boolean>(false);
  const [impactVisible, setImpactVisible] = useState<boolean>(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.target === heroRef.current) setIsVisible(entry.isIntersecting);
        else if (entry.target === valuesRef.current) setValuesVisible(entry.isIntersecting);
        else if (entry.target === benefitsRef.current) setBenefitsVisible(entry.isIntersecting);
        else if (entry.target === impactRef.current) setImpactVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    [heroRef, valuesRef, benefitsRef, impactRef].forEach((ref: React.RefObject<HTMLElement>) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const coreValues: CoreValue[] = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student-First Approach",
      description: "Every decision we make centers around helping students achieve their dreams.",
      color: "from-blue-100 to-blue-200",
      borderColor: "border-blue-300"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Excellence",
      description: "We constantly evolve with cutting-edge tools and insights.",
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Spirit",
      description: "We believe in teamwork and supporting each other.",
      color: "from-green-100 to-green-200",
      borderColor: "border-green-300"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity & Trust",
      description: "We maintain the highest standards of accuracy and transparency.",
      color: "from-indigo-100 to-indigo-200",
      borderColor: "border-indigo-300"
    }
  ];

  const benefits: Benefit[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Flexible arrangements that help you maintain healthy balance.",
      color: "border-blue-300 bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Opportunities",
      description: "Continuous learning and clear career progression.",
      color: "border-purple-300 bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Inclusive Culture",
      description: "A welcoming environment where everyone's voice matters.",
      color: "border-green-300 bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Impact-Driven Work",
      description: "Make a real difference in students' lives.",
      color: "border-pink-300 bg-pink-50",
      iconColor: "text-pink-600"
    }
  ];

  const impactAreas: ImpactArea[] = [
    {
      title: "Technology & Innovation",
      description: "Build intelligent tools that simplify counselling for thousands.",
      icon: <Zap className="w-12 h-12" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Student Success",
      description: "Directly impact futures of aspiring doctors.",
      icon: <Target className="w-12 h-12" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Data & Insights",
      description: "Transform complex data into actionable insights.",
      icon: <BookOpen className="w-12 h-12" />,
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Community Building",
      description: "Create a supportive ecosystem for students.",
      icon: <Globe className="w-12 h-12" />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const qualities: string[] = [
    "Problem-solvers who think creatively and embrace challenges",
    "Passionate individuals who genuinely care about student success",
    "Team players who thrive in collaborative environments",
    "Continuous learners who stay curious and adaptable",
    "Self-starters who take initiative and ownership"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img 
              src="/media/logo4.png" 
              alt="Logo" 
              className="h-16 w-auto object-contain cursor-pointer" 
              onClick={() => navigate('/')} 
            />

            <div className="hidden md:flex items-center space-x-8 ml-auto">
              <a 
                onClick={() => navigate('/')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                onClick={() => navigate('/blog')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                onClick={() => navigate('/announcements')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                News
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a className="text-blue-600 font-semibold cursor-pointer">
                Careers
              </a>
              <a 
                onClick={() => navigate('/support')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Log-In | Sign-Up
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a 
                  onClick={() => { navigate('/'); setIsMenuOpen(false); }} 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Home
                </a>
                <a 
                  onClick={() => { navigate('/blog'); setIsMenuOpen(false); }} 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Blog
                </a>
                <a 
                  onClick={() => { navigate('/announcements'); setIsMenuOpen(false); }} 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  News
                </a>
                <a className="block px-3 py-2 text-blue-600 font-semibold cursor-pointer">
                  Careers
                </a>
                <a 
                  onClick={() => { navigate('/support'); setIsMenuOpen(false); }} 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Contact Us
                </a>
                <button 
                  onClick={() => { navigate('/login'); setIsMenuOpen(false); }} 
                  className="w-full bg-gradient-to-r from-blue-300 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold"
                >
                  Log-In | Sign-Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="pt-24 pb-20 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full font-bold text-lg mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Briefcase className="w-5 h-5 mr-2" />
            Join Our Mission
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Build Your Career
          </h1>
          <div className={`text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            With Purpose
          </div>
          <p className={`text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            At Believers Consultancy, we're transforming how students navigate their medical counselling journey. Join us in making a meaningful impact on thousands of aspiring doctors across India.
          </p>
          <div className={`inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Rocket className="w-5 h-5 mr-2" />
            Currently in growth mode - Exciting opportunities coming soon!
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className={`transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Mission: Empowering Future Doctors
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're democratizing access to quality counselling guidance for every medical aspirant in India. By providing free, accurate resources, we help students make informed career decisions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With 150,000+ registered students and 2 million+ candidates served, we're building something special. Join this journey.
              </p>
            </div>
            <div className={`transition-all duration-700 delay-200 ${valuesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <Users className="w-32 h-32 text-white opacity-30 absolute" />
                <Target className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>

          <div className={`text-center mb-12 transition-all duration-700 ${valuesVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value: CoreValue, i: number) => (
              <div 
                key={i} 
                className={`bg-gradient-to-br ${value.color} rounded-3xl p-8 border-2 ${value.borderColor} hover:scale-105 transition-all duration-500 shadow-lg ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
                style={{transitionDelay: `${i*100}ms`}}
              >
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${benefitsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600">We create an environment where talented individuals thrive</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((b: Benefit, i: number) => (
              <div 
                key={i} 
                className={`${b.color} rounded-3xl p-8 border-2 hover:scale-105 hover:border-purple-400 transition-all duration-500 shadow-lg ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
                style={{transitionDelay: `${i*50}ms`}}
              >
                <div className={`${b.iconColor} mb-4`}>{b.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-700">{b.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${benefitsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Look For</h2>
              <p className="text-lg text-gray-600 mb-6">
                We seek passionate individuals who share our vision. Here's what matters:
              </p>
              <ul className="space-y-4">
                {qualities.map((q: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`transition-all duration-700 delay-200 ${benefitsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="w-full h-96 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <Star className="w-32 h-32 text-white opacity-30 absolute" />
                <Award className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section ref={impactRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${impactVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Make an Impact</h2>
            <p className="text-xl text-gray-600">Choose where you want to make a difference</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area: ImpactArea, i: number) => (
              <div 
                key={i} 
                className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-purple-300 hover:scale-105 transition-all duration-500 ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
                style={{transitionDelay: `${i*100}ms`}}
              >
                <div className={`bg-gradient-to-r ${area.gradient} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're building our team. While we don't have open positions now, we'd love to stay connected with talented individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => navigate('/support')} 
              className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-400 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </button>
            <a 
              href="https://wa.me/919211724969?text=Hi%20I'm%20interested%20in%20career%20opportunities" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
          </div>
          <p className="text-gray-600">We'll reach out when we have matching opportunities</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden mb-4">
                <img src="/media/logo4.png" alt="Logo" className="w-auto h-16 object-contain" />
              </div>
              <p className="text-xs font-bold text-gray-400 mb-4">
                Designed & Managed By: Believers Destination Pvt Ltd
              </p>
              <p className="text-gray-400 mb-4">Your ultimate guide to medical counselling. 100% free access.</p>
              <div className="flex space-x-3">
                <a 
                  href="https://www.youtube.com/@BelieversConsultancy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/believers.medcounselling" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a onClick={() => navigate('/')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    Home
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/blog')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    Blog
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/announcements')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    News
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/support')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">EXAMS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a onClick={() => navigate('/login')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    NEET PG
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/login')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    NEET UG
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/login')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    INICET
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/login')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    DNB PDCET
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">LEGAL</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a onClick={() => navigate('/privacy')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/terms')} className="hover:text-purple-400 transition-colors cursor-pointer">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Believers Destination Pvt Ltd. All rights reserved.</p>
            <p className="text-xs mt-2">
              <span className="font-bold text-gray-300">Designed & Managed By:</span>{' '}
              <a 
                href="https://www.believersdestination.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-purple-400 hover:text-purple-300 underline"
              >
                Believers Destination Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;