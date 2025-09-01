import { $host, $authHost } from ".";

// Аутентификация

export const register = async ({username, email, password}) => {
  try {
    const {data} = await $host.post('auth/register', {username, email, password});
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
} 

export const login = async ({username, password}) => {
  try {
    const {data} = await $host.post('auth/login', {username, password});
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error
  }
} 

export const forgotPassword = async (email) => {
  try {
    const {data} = await $host.post('auth/forgot-password', {email});
    return data;
  } catch (error) {
    throw error;
  }
}

export const resetPassword = async ({email, reset_code, new_password}) => {
  try {
    const {data} = await $host.post('auth/reset-password', {email, reset_code, new_password});
    return data;
  } catch (error) {
    throw error;
  }
}

// export const testEmail = async () => {
//   try {
//     const {data} = await $host.post('auth/test-email'});
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// Профиль пользователя

export const getProfile = async () => {
  const {data} = await $authHost.get('profile');
  return data;
} 

export const editProfile = async ({ full_name, phone, photo_url } = {}) => {
  const dataToUpdate = {};

  if (full_name) dataToUpdate.full_name = full_name;
  if (phone) dataToUpdate.phone = phone;
  if (photo_url) dataToUpdate.photo_url = photo_url;

  try {
    const { data } = await $authHost.put('profile', dataToUpdate);
    return data;
  } catch (error) {
    throw error;
  }
};

// Лимиты трат

export const getLimits = async () => {
  try {
    const {data} = await $authHost.get(`limits`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getLimitsByMonth = async (month) => {
  try {
    const {data} = await $authHost.get(`limits?month=${month}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const setLimits = async ({limit_amount, limit_month}) => {
  try {
    const {data} = await $authHost.post('limits', {limit_amount, limit_month});
    return data;
  } catch (error) {
    throw error;
  }
}

export const checkLimits = async (month) => {
  try {
    const {data} = await $authHost.get(`limits/check?month=${month}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// Категории

export const getCategories = async (type) => {
  // expense || income
  try {
    const {data} = await $authHost.get(`categories?type=${type}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

export const createCategory = async ({name, type, color, icon}) => {
  try {
    const {data} = await $authHost.post('categories', {name, type, color, icon});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const editCategory = async (id, {name, type, color, icon}) => {
  try {
    const {data} = await $authHost.put(`categories/${id}`, {name, type, color, icon});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const deleteCategory = async (id) => {
  try {
    const {data} = await $authHost.delete(`categories/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// Подкатегории

export const getSubCategories = async (category_id) => {
  try {
    const {data} = await $host.get(`subcategories?category_id=${category_id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

export const createSubCategory = async ({name, category_id}) => {
  try {
    const {data} = await $authHost.post('subcategories', {name, category_id});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const editSubCategory = async (id, {name}) => {
  try {
    const {data} = await $authHost.put(`subcategories/${id}`, {name});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const deleteSubCategory = async (id) => {
  try {
    const {data} = await $authHost.delete(`subcategories/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// Транзакции

export const getTransactions = async ({page, per_page, type, category_id, date_from, date_to}) => {
  try {
    const {data} = await $authHost.get(`transactions?page=${page}&per_page=${per_page}&type=${type}&category_id=${category_id}&date_from=${date_from}&date_to=${date_to}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

export const createTransaction = async ({category_id, subcategory_id, amount, type, payment_type, description, transaction_date}) => {
  try {
    const {data} = await $authHost.post('transactions', {category_id, subcategory_id, amount, type, payment_type, description, transaction_date});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const editTransaction = async (id, {category_id, subcategory_id, amount, type, payment_type, description, transaction_date}) => {
  try {
    const {data} = await $authHost.put(`transactions/${id}`, {category_id, subcategory_id, amount, type, payment_type, description, transaction_date});
    return data;
  } catch (error) {
    throw error;
  }
} 

export const deleteTransaction = async (id) => {
  try {
    const {data} = await $authHost.delete(`transactions/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// Статистика

export const getStats = async ({date_from, date_to}) => {
  try {
    const {data} = await $authHost.get(`transactions?date_from=${date_from}&date_to=${date_to}`);
    return data;
  } catch (error) {
    throw error;
  }
} 