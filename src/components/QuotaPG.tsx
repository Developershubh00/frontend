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
  