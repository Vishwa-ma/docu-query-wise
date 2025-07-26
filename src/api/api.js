const API_BASE_URL = 'http://localhost:8000/api/v1';
const BEARER_TOKEN = 'af215d20c2561423c20b7ccdfbb4dbc6fe7c5bb9bc869dae38917c8de16368ca';

export const submitQuery = async (documents, questions) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hackrx/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify({
        documents,
        questions
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to process query');
  }
};