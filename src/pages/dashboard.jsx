import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { checkLimit, getProfile } from "../utils/api";
import Button from "../components/UI/Button";

// export async function getServerSideProps(context) {
//   const data = await getStats();

//   return {
//     props: {
//       data,
//     },
//   };
// }

const Dashboard = ({ data }) => {
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

    return {
      string: formattedDate,
      full: date.toISOString().split("T")[0],
    };
  }

  const currentDate = new Date();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(formatDate(currentDate));
  const [limitInfo, setLimitInfo] = useState(null);

  const fetchData = async () => {
    try {
      const userData = await getProfile();
      setUserData(userData);
      const limitData = await checkLimit();
      setLimitInfo(limitData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <MainContainer>
      <h1>Главная панель</h1>
      <p>{userData.username}</p>
      <p>{date.string}</p>
      <p>Сумма расходов за текущий месяц: {limitInfo.spending.total} BYN</p>
      <p>
        Лимит расходов:{" "}
        {limitInfo.has_limit
          ? limitInfo.limit.amount + " BYN"
          : "Не установлено"}
      </p>
      <p>
        Остаток бюджета в текущем месяце:{" "}
        {limitInfo.has_limit
          ? limitInfo.spending.remaining + " BYN"
          : "Безлимит"}{" "}
      </p>
      {limitInfo.spending.remaining === 0 && (
        <p className="danger-text">Вы превысили бюджет!</p>
      )}
      <Button>Добавить расход</Button>
    </MainContainer>
  );
};

export default Dashboard;
