import { $host, $authHost } from ".";

export const login = async (username, password) => {
  try {
    const {data} = await $host.post('auth/login', {username, password});
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error
  }
} 

export const register = async (username, email, password) => {
  try {
    const {data} = await $host.post('auth/register', {username, email, password});
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
} 

export const getCategories = async (type) => {
  // expense || income
  const {data} = await $authHost.get(`categories?type=${type}`);
  return data;
} 

export const createCategory = async (name, type, color, icon) => {
  const {data} = await $authHost.post('categories', {name, type, color, icon});
  return data;
} 

export const getTransactions = async (page, perPage, type, categoryId, dateFrom, dateTo) => {
  const {data} = await $authHost.get(`transactions?page=${page}&per_page=${perPage}&type=${type}&category_id=${categoryId}&date_from=${dateFrom}&date_to=${dateTo}`);
  return data;
} 

export const createTransaction = async (categoryId, subCategoryId, amount, type, description, transactionDate) => {
  const {data} = await $authHost.post('transactions', {category_id: categoryId, subcategory_id: subCategoryId, amount, type, description, transaction_date: transactionDate});
  return data;
} 

export const getStats = async (dateFrom, dateTo) => {
  const {data} = await $authHost.get(`transactions?date_from=${dateFrom}&date_to=${dateTo}`);
  return data;
} 