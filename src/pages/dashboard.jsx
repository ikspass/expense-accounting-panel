import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { getStats } from "../utils/api";
import { jwtDecode } from 'jwt-decode'

// export async function getServerSideProps(context) {
//   const data = await getStats();

//   return {
//     props: {
//       data,
//     },
//   };
// }


const Dashboard = ({data}) => {  
  const stats = {
    totals: {
      expenses: 1250.75,
      income: 3000.0,
      balance: 1749.25,
    },
    expenses_by_category: [
      {
        name: "Продукты",
        color: "#FF6B6B",
        total: 450.25,
      },
      {
        name: "Транспорт",
        color: "#4ECDC4",
        total: 200.5,
      },
    ],
    income_by_category: [
      {
        name: "Зарплата",
        color: "#55A3FF",
        total: 3000.0,
      },
    ],
    monthly_breakdown: [
      {
        month: "2025-08",
        expenses: 1250.75,
        income: 3000.0,
      },
      {
        month: "2023-12",
        expenses: 1100.0,
        income: 2800.0,
      },
    ],
  };

  function formatDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(
      date
    );

    const monthNames = {
      "янв.": "янв.",
      "фев.": "фев.",
      "мар.": "мар.",
      "апр.": "апр.",
      "май.": "май.",
      "июн.": "июн.",
      "июл.": "июл.",
      "авг.": "авг.",
      "сен.": "сен.",
      "окт.": "окт.",
      "ноя.": "ноя.",
      "дек.": "дек.",
    };

    return formattedDate.replace(/([а-я]{3}\.)/, (match) => monthNames[match]);
  }

  const currentDate = new Date();

  const [date, setDate] = useState(formatDate(currentDate));
  const [username, setUsername] = useState('aboba');
  const [expenses, setExpenses] = useState(stats.totals.expenses);
  const [income, setIncome] = useState(stats.totals.income);
  const [limit, setLimit] = useState(1500);

  useEffect(() => {
    const data = jwtDecode(localStorage.getItem('token'));
    setUsername(data.username)    
  }, [])

  return (
    <MainContainer>
      <h1>Главная панель</h1>
      <p>{username}</p>
      <p>{date}</p>
      <p>Сумма расходов за текущий месяц: {expenses} BYN</p>
      <p>Сумма дохода за текущий месяц: {income} BYN</p>
      <p>Лимит расходов: {limit ? limit + " BYN" : "Не установлено"}</p>
      <p>
        Остаток бюджета в текущем месяце:{" "}
        {limit
          ? (limit - expenses > 0 ? limit - expenses : 0) + " BYN"
          : "Безлимит"}{" "}
      </p>
      {limit && expenses > limit && (
        <p className="danger-text">Вы превысили бюджет!</p>
      )}
    </MainContainer>
  );
};

export default Dashboard;
