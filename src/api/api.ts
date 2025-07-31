const API_BASE_URL = 'http://localhost:8000/api/v1';
const BEARER_TOKEN = 'af215d20c2561423c20b7ccdfbb4dbc6fe7c5bb9bc869dae38917c8de16368ca';

export interface AnalysisRequest {
  documents: string;
  questions: string[];
}

export interface AnalysisResponse {
  answers: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage: string;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.detail || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as unknown as T;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async analyzeDocuments(data: AnalysisRequest): Promise<AnalysisResponse> {
    return this.makeRequest<AnalysisResponse>('/hackrx/run', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const apiClient = new ApiClient(API_BASE_URL, BEARER_TOKEN);

export default apiClient;