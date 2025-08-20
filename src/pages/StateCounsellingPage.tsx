import React, { useEffect, useState } from "react";
import axios from "axios";
import StateTabs from "./StateTabs"; // adjust the path accordingly

interface College {
  id: number;
  name: string;
  state: string;
  type: string; // "All India" or "State"
}

const StateCounsellingPage: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [activeTab, setActiveTab] = useState("all-india");
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/colleges") // Replace with your real API endpoint
      .then((res) => {
        setColleges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch colleges", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filtering logic based on tab id
    const filterByTab = () => {
      switch (activeTab) {
        case "all-india":
          return colleges.filter((c) => c.type === "All India");
        case "andhra":
          return colleges.filter((c) => c.state.toLowerCase() === "andhra pradesh");
        case "assam":
          return colleges.filter((c) => c.state.toLowerCase() === "assam");
        case "maharashtra":
          return colleges.filter((c) => c.state.toLowerCase() === "maharashtra");
        case "karnataka":
          return colleges.filter((c) => c.state.toLowerCase() === "karnataka");
        default:
          return [];
      }
    };

    const filtered = filterByTab();
    setFilteredColleges(filtered);
  }, [activeTab, colleges]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs Header */}
      <StateTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* College List */}
      <div className="p-6">
        {loading ? (
          <p className="text-gray-500">Loading colleges...</p>
        ) : filteredColleges.length === 0 ? (
          <p className="text-gray-400">No colleges found for this tab.</p>
        ) : (
          <ul className="space-y-4">
            {filteredColleges.map((college) => (
              <li
                key={college.id}
                className="p-4 bg-white border border-gray-200 rounded shadow"
              >
                <h3 className="text-lg font-semibold">{college.name}</h3>
                <p className="text-sm text-gray-600">
                  State: {college.state} | Type: {college.type}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StateCounsellingPage;
