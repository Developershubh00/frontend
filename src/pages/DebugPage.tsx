// import React, { useState, useEffect } from "react";

// const DebugPage: React.FC = () => {
//   const [backendStatus, setBackendStatus] = useState<string>("Checking...");
//   const [frontendStatus, setFrontendStatus] = useState<string>("Frontend is working!");

//   useEffect(() => {
//     // Test backend connectivity
//     fetch("http://127.0.0.1:8000/health/")
//       .then(response => response.json())
//       .then(data => {
//         setBackendStatus(`Backend: ${data.status} - ${data.message}`);
//       })
//       .catch(error => {
//         setBackendStatus(`Backend Error: ${error.message}`);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//               <span className="text-white font-bold text-2xl">BD</span>
//             </div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//               Debug Page
//             </h1>
//             <p className="text-slate-600">Testing connectivity and functionality</p>
//           </div>

//           <div className="space-y-6">
//             <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
//               <h3 className="font-semibold text-green-800 mb-2">✅ Frontend Status</h3>
//               <p className="text-green-700">{frontendStatus}</p>
//             </div>

//             <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
//               <h3 className="font-semibold text-blue-800 mb-2">🔗 Backend Status</h3>
//               <p className="text-blue-700">{backendStatus}</p>
//             </div>

//             <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
//               <h3 className="font-semibold text-purple-800 mb-2">📱 Browser Info</h3>
//               <p className="text-purple-700">
//                 User Agent: {navigator.userAgent}
//               </p>
//               <p className="text-purple-700">
//                 URL: {window.location.href}
//               </p>
//             </div>

//             <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
//               <h3 className="font-semibold text-orange-800 mb-2">🧪 Test Functions</h3>
//               <button 
//                 onClick={() => alert("JavaScript is working!")}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mr-2"
//               >
//                 Test Alert
//               </button>
//               <button 
//                 onClick={() => {
//                   const testData = { test: "data", timestamp: Date.now() };
//                   localStorage.setItem("debugTest", JSON.stringify(testData));
//                   alert("LocalStorage test completed!");
//                 }}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 Test LocalStorage
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DebugPage;

import React, { useState, useEffect } from "react";

const DebugPage: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<string>("Checking...");
  const [frontendStatus, setFrontendStatus] = useState<string>("Frontend is working!");
  const [dbStatus, setDbStatus] = useState<string>("Not checked yet");
  const [errorStatus, setErrorStatus] = useState<string>("No errors detected");

  useEffect(() => {
    // Test backend connectivity
    fetch("http://127.0.0.1:8000/health/")
      .then(response => response.json())
      .then(data => {
        setBackendStatus(`Backend: ${data.status} - ${data.message}`);
      })
      .catch(error => {
        setBackendStatus(`Backend Error: ${error.message}`);
      });
  }, []);

  // Function: Test Database connection
  const testDatabase = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/db-check/");
      const data = await response.json();
      setDbStatus(`Database: ${data.status} - ${data.message}`);
    } catch (error: any) {
      setDbStatus(`Database Error: ${error.message}`);
    }
  };

  // Function: Check Errors (frontend/backend/db)
  const testErrors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/system-check/");
      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        setErrorStatus(`Errors found: ${data.errors.join(", ")}`);
      } else {
        setErrorStatus("✅ No errors detected in frontend, backend, or database");
      }
    } catch (error: any) {
      setErrorStatus(`System Check Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">BD</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Debug Page
            </h1>
            <p className="text-slate-600">Testing connectivity and functionality</p>
          </div>

          <div className="space-y-6">
            {/* ✅ Frontend Status */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">✅ Frontend Status</h3>
              <p className="text-green-700">{frontendStatus}</p>
            </div>

            {/* 🔗 Backend Status */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">🔗 Backend Status</h3>
              <p className="text-blue-700">{backendStatus}</p>
            </div>

            {/* 🗄 Database Status */}
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl">
              <h3 className="font-semibold text-pink-800 mb-2">🗄 Database Status</h3>
              <p className="text-pink-700">{dbStatus}</p>
            </div>

            {/* ⚠️ Error Status */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Error Status</h3>
              <p className="text-red-700">{errorStatus}</p>
            </div>

            {/* 📱 Browser Info */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-2">📱 Browser Info</h3>
              <p className="text-purple-700">User Agent: {navigator.userAgent}</p>
              <p className="text-purple-700">URL: {window.location.href}</p>
            </div>

            {/* 🧪 Test Functions */}
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <h3 className="font-semibold text-orange-800 mb-2">🧪 Test Functions</h3>
              <button 
                onClick={() => alert("JavaScript is working!")}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mr-2"
              >
                Test Alert
              </button>
              <button 
                onClick={() => {
                  const testData = { test: "data", timestamp: Date.now() };
                  localStorage.setItem("debugTest", JSON.stringify(testData));
                  alert("LocalStorage test completed!");
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mr-2"
              >
                Test LocalStorage
              </button>
              {/* New Button: Test Database */}
              <button 
                onClick={testDatabase}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mr-2"
              >
                Test Database
              </button>
              {/* New Button: Check Errors */}
              <button 
                onClick={testErrors}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Check Errors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
