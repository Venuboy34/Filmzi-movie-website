const API_BASE = 'https://movie-database-real-working-mx21.vercel.app';

export const getAllMedia = async () => {
  try {
    const response = await fetch(`${API_BASE}/media`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all media:', error);
    return [];
  }
};

export const getMediaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/media/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching media with ID ${id}:`, error);
    return null;
  }
};

export const searchMedia = async (query, type = null) => {
  try {
    let url = `${API_BASE}/media`;
    if (query) {
      url = `${API_BASE}/search?q=${encodeURIComponent(query)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    // Filter by type if specified
    if (type) {
      return data.filter(item => item.type === type);
    }
    
    return data;
  } catch (error) {
    console.error('Error searching media:', error);
    return [];
  }
};

export const getStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
};
