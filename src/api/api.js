// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_VERSION = "/api/v1";

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${API_VERSION}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: userData.name || userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  },

  // Verify email with token
  verifyEmail: async (token) => {
    return apiRequest(`/auth/verify-email/${token}`, {
      method: "GET",
    });
  },

  // Resend email verification
  resendEmailVerification: async (email) => {
    return apiRequest("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Get current user
  getMe: async (token) => {
    return apiRequest("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Logout user
  logout: async (token) => {
    return apiRequest("/auth/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export const leaderboardAPI = {
  // Get leaderboard with pagination
  getLeaderboard: async (page = 1, limit = 10) => {
    return apiRequest(`/leaderboard?page=${page}&limit=${limit}`);
  },

  // Get leaderboard statistics
  getStats: async () => {
    return apiRequest("/leaderboard/stats");
  },

  // Get user's rank and position
  getUserRank: async (userId) => {
    return apiRequest(`/leaderboard/user/${userId}`);
  },

  // Update user points
  updateUserPoints: async (userId, points, activityType, description) => {
    return apiRequest(`/leaderboard/user/${userId}/points`, {
      method: "PUT",
      body: JSON.stringify({
        points,
        activityType,
        description,
      }),
    });
  },

  // Recalculate all rankings
  recalculateRankings: async () => {
    return apiRequest("/leaderboard/recalculate", {
      method: "PUT",
    });
  },

  // Sync all users to leaderboard
  syncAllUsers: async () => {
    return apiRequest("/leaderboard/sync", {
      method: "POST",
    });
  },
};
export const activitiesAPI = {
  // Get recent activities for current user
  getRecentActivities: async (limit = 5) => {
    return apiRequest(`/activities/recent?limit=${limit}`);
  },

  // Create manual activity
  createActivity: async (activityData) => {
    return apiRequest("/activities", {
      method: "POST",
      body: JSON.stringify(activityData),
    });
  },

  // Scan QR code
  scanQRCode: async (qrCode, productName, location) => {
    return apiRequest("/activities/qr-scan", {
      method: "POST",
      body: JSON.stringify({
        qrCode,
        productName,
        location,
      }),
    });
  },

  // Get user activities with pagination
  getUserActivities: async (userId, page = 1, limit = 10) => {
    return apiRequest(`/activities/user/${userId}?page=${page}&limit=${limit}`);
  },

  // Get activity statistics
  getActivityStats: async () => {
    return apiRequest("/activities/stats");
  },
};

// Export default object with all APIs
const api = {
  auth: authAPI,
  leaderboard: leaderboardAPI,
  activities: activitiesAPI,
};

export default api;
