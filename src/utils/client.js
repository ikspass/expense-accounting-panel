// src/api/client.js

// Базовый URL API
// src/api/client.js
const API_BASE_URL = "/api"; // теперь через прокси

// Твой ключ приложения (в реальном проекте лучше хранить в .env)
const APP_KEY = "app3_68a192ffe001e"; // TODO: заменить на реальный ключ

// Универсальная функция для запросов
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-App-Key": APP_KEY,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка запроса");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Функции для работы с API
export const authAPI = {
  // Регистрация
  register: (userData) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Вход (логин)
  login: (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

// Для работы с транзакциями (понадобится позже)
export const transactionsAPI = {
  create: (token, transactionData) => {
    return apiRequest("/transactions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });
  },

  getAll: (token, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/transactions${queryParams ? `?${queryParams}` : ""}`;

    return apiRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Для получения категорий
export const categoriesAPI = {
  getExpenseCategories: () => {
    return apiRequest("/categories?type=expense");
  },
};
