import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Search,
  X,
  Plus,
  ChevronDown,
  Building2,
  MapPin,
  Award,
  Filter,
} from "lucide-react";

interface ChoiceListsPageProps {
  onBack: () => void;
}

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Government" | "Private";
  course: string;
  quota: string;
  rank: number;
}

/**
 * Enhanced Choice Lists Page Component based on the provided design
 * Features create choice list modal, college search, and management
 */
const ChoiceListsPage: React.FC<ChoiceListsPageProps> = ({ onBack }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchCounselling, setSearchCounselling] = useState("");
  const [selectedCounselling, setSelectedCounselling] = useState("");
  const [choiceLists, setChoiceLists] = useState<any[]>([]);

  // Sample counselling options
  const counsellingOptions = [
    "Chandigarh - PG Medical",
    "Chhattisgarh - PG Medical", 
    "CPS - PG Medical",
    "Delhi - PG Medical",
    "DNB - Inservice Seats - PG Medical",
    "DNB - PDCET - PG Medical",
    "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
  ];

  // Sample colleges data (would come from your 1570 colleges database)
  const sampleColleges: College[] = [
    {
      id: "1",
      name: "All India Institute of Medical Sciences, New Delhi",
      location: "New Delhi",
      state: "Delhi",
      type: "Government",
      course: "MBBS",
      quota: "All India",
      rank: 1,
    },
    {
      id: "2", 
      name: "Christian Medical College, Vellore",
      location: "Vellore",
      state: "Tamil Nadu",
      type: "Private",
      course: "MBBS",
      quota: "All India",
      rank: 2,
    },
    // Add more colleges as needed
  ];

  const filteredCounsellingOptions = counsellingOptions.filter(option =>
    option.toLowerCase().includes(searchCounselling.toLowerCase())
  );

  const handleCreateChoiceList = () => {
    if (selectedCounselling) {
      const newList = {
        id: Date.now().toString(),
        name: selectedCounselling,
        colleges: [],
        createdAt: new Date(),
      };
      setChoiceLists([...choiceLists, newList]);
      setShowCreateModal(false);
      setSelectedCounselling("");
      setSearchCounselling("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">My Choice Lists</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create Counselling specific Choice lists to curate your choices (preferred order of seats) specific to each counselling.
            </h2>
            <p className="text-gray-600 mb-6">
              You can add to a preferred seat to a Choice list from the Allotments, Closing Ranks, Seat Matrix, and Fee, Stipend & Bond menus.
            </p>
            
            {choiceLists.length === 0 ? (
              <div className="mb-8">
                <p className="text-gray-500 mb-6">
                  You don't have any choice lists currently. Create one here or add from any of the sections.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 mb-8">
                {choiceLists.map((list) => (
                  <div key={list.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">{list.name}</h3>
                    <p className="text-sm text-gray-600">{list.colleges.length} colleges</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Choice List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Choice List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Create Choice List</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">Please select a counselling to continue</p>
                
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Counselling"
                    value={searchCounselling}
                    onChange={(e) => setSearchCounselling(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredCounsellingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCounselling(option)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        selectedCounselling === option ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs">🏥</span>
                        </div>
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChoiceList}
                  disabled={!selectedCounselling}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceListsPage;