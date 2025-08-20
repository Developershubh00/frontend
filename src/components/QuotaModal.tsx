// components/QuotaModal.tsx
import React, { useState } from "react";
import QuotaUG from "./QuotaUG";
import QuotaPG from "./QuotaPG";

interface QuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotaModal: React.FC<QuotaModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<"UG" | "PG">("UG");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-black">Quota Information</h2>

        <div className="flex justify-center mb-4 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${tab === "UG" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setTab("UG")}
          >
            UG
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${tab === "PG" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setTab("PG")}
          >
            PG
          </button>
        </div>

        <div className="overflow-y-auto max-h-[400px]">
          {tab === "UG" ? <QuotaUG /> : <QuotaPG />}
        </div>
      </div>
    </div>
  );
};

export default QuotaModal;
