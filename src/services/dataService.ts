import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend.onrender.com';

// API client instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for different data structures
export interface AllotmentData {
  id: string;
  college: string;
  specialty: string;
  category: string;
  quota: string;
  round: number;
  rank: number;
}

export interface ClosingRankData {
  id: string;
  college: string;
  specialty: string;
  category: string;
  opening_rank: number;
  closing_rank: number;
  year: number;
}

export interface SeatMatrixData {
  id: string;
  college: string;
  specialty: string;
  total_seats: number;
  aiq_seats: number;
  state_seats: number;
  management_seats: number;
}

export interface FeeStipendBondData {
  id: string;
  college: string;
  specialty: string;
  fee: number;
  stipend: number;
  bond: string;
  bond_amount: number;
}

// Data service class
class DataService {
  // Get allotment data based on tab
  async getAllotments(tabId: string, filters?: any): Promise<AllotmentData[]> {
    try {
      const response = await apiClient.get(`/allotments/${tabId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching allotments:', error);
      // Return mock data for development
      return this.getMockAllotments(tabId);
    }
  }

  // Get closing ranks data based on tab
  async getClosingRanks(tabId: string, filters?: any): Promise<ClosingRankData[]> {
    try {
      const response = await apiClient.get(`/closing-ranks/${tabId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching closing ranks:', error);
      // Return mock data for development
      return this.getMockClosingRanks(tabId);
    }
  }

  // Get seat matrix data based on tab
  async getSeatMatrix(tabId: string, filters?: any): Promise<SeatMatrixData[]> {
    try {
      const response = await apiClient.get(`/seat-matrix/${tabId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching seat matrix:', error);
      // Return mock data for development
      return this.getMockSeatMatrix(tabId);
    }
  }

  // Get fee, stipend & bond data based on tab
  async getFeeStipendBond(tabId: string, filters?: any): Promise<FeeStipendBondData[]> {
    try {
      const response = await apiClient.get(`/fee-stipend-bond/${tabId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching fee stipend bond data:', error);
      // Return mock data for development
      return this.getMockFeeStipendBond(tabId);
    }
  }

  // Mock data generators for development
  private getMockAllotments(tabId: string): AllotmentData[] {
    const colleges = [
      'AIIMS Delhi', 'JIPMER Puducherry', 'Maulana Azad Medical College',
      'Lady Hardinge Medical College', 'Vardhman Mahavir Medical College',
      'Safdarjung Hospital', 'Ram Manohar Lohia Hospital', 'Guru Teg Bahadur Hospital'
    ];
    
    const specialties = [
      'General Medicine', 'Pediatrics', 'Obstetrics & Gynecology', 'Orthopedics',
      'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Pathology'
    ];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: `allotment-${i}`,
      college: colleges[i % colleges.length],
      specialty: specialties[i % specialties.length],
      category: ['General', 'OBC', 'SC', 'ST', 'EWS'][i % 5],
      quota: ['AIQ', 'State', 'Management'][i % 3],
      round: [1, 2, 3][i % 3],
      rank: 1000 + i * 50
    }));
  }

  private getMockClosingRanks(tabId: string): ClosingRankData[] {
    const colleges = [
      'AIIMS Delhi', 'JIPMER Puducherry', 'Maulana Azad Medical College',
      'Lady Hardinge Medical College', 'Vardhman Mahavir Medical College',
      'Safdarjung Hospital', 'Ram Manohar Lohia Hospital', 'Guru Teg Bahadur Hospital'
    ];
    
    const specialties = [
      'General Medicine', 'Pediatrics', 'Obstetrics & Gynecology', 'Orthopedics',
      'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Pathology'
    ];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: `closing-rank-${i}`,
      college: colleges[i % colleges.length],
      specialty: specialties[i % specialties.length],
      category: ['General', 'OBC', 'SC', 'ST', 'EWS'][i % 5],
      opening_rank: 500 + i * 25,
      closing_rank: 1000 + i * 50,
      year: 2024
    }));
  }

  private getMockSeatMatrix(tabId: string): SeatMatrixData[] {
    const colleges = [
      'AIIMS Delhi', 'JIPMER Puducherry', 'Maulana Azad Medical College',
      'Lady Hardinge Medical College', 'Vardhman Mahavir Medical College',
      'Safdarjung Hospital', 'Ram Manohar Lohia Hospital', 'Guru Teg Bahadur Hospital'
    ];
    
    const specialties = [
      'General Medicine', 'Pediatrics', 'Obstetrics & Gynecology', 'Orthopedics',
      'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Pathology'
    ];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: `seat-matrix-${i}`,
      college: colleges[i % colleges.length],
      specialty: specialties[i % specialties.length],
      total_seats: 100 + (i % 5) * 20,
      aiq_seats: 30 + (i % 3) * 10,
      state_seats: 40 + (i % 4) * 8,
      management_seats: 20 + (i % 2) * 5
    }));
  }

  private getMockFeeStipendBond(tabId: string): FeeStipendBondData[] {
    const colleges = [
      'AIIMS Delhi', 'JIPMER Puducherry', 'Maulana Azad Medical College',
      'Lady Hardinge Medical College', 'Vardhman Mahavir Medical College',
      'Safdarjung Hospital', 'Ram Manohar Lohia Hospital', 'Guru Teg Bahadur Hospital'
    ];
    
    const specialties = [
      'General Medicine', 'Pediatrics', 'Obstetrics & Gynecology', 'Orthopedics',
      'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Pathology'
    ];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: `fee-stipend-bond-${i}`,
      college: colleges[i % colleges.length],
      specialty: specialties[i % specialties.length],
      fee: 10000 + (i % 5) * 5000,
      stipend: 50000 + (i % 3) * 10000,
      bond: `${1 + (i % 3)} year${1 + (i % 3) > 1 ? 's' : ''}`,
      bond_amount: 1000000 + (i % 4) * 500000
    }));
  }

  private getMockMedicalColleges() {
    return {
      colleges: [
        {
          id: 1,
          name: "AIIMS Delhi",
          state: "Delhi",
          type: "Government",
          nirf_rank: 1,
          established: 1956,
          courses: ["MBBS", "MD", "MS", "DM", "MCh"]
        },
        {
          id: 2,
          name: "JIPMER Puducherry",
          state: "Puducherry",
          type: "Government",
          nirf_rank: 2,
          established: 1823,
          courses: ["MBBS", "MD", "MS", "DM", "MCh"]
        }
      ],
      count: 2
    };
  }

  private getMockRankPredictor() {
    return {
      ug_predictor: {
        categories: ["General", "OBC", "SC", "ST", "EWS"],
        colleges: ["AIIMS Delhi", "JIPMER Puducherry", "Maulana Azad Medical College"]
      },
      pg_predictor: {
        categories: ["General", "OBC", "SC", "ST", "EWS"],
        specialties: ["MD General Medicine", "MD Pediatrics", "MS General Surgery"]
      }
    };
  }

  private getMockCollegeDatabase() {
    return {
      colleges: [
        {
          id: 1,
          name: "AIIMS Delhi",
          state: "Delhi",
          type: "Government",
          nirf_rank: 1,
          total_seats: 100,
          fee_structure: "Affordable",
          facilities: ["Library", "Hostel", "Sports", "Research Labs"]
        }
      ],
      count: 1
    };
  }

  private getMockFAQs() {
    return {
      faqs: [
        {
          id: 1,
          question: "When will NEET PG 2025 results be announced?",
          answer: "NEET PG 2025 results have been announced. You can check them on the official NBE website.",
          category: "NEET PG"
        },
        {
          id: 2,
          question: "How to apply for NEET PG counselling?",
          answer: "Visit the MCC website and register for counselling with your NEET PG scorecard.",
          category: "Counselling"
        }
      ],
      count: 2
    };
  }

  private getMockFAQCategories() {
    return {
      categories: ["NEET UG", "NEET PG", "Counselling", "Admission", "Documents"],
      count: 5
    };
  }

  // Get tab-specific statistics
  async getTabStatistics(tabId: string) {
    try {
      const response = await apiClient.get(`/statistics/${tabId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tab statistics:', error);
      return {
        totalColleges: 150,
        totalSeats: 50000,
        averageRank: 25000,
        year: 2024
      };
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const response = await apiClient.get('/api/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        categories: [
          "All India Counseling - PG Medical",
          "Andhra Pradesh Government Quota - PG Medical",
          "Maharashtra - PG Medical",
          "Karnataka - PG Medical"
        ],
        count: 4
      };
    }
  }

  // Get category summary
  async getCategorySummary(category: string) {
    try {
      const response = await apiClient.get(`/api/category/summary/${encodeURIComponent(category)}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category summary:', error);
      return {
        category: category,
        summary: {
          allotments: 150,
          closing_ranks: 200,
          seat_matrix: 100,
          fee_stipend_bond: 80
        },
        total_records: 530
      };
    }
  }

  // Get allotments by category
  async getCategoryAllotments(category: string) {
    try {
      const response = await apiClient.get(`/api/category/allotments/${encodeURIComponent(category)}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category allotments:', error);
      return {
        category: category,
        count: 150,
        data: this.getMockAllotments(category)
      };
    }
  }

  // Get closing ranks by category
  async getCategoryClosingRanks(category: string) {
    try {
      const response = await apiClient.get(`/api/category/closing-ranks/${encodeURIComponent(category)}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category closing ranks:', error);
      return {
        category: category,
        count: 200,
        data: this.getMockClosingRanks(category)
      };
    }
  }

  // Get seat matrix by category
  async getCategorySeatMatrix(category: string) {
    try {
      const response = await apiClient.get(`/api/category/seat-matrix/${encodeURIComponent(category)}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category seat matrix:', error);
      return {
        category: category,
        count: 100,
        data: this.getMockSeatMatrix(category)
      };
    }
  }

  // Get fee, stipend & bond by category
  async getCategoryFeeStipendBond(category: string) {
    try {
      const response = await apiClient.get(`/api/category/fee-stipend-bond/${encodeURIComponent(category)}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category fee stipend bond:', error);
      return {
        category: category,
        count: 80,
        data: this.getMockFeeStipendBond(category)
      };
    }
  }

  // Get medical colleges
  async getMedicalColleges() {
    try {
      const response = await apiClient.get('/medical-colleges/');
      return response.data;
    } catch (error) {
      console.error('Error fetching medical colleges:', error);
      return this.getMockMedicalColleges();
    }
  }

  // Get rank predictor
  async getRankPredictor() {
    try {
      const response = await apiClient.get('/rank-predictor/');
      return response.data;
    } catch (error) {
      console.error('Error fetching rank predictor:', error);
      return this.getMockRankPredictor();
    }
  }

  // Get college database
  async getCollegeDatabase() {
    try {
      const response = await apiClient.get('/college-database/');
      return response.data;
    } catch (error) {
      console.error('Error fetching college database:', error);
      return this.getMockCollegeDatabase();
    }
  }

  // Get FAQs
  async getFAQs() {
    try {
      const response = await apiClient.get('/api/faqs/');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return this.getMockFAQs();
    }
  }

  // Get FAQ categories
  async getFAQCategories() {
    try {
      const response = await apiClient.get('/api/faq-categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ categories:', error);
      return this.getMockFAQCategories();
    }
  }

  // Search functionality
  async searchData(tabId: string, searchTerm: string, dataType: string) {
    try {
      const response = await apiClient.get(`/search/${tabId}`, {
        params: { q: searchTerm, type: dataType }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching data:', error);
      return [];
    }
  }

  // Filter data
  async filterData(tabId: string, filters: any, dataType: string) {
    try {
      const response = await apiClient.get(`/filter/${tabId}`, {
        params: { ...filters, type: dataType }
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering data:', error);
      return [];
    }
  }
}

// Export singleton instance
export const dataService = new DataService();
export default dataService;
