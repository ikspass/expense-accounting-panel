import axios from "axios";

export const login = async () => {
  // Авторизация польователя
  return { success: true, message: "Авторизация прошла успешно" };
} 

export const register = async () => {
  // Регистрация пользователя
  return { success: true, message: "Регистрация прошла успешно" };
} 

export const getExpenses = async () => {
  // Получение расходов
  return [{ id: 1, amount: 100, description: "Бензин" }];
} 

export const addExpense = async () => {
  // Добавление расхода
  return { success: true, message: "Расход успешно добавлен" };
} 

export const getStats = async () => {
  // Получение статистики
  return { totalExpenses: 500, averageExpense: 100 };
} 