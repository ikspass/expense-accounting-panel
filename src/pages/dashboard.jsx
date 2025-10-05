import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { checkLimit, getProfile } from "../utils/api";
import Button from "../components/UI/Button";
import classes from '../styles/Dashboard.module.css'
import ProgressBar from "../components/UI/ProgressBar";

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
        or: "#FF6B6B",
        total: 450.25,
      },
      {
        name: "Транспорт",
        or: "#4ECDC4",
        total: 200.5,
      },
    ],
    income_by_category: [
      {
        name: "Зарплата",
        or: "#55A3FF",
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
      // localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOCIsInVzZXJuYW1lIjoicG9saW5hIiwiYXBwX2tleSI6ImFwcDNfNjhhMTkyZmZlMDAxZSIsImlhdCI6MTc1OTMxNjMyNSwiZXhwIjoxNzU5OTIxMTI1fQ.cXWrzIxnIPl_BqzOM1dWc7LnpNFabgPHUVMwMWXb_hU')
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
      <div className={`d-flex flex-column ${classes.dashboardContainer}`}>
        <div className="row align-items-center">
          <h1 className='col'>Dashboard</h1>
          <div className="col-6 d-flex gap-3">
            <input type="text" />
            <button>
              <img src="/svg/Notifications.svg" alt="Notifications icon" />
            </button>
            <div className={classes.imageContainer}>
              <img src="/images/avatar.png" alt="User photo" />
            </div>
          </div>
        </div>
        <div className={classes.grid}>
          {/* <div className=" gap-3"> */}
            <div className={`mt-0 ${classes.dashboardCard} ${classes.totalBalanceCard}`}>
              <div className={classes.dashboardCardHead}>
                <h2>Total balance</h2>
                <select name="" id="">
                  <option value="This week"></option>
                </select>
              </div>
              <div className="d-flex flex-column gap-3">
                <p className="numbers-head">$9,160.00</p>
                <div className={classes.dashboardCardStats}>
                  <img src="/svg/ArrowDown.svg" alt="Icon" />
                  <p className="numbers-caption red-text">+2,1%</p>
                  <p className="text-small opacity-40">vs last month</p>
                </div>
              </div>
            </div>
            <div className={` mt-0 ${classes.dashboardCard} ${classes.incomeCard}`}>
              <div className={classes.dashboardCardHead}>
                <h2>Income</h2>
                <select name="" id="">
                  <option value="This week"></option>
                </select>
              </div>
              <div className="d-flex flex-column gap-3">
                <p className="numbers-head">$9,160.00</p>
                <div className={classes.dashboardCardStats}>
                  <img src="/svg/ArrowUp.svg" alt="Icon" />
                  <p className="numbers-caption green-text">+2,1%</p>
                  <p className="text-small opacity-40">vs last month</p>
                </div>
              </div>
            </div>
            <div className={` mt-0 ${classes.dashboardCard} ${classes.expensesCard}`}>
              <div className={classes.dashboardCardHead}>
                <h2>Expenses</h2>
                <select name="" id="">
                  <option value="This week"></option>
                </select>
              </div>
              <div className="d-flex flex-column gap-3">
                <p className="numbers-head">$9,160.00</p>
                <div className={classes.dashboardCardStats}>
                  <img src="/svg/ArrowUp.svg" alt="Icon" />
                  <p className="numbers-caption green-text">+2,1%</p>
                  <p className="text-small opacity-40">vs last month</p>
                </div>
              </div>
            </div>
            <div className={` mt-0 ${classes.dashboardCard} ${classes.limitCard}`}>
              <div className={classes.dashboardCardHead}>
                <h2>Limit</h2>
                <select name="" id="">
                  <option value="This week"></option>
                </select>
              </div>
              <div className="d-flex flex-column gap-3">
                <ProgressBar value={2356.00} max={4000.00}/>
                <div className={classes.limitProgressBar}></div>
                <div className={classes.limitCardInfo}>
                  
                </div>
              </div>
            </div>
          {/* </div> */}

          {/* <div className=" gap-3"> */}
            <div className={`mt-0 ${classes.dashboardCard} ${classes.allExpensesCard}`}>
              <h2>All expenses</h2>
            </div>
            <div className={`mt-0 ${classes.dashboardCard} ${classes.analyticsCard}`}>
              <h2>Analytics</h2>
            </div>
            <div className={`mt-0 ${classes.dashboardCard} ${classes.todayCard}`}>
              <h2>Today</h2>
            </div>
            <div className={`mt-0 ${classes.dashboardCard} ${classes.transactionsCard}`}>
              <h2>Transactions</h2>
            </div>
            <div className={`mt-0 ${classes.dashboardCard} ${classes.categoriesCard}`}>
              <h2>Categories</h2>
            </div>
            <div className={`mt-0 ${classes.dashboardCard} ${classes.statisticsCard}`}>
              <h2>Statistics</h2>
            </div>
          {/* </div> */}
        </div>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
