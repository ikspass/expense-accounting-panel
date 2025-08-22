import React, { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import Chart from "chart.js/auto";
import { getStats } from "../utils/api";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const Stats = () => {
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
        month: "2024-01",
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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(stats.expenses_by_category);
  const [dateFrom, setDateFrom] = useState(
    new Date().toISOString().split("T")[0].slice(0, -2) + "01"
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);

  const fetchData = async () => {
    try {
      const stats = await getStats(dateFrom, dateTo);
      setData(stats.expenses_by_category);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [dateFrom, dateTo]);

  const applyDates = () => {
    alert(`От: ${dateFrom}\nДо: ${dateTo}`);
    // fetchData();
  };

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "# of Votes",
            data: data.map((item) => item.total),
            backgroundColor: data.map((item) => item.color),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                const total = data.datasets[0].data.reduce(
                  (sum, value) => sum + value,
                  0
                );
                return data.labels.map((label, index) => {
                  const value = data.datasets[0].data[index];
                  const percentage = ((value / total) * 100).toFixed(2);
                  return {
                    text: `${label}: ${value} (${percentage}%)`,
                    fillStyle: data.datasets[0].backgroundColor[index],
                    hidden: false,
                    index: index,
                  };
                });
              },
            },
          },
          title: {
            display: true,
            text: "Статистика расходов",
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <MainContainer>
      <h1>Статистика</h1>
      <p>Период</p>
      <Input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />
      <Input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />
      <Button onClick={applyDates}>Выбрать</Button>
      <div className="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    </MainContainer>
  );
};

export default Stats;
