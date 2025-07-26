const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () =>
  localStorage.getItem("access_token") ||
  localStorage.getItem("admin_access_token");
const getRefreshToken = () =>
  localStorage.getItem("refresh_token") ||
  localStorage.getItem("admin_refresh_token");
const saveToken = (token) =>
  localStorage.setItem("access_token", token) ||
  localStorage.setItem("admin_access_token", token);
const saveRefreshToken = (token) =>
  localStorage.setItem("refresh_token", token);
const clearTokens = () => {
  localStorage.removeItem("access_token") ||
    localStorage.removeItem("admin_access_token");
  localStorage.removeItem("refresh_token") ||
    localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("verify_email");
};

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const res = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(" Token refresh failed:", data);
    clearTokens(); // Clear invalid tokens
    throw new Error(data.detail || "Failed to refresh token");
  }

  saveToken(data.access);
  return data.access;
}

const request = async (
  method,
  endpoint,
  body = null,
  isForm = false,
  retry = true
) => {
  let token = getToken();
  const isAuthRoute = endpoint.startsWith("/auth/");

  // If we don't have a token and this isn't an auth route, redirect to login
  if (!token && !isAuthRoute) {
    clearTokens();
    window.location.href = "/login";
    throw new Error("No authentication token found");
  }

  const headers = {
    ...(isForm ? {} : { "Content-Type": "application/json" }),
    ...(token && !isAuthRoute && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: isForm ? body : body ? JSON.stringify(body) : null,
    });

    // If unauthorized and we can retry, try to refresh the token
    if (response.status === 401 && !isAuthRoute && retry) {
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Update the token in the headers and retry the request
          const newHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };
          const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: newHeaders,
            body: isForm ? body : body ? JSON.stringify(body) : null,
          });
          return await handleResponse(retryResponse);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        clearTokens();
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
    }

    return await handleResponse(response);
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

