const ugQuotas = [
    "CW of Armed Forces Personnel", "BHU - Open", "JIPMER - NRI", "All India Quota",
    "Jamia internal", "AMU - NRI", "Deemed NRI", "ESI insured persons", "AIIMS - Open",
    "IP Univ - IP Quota (State)", "Jamia NRI", "Jamia Muslim", "Jamia - Open",
    "JIPMER - Open", "AMU - Self Financing Open", "Deemed Muslim Minority",
    "Delhi Univ - CW", "AIIMS - Foreign Nationals", "AMU - Internal", "AMU - Open",
    "Deemed Jain Minority", "Deemed Paid Seats", "Delhi Univ - State Quota",
    "IP Univ - CW", "Jamia Muslim Women", "JIPMER - Pondicherry Domicile"
  ];
  
  const QuotaUG = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ugQuotas.map((quota, index) => (
          <div
            key={index}
            className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 text-sm text-black"
          >
            {quota}
          </div>
        ))}
      </div>
    );
  };
  
  export default QuotaUG;
  