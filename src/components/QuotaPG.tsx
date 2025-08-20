// // components/QuotaPG.tsx
// import React from "react";

// const quotas = [
//   "AIQ",
//   "DNB Post MBBS",
//   "NBE Diploma",
//   "MNG",
//   "MM",
//   "JM",
//   "NRI",
//   "DU",
//   "IP",
//   "BHU",
//   "AMU",
//   "CIQ",
//   "AFMS",
//   "AFMS-DNB",
// ];

// const QuotaPG = () => {
//   return (
//     <table className="min-w-full text-left text-sm">
//       <thead className="text-gray-700 font-bold">
//         <tr>
//           <th>PG Quotas</th>
//         </tr>
//       </thead>
//       <tbody>
//         {quotas.map((quota, index) => (
//           <tr key={index} className="border-t">
//             <td className="py-2">{quota}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default QuotaPG;

const pgQuotas = [
    "AIQ", "DNB Post MBBS", "NBE Diploma", "MNG", "MM", "JM", "NRI",
    "DU", "IP", "BHU", "AMU", "CIQ", "AFMS", "AFMS-DNB"
  ];
  
  const QuotaPG = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pgQuotas.map((quota, index) => (
          <div
            key={index}
            className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-black-200 text-sm text-black"
          >
            {quota}
          </div>
        ))}
      </div>
    );
  };
  
  export default QuotaPG;
  