// Helper function to handle response and parse JSON
async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data;

  try {
    data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch (e) {
    console.error("Failed to parse response:", e);
    throw new Error("Failed to parse server response");
  }

  if (!response.ok) {
    // Handle token expiration specifically
    if (response.status === 401 && data?.code === "token_not_valid") {
      clearTokens();
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    const errorMessage = getErrorMessage(
      data,
      response.status,
      response.statusText
    );
    const error = new Error(errorMessage);
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
}

function getErrorMessage(data, status, statusText) {
  if (data) {
    return (
      data?.non_field_errors?.[0] ||
      data?.email?.[0] ||
      data?.code?.[0] ||
      data?.password1?.[0] ||
      data?.password2?.[0] ||
      data?.detail ||
      data?.message ||
      `Request failed with status ${status} (${statusText})`
    );
  }
  return `Request failed with status ${status} (${statusText})`;
}

// ✅ Standard HTTP methods
export const get = (endpoint) => request("GET", endpoint);
export const post = (endpoint, body, isForm = false) =>
  request("POST", endpoint, body, isForm);
export const put = (endpoint, body) => request("PUT", endpoint, body);
export const patch = (endpoint, body) => request("PATCH", endpoint, body);
export const del = (endpoint) => request("DELETE", endpoint);

// 🔐 Auth Functions
export const postLogin = (email, password) =>
  post("/auth/login/", { email, password });

export const postRegister = (email, password1, password2) => {
  // Store email for verification
  localStorage.setItem("verify_email", email);
  return post("/auth/register/", { email, password1, password2 });
};

export const changePassword = (data) => patch("/auth/change-password/", data);

export const verifyEmail = (email, code) =>
  post("/auth/verify-email/", { email, code });

export const resendVerification = (email) =>
  post("/auth/resend-verification/", { email });

export const forgotPassword = (email) =>
  post("/auth/forgot-password/", { email });

export const resetPassword = (email, code, newPassword) =>
  post("/auth/reset-password/", {
    email,
    code,
    new_password: newPassword,
  });

export const requestPasswordReset = (email) =>
  post("/auth/password/reset/", { email });

export const confirmPasswordReset = (
  uidb64,
  token,
  new_password1,
  new_password2
) =>
  post(`/auth/password/reset/confirm/${uidb64}/${token}/`, {
    new_password1,
    new_password2,
  });

// Utility functions
export const isAuthenticated = () => !!getToken();
export const logout = () => {
  post("/auth/logout/");
  clearTokens();
  window.location.href = "/";
};

// 📸 Image upload - Updated to use the standard request function
export async function uploadProfilePhoto(file) {
  const formData = new FormData();
  formData.append("image", file); // ✅ use the 'file' argument passed in
  return await post("/profile/photos/upload/", formData, true);
}

// 📊 Dashboard APIs
export const getDashboardStats = () => get("/admin/dashboard/stats/");
export const getPopularProfiles = () =>
  get("/admin/dashboard/popular-profiles/");
export const getTopLocations = () => get("/admin/dashboard/top-locations/");
export const getUserGrowth = () => get("/admin/dashboard/user-growth/");

// 📋 Reports APIs
export const getReports = () => get("/admin/reports/");
export const getReportById = (reportId) => get(`/admin/reports/${reportId}/`);
export const patchReportById = (reportId, data) =>
  patch(`/admin/reports/${reportId}/`, data);
export const putReportById = (reportId, data) =>
  put(`/admin/reports/${reportId}/`, data); // optional: full replace
export const deleteReportById = (reportId) =>
  del(`/admin/reports/${reportId}/`);

// 👥 Admin Users APIs
export const getUsers = () => get("/admin/users/");
export const getUserById = (userId) => get(`/admin/users/${userId}/`);
export const patchUserById = (userId, data) =>
  patch(`/admin/users/${userId}/`, data);
export const putUserById = (userId, data) =>
  put(`/admin/users/${userId}/`, data); // optional: full replace
export const deleteUserById = (userId) => del(`/admin/users/${userId}/`);
export const banUserById = (userId) => post(`/admin/users/${userId}/ban/`);
export const suspendUserById = (userId) =>
  post(`/admin/users/${userId}/suspend/`);

// 👨‍💼 Admin Management APIs
export const getAdmins = () => get("/admin/admins/");
export const createAdmin = (data) => post("/admin/admins/", data);
export const getAdminById = (adminId) => get(`/admin/admins/${adminId}/`);
export const patchAdminById = (adminId, data) =>
  patch(`/admin/admins/${adminId}/`, data);
export const putAdminById = (adminId, data) =>
  put(`/admin/admins/${adminId}/`, data); // optional
export const deleteAdminById = (adminId) => del(`/admin/admins/${adminId}/`);

// 👤 User Profile APIs
// Read profile
export const fetchUserProfile = () => get("/profile/");

// Create profile
export const createUserProfile = (data) => post("/profile/create/", data);

// Update full profile
export const updateUserProfile = (data) => put("/profile/update/", data);

// Partial update
export const patchUserProfile = (data) => patch("/profile/update/", data);

// Delete photo
export const deleteProfilePhoto = (id) => del(`/profile/photos/delete/${id}/`);

// Set photo as primary
export const setPrimaryPhoto = (photoId) =>
  post(`/profile/photos/set-primary/${photoId}/`);

// Get account settings
export const fetchAccountSettings = () => get("/profile/settings/account/");

// Update account settings
export const updateAccountSettings = (data) =>
  put("/profile/settings/account/", data);

// Partially update account settings
export const patchAccountSettings = (data) =>
  patch("/profile/settings/account/", data);

// Match preferences (already in your code)
export const updateUserPreferences = (data) =>
  patch("/match-preferences/", data);

// Search for matches
export const searchMatches = (params) =>
  get("/profile/matches/search/", params);

// 💘 Matchmaking
export const sendLike = (targetUserId) =>
  post(`/matchmaking/like/${targetUserId}/`);
export const sendShortlist = (targetUserId) =>
  post(`/matchmaking/shortlist/${targetUserId}/`);
export const reportUser = (userId, data) =>
  post(`/matchmaking/report/${userId}/`, data);
export const blockUser = (userId) => post(`/matchmaking/block/${userId}/`);
export const fetchShortlisted = () => get("/matchmaking/shortlisted/");
export const updateMatchStatus = (userId, data) =>
  put(`/matchmaking/update-status/${userId}/`, data);
export const patchMatchStatus = (userId, data) =>
  patch(`/matchmaking/update-status/${userId}/`, data);
export const getProfileStatus = () => get("/matchmaking/user/profile-status/");
export const getActivityFeed = () => get("/matchmaking/user/activity-feed/");
export const getMatchesToday = () => get("/matchmaking/matches/today/");
export const getUnmessagedMatches = () =>
  get("/matchmaking/matches/unmessaged/");
export const getLikedUsers = () => get("/matchmaking/liked/");
export const getMutualMatches = () => get("/matchmaking/mutual/");
export const getPotentialMatches = () => get("/matchmaking/potential/");
export const getMatchmakingCounts = () => get("/matchmaking/counts/");
export const getMatchmakingDashboardSummary = () =>
  get("/matchmaking/dashboard/summary/");

// 💬 Matchmaking Chat
export const sendMessage = (receiverId, message) =>
  post("/matchmaking/chat/send-message/", { receiverId, message });
export const getChatRooms = () => get("/matchmaking/chat-rooms/");
export const getChatMessages = (roomId) =>
  get(`/matchmaking/chat-rooms/${roomId}/messages/`);
export const sendChatMessage = (roomId, data) =>
  post(`/matchmaking/chat-rooms/${roomId}/messages/`, data);

// 📨 Matchmaking Messages
export const getUnreadMessages = () => get("/matchmaking/messages/unread/");
export const getUnreadMessageCount = () =>
  get("/matchmaking/messages/unread/count/");

// 🔔 Notifications APIs
export const getNotifications = () => get("/notifications/");
export const markNotificationRead = () => post("/notifications/mark-read/");
export const getNotificationSettings = () => get("/notifications/settings/");
export const updateNotificationSettings = (data) =>
  put("/notifications/settings/", data);
export const patchNotificationSettings = (data) =>
  patch("/notifications/settings/", data);
export const getUnreadNotificationCount = () =>
  get("/notifications/unread/count/");

// 💞 Match Preferences APIs
export const getMatchPreferences = () => get("/match-preferences/");
export const updateMatchPreferences = (data) =>
  put("/match-preferences/", data);
export const patchMatchPreferences = (data) =>
  patch("/match-preferences/", data);
