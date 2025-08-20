import React, { useState } from "react";
import { ArrowLeft, User, Mail, Phone, Award, MapPin, Edit3, Save, X, Camera, Calendar, BookOpen, GraduationCap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Dashboard Profile Page Component
 * User profile management with edit functionality
 * API Integration: PUT /api/auth/profile/
 */
const DashboardProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle profile update
   * API Integration: PUT /api/auth/profile/
   */
  const handleSave = async () => {
    setIsLoading(true);
    setError("");

    try {
      await updateProfile(editedUser);
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
    setError("");
  };

  const categories = ["General", "OBC", "SC", "ST", "EWS", "PwD"];
  const states = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  const examTypes = ["NEET UG", "NEET PG", "NEET SS", "INICET"];
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h2>
          <p className="text-slate-600 mb-6">Please log in to view your profile</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
              <p className="text-sm text-slate-600">Manage your account and preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                isEditing 
                  ? "bg-gray-500 text-white hover:bg-gray-600" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Profile Header Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Camera className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mt-4 text-center">
                {user.name || "User Name"}
              </h2>
              <p className="text-slate-600">Medical Aspirant</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">NEET PG</h3>
                    <p className="text-sm text-slate-600">2025 Aspirant</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Goal</h3>
                    <p className="text-sm text-slate-600">{user.preferredSpecialty || "Specialty"}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Category</h3>
                    <p className="text-sm text-slate-600">{user.category || "General"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Personal Information
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isLoading ? "Saving..." : "Save"}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.phone}
                    </p>
                  )}
                </div>

                {/* NEET Rank */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Award className="w-4 h-4 inline mr-2" />
                    NEET Rank
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="neetRank"
                      value={editedUser.neetRank || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.neetRank || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Exam Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Exam Type
                  </label>
                  {isEditing ? (
                    <select
                      name="examType"
                      value={editedUser.examType || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Exam Type</option>
                      {examTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.examType || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Exam Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Exam Year
                  </label>
                  {isEditing ? (
                    <select
                      name="examYear"
                      value={editedUser.examYear || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.examYear || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  {isEditing ? (
                    <select
                      name="category"
                      value={editedUser.category || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.category || "Not provided"}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    State
                  </label>
                  {isEditing ? (
                    <select
                      name="state"
                      value={editedUser.state || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.state || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
              <h4 className="text-lg font-bold text-slate-800 mb-4">Account Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Email Verified</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Profile Complete</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div className="w-3/4 bg-blue-500 rounded-full h-2"></div>
                    </div>
                    <span className="text-sm text-slate-600">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Member Since</span>
                  <span className="text-sm text-slate-600">Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
              <h4 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">View NEET PG Resources</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Specialty Predictor</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700">Counseling Schedule</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
              <h4 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-700">Updated profile information</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-700">Accessed specialty predictor</p>
                    <p className="text-xs text-slate-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-700">Downloaded counseling guide</p>
                    <p className="text-xs text-slate-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {user.neetRank || "N/A"}
              </h3>
              <p className="text-slate-600">NEET Rank</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {user.examType || "N/A"}
              </h3>
              <p className="text-slate-600">Exam Type</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {user.category || "N/A"}
              </h3>
              <p className="text-slate-600">Category</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {user.examYear || "N/A"}
              </h3>
              <p className="text-slate-600">Exam Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfilePage;