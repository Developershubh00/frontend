

import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, MapPin, Star, Users, BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface College {
  id: number;
  name: string;
  location: string;
  rating: number;
  seats: number;
  fees: string;
  category: string;
  image_url?: string;
  is_selected: boolean;
  cutoff_rank?: number;
  specializations: string[];
}

const ChoiceLists: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/choice-list/');
      if (!response.ok) throw new Error('Failed to fetch colleges');
      const data = await response.json();
      setColleges(data.results || []);
      
      // Load previously selected colleges
      const selected = data.results
        .filter((college: College) => college.is_selected)
        .map((college: College) => college.id);
      setSelectedColleges(new Set(selected));
    } catch (err) {
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const toggleCollegeSelection = async (collegeId: number) => {
    try {
      const isSelected = selectedColleges.has(collegeId);
      const response = await fetch(`/api/colleges/${collegeId}/toggle-selection/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected: !isSelected })
      });

      if (response.ok) {
        setSelectedColleges(prev => {
          const newSet = new Set(prev);
          if (isSelected) {
            newSet.delete(collegeId);
          } else {
            newSet.add(collegeId);
          }
          return newSet;
        });
      }
    } catch (err) {
      console.error('Error toggling college selection:', err);
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || college.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(colleges.map(c => c.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">💝 My Choice List</h1>
                <p className="text-purple-100 mt-2">Select your preferred colleges for counseling</p>
              </div>
            </div>
            
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-purple-100 text-sm">
                <strong>{selectedColleges.size}</strong> colleges selected • 
                Build your preference list for better counseling guidance
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Count */}
        {selectedColleges.size > 0 && (
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">
                  {selectedColleges.size} college{selectedColleges.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                View Selected
              </button>
            </div>
          </div>
        )}

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => {
            const isSelected = selectedColleges.has(college.id);
            return (
              <div
                key={college.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {/* College Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                  {college.image_url ? (
                    <img
                      src={college.image_url}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/80" />
                    </div>
                  )}
                  
                  {/* Selection Toggle */}
                  <button
                    onClick={() => toggleCollegeSelection(college.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  {/* Priority Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {college.category}
                    </span>
                  </div>
                </div>

                {/* College Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {college.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{college.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{college.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{college.seats} seats</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-bold text-blue-600">{college.fees}</p>
                    {college.cutoff_rank && (
                      <p className="text-sm text-gray-500">Cutoff Rank: {college.cutoff_rank}</p>
                    )}
                  </div>

                  {/* Specializations */}
                  {college.specializations.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {college.specializations.slice(0, 3).map((spec, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                        {college.specializations.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                            +{college.specializations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => toggleCollegeSelection(college.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isSelected ? 'Remove from List' : 'Add to My List'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Colleges Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceLists;
