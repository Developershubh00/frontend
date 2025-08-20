import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Award,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
} from "lucide-react";

// Define a User type for profile data

// Props for ProfilePage
interface ProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onLogout }) => {
  const { user, updateProfile } = useAuth(); // ✅ get from context
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user as User);

  // Update local edit state if context user changes
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  // Save handler
  const handleSave = async () => {
    try {
      await updateProfile(editedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Fallback loading state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Profile</h1>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {user.avatar}
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Camera className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mt-4">{user.name}</h2>
              <p className="text-slate-600">Medical Aspirant</p>
            </div>

            {/* Editable Info */}
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
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

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <InputBlock
                  label="Email"
                  icon={<Mail className="w-4 h-4 inline mr-2" />}
                  value={isEditing ? editedUser.email : user.email}
                  editable={isEditing}
                  onChange={(val) => setEditedUser({ ...editedUser, email: val, id: editedUser.id })}
                />

                {/* Phone */}
                <InputBlock
                  label="Phone"
                  icon={<Phone className="w-4 h-4 inline mr-2" />}
                  value={isEditing ? editedUser.phone : user.phone}
                  editable={isEditing}
                  onChange={(val) => setEditedUser({ ...editedUser, phone: val, id: editedUser.id })}
                />

                {/* NEET Rank */}
                <InputBlock
                  label="NEET Rank"
                  icon={<Award className="w-4 h-4 inline mr-2" />}
                  value={isEditing ? editedUser.neetRank : user.neetRank}
                  editable={isEditing}
                  onChange={(val) => setEditedUser({ ...editedUser, neetRank: val, id: editedUser.id })}
                />

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" /> Category
                  </label>
                  {isEditing ? (
                    <select
                      value={editedUser.category}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, category: e.target.value, id: editedUser.id })
                      }
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {user.category}
                    </p>
                  )}
                </div>

                {/* State */}
                <InputBlock
                  label="State"
                  icon={<MapPin className="w-4 h-4 inline mr-2" />}
                  value={isEditing ? editedUser.state : user.state}
                  editable={isEditing}
                  onChange={(val) => setEditedUser({ ...editedUser, state: val, id: editedUser.id })}
                  spanFull
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Award className="w-8 h-8 text-white" />} color="from-blue-400 to-purple-500" value="12,345" label="NEET Rank" />
          <StatCard icon={<User className="w-8 h-8 text-white" />} color="from-green-400 to-emerald-500" value="28" label="Choice Lists" />
          <StatCard icon={<MapPin className="w-8 h-8 text-white" />} color="from-orange-400 to-red-500" value="5" label="States Applied" />
        </div>
      </div>
    </div>
  );
};

// Reusable Input Block
const InputBlock = ({
  label,
  icon,
  value,
  editable,
  onChange,
  spanFull = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  editable: boolean;
  onChange: (value: string) => void;
  spanFull?: boolean;
}) => (
  <div className={spanFull ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {icon} {label}
    </label>
    {editable ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <p className="p-3 bg-slate-50 rounded-xl text-slate-700">{value}</p>
    )}
  </div>
);

// Reusable Stat Card
const StatCard = ({
  icon,
  color,
  value,
  label,
}: {
  icon: React.ReactNode;
  color: string;
  value: string;
  label: string;
}) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
    <div className="text-center">
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{value}</h3>
      <p className="text-slate-600">{label}</p>
    </div>
  </div>
);

export default ProfilePage;
