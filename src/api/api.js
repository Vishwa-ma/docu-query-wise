import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const BEARER_TOKEN = 'af215d20c2561423c20b7ccdfbb4dbc6fe7c5bb9bc869dae38917c8de16368ca';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`
  }
});

export const submitQuery = async (documents, questions) => {
  try {
    const response = await api.post('/hackrx/run', {
      documents,
      questions
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to process query');
  }
};

export default api;